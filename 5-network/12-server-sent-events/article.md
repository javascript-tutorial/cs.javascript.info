# Server Sent Events

Specifikace [Server-Sent Events (Události poslané serverem)](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) popisuje zabudovanou třídu `EventSource`, která udržuje spojení se serverem a umožňuje z něj přijímat události.

Spojení je trvalé, podobně jako u `WebSocket`.

Je tady však několik důležitých rozdílů:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Obousměrné: klient i server si mohou vyměňovat zprávy | Jednosměrné: data posílá pouze server |
| Binární i textová data | Pouze text |
| Protokol WebSocket | Obvyklý HTTP |

`EventSource` představuje slabší způsob komunikace se serverem než `WebSocket`.

Proč by ho tedy někdo měl používat?

Hlavním důvodem je, že je jednodušší. Pro mnoho aplikací je `WebSocket` příliš silný.

Když potřebujeme přijímat tok dat ze serveru, třeba zprávy z chatu, ceny z burzy nebo cokoli jiného, hodí se k tomu `EventSource`. Navíc podporuje obnovu spojení, což při použití `WebSocket` musíme implementovat ručně. Kromě toho je to starý planý HTTP, není to nový protokol.

## Příjem zpráv

Abychom začali přijímat zprávy, stačí nám vytvořit `new EventSource(url)`.

Prohlížeč se připojí k `url`, bude udržovat spojení otevřené a čekat na události.

Server by měl odpovědět statusem 200 a hlavičkou `Content-Type: text/event-stream`, pak udržovat spojení a zapisovat do něj zprávy ve speciálním formátu, například:

```
data: Zpráva 1

data: Zpráva 2

data: Zpráva 3
data: dvouřádková
```

- Text zprávy následuje po `data:`, mezera za dvojtečkou není povinná.
- Zprávy jsou oddělovány dvěma konci řádků za sebou `\n\n`.
- Když chceme poslat konec řádku `\n`, můžeme okamžitě poslat další `data:` (viz 3. zpráva v příkladu).

V praxi se složité zprávy obvykle posílají zakódované do JSONu a konce řádků se v nich kódují jako `\n`, takže víceřádkové zprávy `data:` nejsou zapotřebí.

Příklad:

```js
data: {"uživatel":"Jan","zpráva":"První řádek*!*\n*/!* Druhý řádek"}
```

...Můžeme tedy předpokládat, že jedna `data:` obsahují právě jednu zprávu.

Pro každou takovou zprávu se vygeneruje událost `message`:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(událost) {
  console.log("Nová zpráva", událost.data);
  // pro tok dat uvedený v příkladu bude logovat 3krát
};

// nebo eventSource.addEventListener('message', ...)
```

### Požadavky jiného původu

`EventSource` podporuje požadavky jiného původu, stejně jako `fetch` a ostatní metody pro práci se sítí. Můžeme použít jakoukoli URL:

```js
let zdroj = new EventSource("https://another-site.com/events");
```

Vzdálený server obdrží hlavičku `Origin` a musí odpovědět hlavičkou `Access-Control-Allow-Origin`, aby bylo možné pokračovat.

Když chceme předat přihlašovací údaje, měli bychom nastavit volbu `withCredentials`, například:

```js
let zdroj = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Podrobnosti o hlavičkách jiného původu najdete v kapitole <info:fetch-crossorigin>.


## Obnova spojení

Po vytvoření se `new EventSource` připojí k serveru. Pokud bude spojení přerušeno, připojí se znovu.

To je velmi praktické, protože se o to nemusíme starat.

Mezi opětovnými připojeními nastává krátká prodleva, standardně několik sekund.

Server může nastavit doporučenou prodlevu řádkem `retry:` v odpovědi (v milisekundách):

```js
retry: 15000
data: Ahoj, nastavuji prodlevu obnovy spojení na 15 sekund
```

Řádek `retry:` může přijít společně s daty nebo jako samostatná zpráva.

Prohlížeč by měl před obnovou spojení počkat uvedený čas v milisekundách. Může počkat i déle, např. pokud ví (od operačního systému), že momentálně není síťové připojení dostupné, může počkat, než se objeví, a pak se zkusit připojit.

- Pokud server chce, aby prohlížeč přestal obnovovat spojení, měl by odpovědět HTTP statusem 204.
- Pokud prohlížeč chce uzavřít spojení, měl by volat `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

K obnově připojení navíc nedojde tehdy, pokud odpověď obsahuje nekorektní `Content-Type` nebo obsahuje jiný HTTP status než 301, 307, 200 nebo 204. V takových případech bude vyvolána událost `"error"` a prohlížeč se znovu nepřipojí.

```smart
Když je spojení definitivně uzavřeno, není možné je nijak „znovuotevřít“. Jestliže se chceme připojit znovu, musíme vytvořit nový `EventSource`.
```

## Identifikátor zprávy

Když se spojení přeruší kvůli problémům v síti, žádná ze stran nemůže s jistotou vědět, které zprávy byly přijaty a které ne.

Abychom mohli spojení korektně obnovit, měla by každá zpráva obsahovat pole `id`, například:

```
data: Zpráva 1
id: 1

data: Zpráva 2
id: 2

data: Zpráva 3
data: dvouřádková
id: 3
```

Když je přijata zpráva obsahující `id:`, prohlížeč:

- Nastaví vlastnost `eventSource.lastEventId` na hodnotu tohoto `id`.
- Po opětovném připojení pošle hlavičku `Last-Event-ID` s tímto `id`, aby server mohl znovu poslat následující zprávy.

```smart header="Vkládejte `id:` až za `data:`"
Prosíme všimněte si, že server připojuje `id` až za `data` zprávy, aby zajistil, že `lastEventId` bude aktualizováno až po přijetí zprávy.
```

## Stav spojení: readyState

Objekt `EventSource` obsahuje vlastnost `readyState`, která nabývá jedné ze tří hodnot:

```js no-beautify
EventSource.CONNECTING = 0; // probíhá připojení nebo obnova připojení
EventSource.OPEN = 1;       // připojeno
EventSource.CLOSED = 2;     // spojení uzavřeno
```

Když je objekt vytvořen nebo se spojení přeruší, stav je vždy `EventSource.CONNECTING` (roven `0`).

Z této vlastnosti můžeme zjistit stav `EventSource`.

## Druhy událostí

Objekt `EventSource` standardně generuje tři události:

- `message` -- zpráva přijata, k dispozici v `event.data`.
- `open` -- spojení otevřeno.
- `error` -- spojení nemůže být vytvořeno, např. server vrátil HTTP status 500.

Server může specifikovat další druhy událostí na začátku události v řádku `event: ...`.

Příklad:

```
event: join
data: Bob

data: Ahoj

event: leave
data: Bob
```

Pro zpracování vlastních událostí musíme použít `addEventListener`, ne `onmessage`:

```js
eventSource.addEventListener('join', událost => {
  alert(`Připojil se ${událost.data}`);
});

eventSource.addEventListener('message', událost => {
  alert(`Řekl: ${událost.data}`);
});

eventSource.addEventListener('leave', událost => {
  alert(`Odešel ${událost.data}`);
});
```

## Celý příklad

Následující server pošle zprávy obsahující `1`, `2`, `3`, pak `bye` a přeruší spojení.

Prohlížeč se pak automaticky znovu připojí.

[codetabs src="eventsource"]

## Shrnutí

Objekt `EventSource` automaticky zavede stálé spojení a umožní serveru posílat po něm zprávy.

Nabízí:
- Automatickou obnovu spojení s nastavitelnou prodlevou `retry`.
- Identifikátory zpráv pro události obnovy spojení. Poslední přijatý identifikátor se po obnově spojení pošle v hlavičce `Last-Event-ID`.
- Aktuální stav se nachází ve vlastnosti `readyState`.

To činí z `EventSource` životaschopnou alternativu k `WebSocket`, který je nižší úrovně a tyto zabudované vlastnosti postrádá (ačkoli je můžeme implementovat).

Pro mnoho aplikací z reálného života jsou schopnosti `EventSource` dostatečné.

Je podporován ve všech moderních prohlížečích (ne v IE).

Jeho syntaxe je:

```js
let zdroj = new EventSource(url, [přihlašovacíÚdaje]);
```

Druhý argument má jen jednu volbu: `{ withCredentials: true }`, která umožňuje posílat přihlašovací údaje na jiný původ.

Celkově je zabezpečení pro jiný původ stejné jako u `fetch` a jiných síťových metod.

### Vlastnosti objektu `EventSource`

`readyState`
: Aktuální stav spojení: `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` nebo `EventSource.CLOSED (=2)`.

`lastEventId`
: Poslední přijaté `id`. Po obnově spojení je prohlížeč pošle v hlavičce `Last-Event-ID`.

### Metody

`close()`
: Uzavře spojení.

### Události

`message`
: Zpráva přijata, data jsou v `událost.data`.

`open`
: Spojení je zavedeno.

`error`
: Nastává v případě chyby, a to jak při ztrátě spojení (bude obnoveno), tak při kritických chybách. Kontrolou `readyState` můžeme zjistit, zda dochází k obnově spojení.

Server může nastavit vlastní název události v řádku `event:`. Takové události bychom měli zpracovávat pomocí `addEventListener`, ne `on<událost>`.

### Formát odpovědi serveru

Server posílá zprávy oddělené `\n\n`.

Zpráva může obsahovat následující pole:

- `data:` -- tělo zprávy, posloupnost více `data` se interpretuje jako jedna zpráva s částmi oddělenými `\n`.
- `id:` -- aktualizuje `lastEventId`, při obnově spojení se posílá v `Last-Event-ID`.
- `retry:` -- doporučuje délku prodlevy v milisekundách před pokusem o obnovu spojení. V JavaScriptu ji nelze nijak nastavit.
- `event:` -- název události, musí být před `data:`.

Zpráva může obsahovat jedno nebo více polí v libovolném pořadí, ale `id:` je zpravidla poslední.
