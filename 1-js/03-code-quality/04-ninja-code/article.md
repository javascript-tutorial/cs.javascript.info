# Ninjův kód


```quote author="Konfucius (Hovory)"
Učení bez myšlení je zbytečná práce; myšlení bez učení je nebezpečné.
```

Tyto triky používali programátorští ninjové v minulosti, aby zostřili mysl údržbářů kódu.

Zasvěcení recenzenti kódu je hledají v testovacích úlohách.

Začínající vývojáři je někdy používají ještě lépe než programátorští ninjové.

Pozorně si je přečtěte a zjistěte, kdo jste -- ninja, začátečník, nebo snad recenzent kódu?


```warn header="Detekována ironie"
Mnozí lidé se snaží následovat cesty ninjů. Jen málokteří uspějí.
```


## Stručnost je duší důvtipu

Snažte se napsat kód co nejkratší. Ukažte všem, jak jste chytří.

Nechte se vést jemnými prvky jazyka.

Podívejte se například na tento ternární operátor `'?'`:

```js
// převzato z dobře známé JavaScriptové knihovny
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Hezké, ne? Budete-li takhle psát, zažije vývojář, který narazí na tento řádek a bude se snažit porozumět, jaká je hodnota `i`, veselé chvíle. Pak přijde za vámi a bude žádat odpověď.

Řekněte mu, že co je kratší, to je vždy lepší. Zasvěťte ho do cest ninjů.

## Jednopísmenné proměnné

```quote author="Laozi (Tao te ťing)"
Dao spočívá v bezeslovnosti. Jedině Dao správně začíná a správně končí.
```

Další způsob, jak zkrátit kód, je všude používat jednopísmenné názvy proměnných, např. `a`, `b` nebo `c`.

Krátká proměnná se v kódu ztratí jako opravdový ninja v lese. Nikdo ji nebude moci najít pomocí funkce hledání v editoru. A i kdyby ano, nedokáže „rozšifrovat“, co názvy `a` nebo `b` znamenají.

...Je tady však jedna výjimka. Opravdový ninja nikdy nepoužije `i` jako čítač v cyklu `„for“`. Všude, jen ne tam. Jen se rozhlédněte kolem, existuje spousta exotičtějších písmen, např. `x` nebo `y`.

Exotická proměnná jako čítač v cyklu je obzvláště půvabná, jestliže tělo cyklu zabírá 1-2 stránky (můžete-li, napište je co nejdelší). Když se potom někdo podívá hlouběji do cyklu, nebude schopen rychle přijít na to, že proměnná `x` je čítač cyklu.

## Používejte zkratky

Jestliže týmová pravidla zakazují používat jednopísmenné a vágní názvy, zkracujte je. Vytvářejte zkratky.

Třeba takto:

- `seznam` -> `szn`.
- `uživatelskýAgent` -> `ua`.
- `prohlížeč` -> `prhl`.
- ...atd.

Jedině osoba s opravdu dobrou intuicí pak bude schopna takové názvy pochopit. Snažte se zkrátit všechno. Jen úctyhodný člověk pak bude moci podpořit vývoj vašeho kódu.

## Stoupejte vzhůru. Buďte abstraktní.

```quote author="Laozi (Tao te ťing) (překlad Václav Cílek)"
velký čtverec nemá rohy<br>
velkou nádobu neuděláš hned<br>
velký tón není slyšet<br>
velká podoba je bez tvaru<br>
```

Když volíte název, snažte se použít co nejabstraktnější slovo. Třeba `obj`, `data`, `hodnota`, `prvek`, `element` a podobně.

- **Ideální název proměnné je `data`.** Používejte jej všude, kde můžete. Každá proměnná přece obsahuje nějaká *data*, ne?

    ...Ale co když je název `data` už zabrán? Zkuste `hodnota`, to je také univerzální. Koneckonců každá proměnná nakonec bude mít nějakou *hodnotu*.

- **Pojmenujte proměnnou podle jejího typu: `řetězec`, `číslo`...**

    Zkuste to. Mladý učedník se může divit -- jsou takové názvy pro ninju opravdu užitečné? Ale ano, jsou!

    Jistě, takový název proměnné stále něco znamená. Říká, co proměnná obsahuje: řetězec, číslo nebo něco jiného. Když se však outsider pokusí porozumět kódu, bude překvapen, že vidí, že název neobsahuje vlastně vůbec žádnou informaci! A nakonec se mu nepodaří váš skvěle promyšlený kód změnit.

    Datový typ proměnné lze snadno odhalit při ladění. Ale jaký je význam proměnné? Jaký řetězec nebo číslo je v ní uloženo?

    Není způsob, jak to odhalit bez dobré meditace!

- **...Ale co když žádné další takové názvy už nezbývají?** Stačí přidat číslo: `data1, prvek2, element5`...

## Zkouška pozornosti

Vašemu kódu by měl porozumět jen skutečně pozorný programátor. Ale jak to zajistit?

**Jeden způsob -- používejte podobné názvy proměnných, např. `datum` a `data`.**

Směšujte je všude, kde je to možné.

Takový kód je pak nemožné rychle přečíst. A když je někde překlep... Hmmm... Nadlouho nás to zdrží, uděláme si přestávku na čaj.


## Chytrá synonyma

```quote author="Laozi (Tao te ťing) (překlad Václav Cílek)"
Tao, které se dá popsat slovy, není stálé Tao<br>
jméno, které se dá jmenovat, není věčné jméno
```

Používání *podobných* názvů pro *stejné* věci činí život zajímavějším a ukáže publiku vaši kreativitu.

Zvažte například prefixy funkcí. Jestliže funkce zobrazuje zprávu na obrazovce, začněte její název `zobraz…`, např. `zobrazZprávu`. Pokud pak jiná funkce zobrazí na obrazovce něco jiného, třeba uživatelské jméno, začněte její název `vypiš…` (např. `vypišJméno`).

To naznačuje, že mezi těmito funkcemi je nějaký drobný rozdíl, přestože ve skutečnosti žádný není.

Dohodněte se s kolegy ninji z týmu: bude-li Honza pojmenovávat „zobrazovací“ funkce ve svém kódu `zobraz...`, pak Petr by mohl používat `vypiš...` a Anna `vykresli...`. Všimněte si, nakolik se kód stane zajímavějším a rozmanitějším.

...A nyní přijde ten pravý trik!

Pro dvě funkce, mezi nimiž je důležitý rozdíl, použijte stejný prefix!

Například funkce `tiskniStránku(stránka)` bude tisknout na tiskárnu. Ale funkce `tiskniText(text)` vypíše text na obrazovku. Nechte neznalého čtenáře, aby se zamyslel nad podobně pojmenovanou funkcí `tiskniZprávu`: „Kam tu zprávu vlastně vytiskne? Na tiskárnu, nebo na obrazovku?“ Aby to bylo opravdu úchvatné, `tiskniZprávu(zpráva)` by měla zobrazit zprávu v novém okně!

## Používejte opakovaně stejné názvy

```quote author="Laozi (Tao te ťing) (překlad Václav Cílek)"
když rozdělujeme jednotu,<br>
objevují se jména<br>
pohromě se vyhneme,<br>
jen když víme, kdy přestat<br>
```

Přidejte novou proměnnou jen tehdy, když je to absolutně nezbytné.

Jinak místo toho opakovaně používejte již existující názvy. Jen do nich zapisujte nové hodnoty.

Ve funkci se snažte používat jedině proměnné, které byly předány jako parametry.

Díky tomu je opravdu těžké poznat, co vlastně proměnná obsahuje *právě teď*. A také, odkud to přišlo. Cílem je procvičit intuici a paměť člověka, který čte kód. Osoba se slabou intuicí bude muset analyzovat kód řádek po řádku a stopovat změny v každé větvi.

**Pokročilá varianta tohoto přístupu je utajeně (!) nahradit hodnotu něčím podobným uvnitř cyklu nebo funkce.**

Například:

```js
function ninjovaFunkce(elem) {
  // 20 řádků kódu pracujícího s elem

  elem = clone(elem);

  // 20 dalších řádků kódu, které nyní pracují s klonem proměnné elem!
}
```

Kolega, který bude chtít pracovat s proměnnou `elem` ve druhé polovině funkce, bude překvapen... Teprve při ladění po prozkoumání kódu přijde na to, že pracuje s klonem!

Toto je v kódu často vidět. Je to hrozivě efektivní i proti zkušenému ninjovi.


## Legrace s podtržítky

Umisťujte před názvy proměnných podtržítka `_` a `__`. Například `_jméno` nebo `__hodnota`. Bude to legrace, když budete jejich význam znát jenom vy. Nebo ještě lépe: přidávejte je jen pro legraci, aniž by měla nějaký konkrétní význam. Nebo ať mají na různých místech různé významy.

Zabijete dvě mouchy jednou ranou. Za prvé, kód se prodlouží a stane se méně čitelným, a za druhé, kolega vývojář může strávit dlouhou dobu zjišťováním, co vlastně ta podtržítka znamenají.

Elegantní ninja na jednom místě kódu podtržítka vkládá a na jiných se jim vyhýbá. Díky tomu je kód ještě zranitelnější a zvyšuje se pravděpodobnost budoucích chyb.


## Ukažte svou lásku

Dejte každému vědět, jak úžasné jsou vaše entity! Názvy jako `superElement`, `megaRámec` nebo `pěknýPrvek` čtenáře zaručeně osvítí.

Jistě, na jednu stranu musíte něco napsat: `super..`, `mega..`, `pěkný..`. Ale na druhou stranu to neposkytuje žádné detaily. Čtenář se může rozhodnout hledat jejich skrytý význam a strávit meditací hodinu nebo dvě své placené pracovní doby.


## Překrývejte vnější proměnné

```quote author="Guan Yin Zi"
Kdo je na světle, nevidí nic, co je ve tmě.<br>
Kdo je ve tmě, vidí všechno, co je na světle.
```

Používejte stejné názvy pro proměnné vně a uvnitř funkce. Je to jednoduché. Není třeba úsilí k vymýšlení nových názvů.

```js
let *!*uživatel*/!* = autentikujUživatele();

function renderuj() {
  let *!*uživatel*/!* = jináHodnota();
  ...
  ...mnoho řádků...
  ...
  ... // <-- programátor zde chce pracovat s uživatelem a...
  ...
}
```

Programátor, který skočí dovnitř funkce `renderuj`, si pravděpodobně nevšimne, že v ní je lokální proměnná `uživatel`, která zastiňuje tu vnější.

Pak se pokusí pracovat s proměnnou `uživatel` předpokládaje, že je to externí proměnná, která je výsledkem volání `autentikujUživatele()`... A past sklapne! Nazdar, debuggere...


## Všude vedlejší efekty!

Existují funkce, které vypadají, jako by nic neměnily. Například `jePřipraven()`, `ověřOprávnění()`, `najdiZnačky()`... Předpokládá se, že provedou výpočty a najdou a vrátí data, aniž by měnily cokoli mimo ně. Jinými slovy, bez „vedlejších efektů“.

**Opravdu krásný trik je přidat do nich kromě hlavního úkolu ještě nějakou „užitečnou“ akci navíc.**

Pohled na překvapenou tvář vašeho kolegy, který zjistí, že funkce pojmenovaná `je..`, `ověř..` nebo `najdi..` něco mění, zaručeně posune hranice vašeho rozumu.

**Další cestou, jak překvapit, je vrátit nestandardní výsledek.**

Předveďte své originální myšlení! Nechte funkci `ověřOprávnění` vrátit nikoli `true/false`, ale složitý objekt s výsledky ověření.

Vývojáři, kteří se pokusí napsat `if (ověřOprávnění(..))`, se budou divit, proč to nefunguje. Řekněte jim: „Přečtěte si dokumentaci!“ A dejte jim odkaz na tento článek.


## Silné funkce!

```quote author="Laozi (Tao te ťing) (překlad Václav Cílek)"
Velké Tao se rozlévá, kam chce
```

Neomezujte funkci na to, co je uvedeno v jejím názvu. Rozšiřte se.

Například funkce `zkontrolujEmail(email)` by mohla (kromě kontroly, zda email je správně) zobrazit chybovou zprávu a požádat uživatele, aby email zadal znovu.

Přidané akce by neměly být zřejmé z názvu funkce. Opravdový ninja je učiní nezřejmými dokonce i z kódu.

**Spojení několika akcí do jedné ochrání váš kód před opakovaným použitím.**

Představte si, že jiný vývojář bude chtít jen zkontrolovat email a nevypisovat žádnou zprávu. Vaše funkce `zkontrolujEmail(email)`, která dělá obojí, mu pak nebude vyhovovat. Nepřekazí tedy vaši meditaci tím, že se na ni bude ptát.

## Shrnutí

Všechny výše uvedené „rady“ pocházejí ze skutečného kódu... Někdy byl dokonce napsán zkušenými vývojáři. Možná ještě zkušenějšími, než vy ;)

- Když budete dodržovat některé z nich, bude váš kód plný překvapení.
- Když budete dodržovat mnohé z nich, bude váš kód opravdu jen váš a nikdo ho nebude chtít měnit.
- Když budete dodržovat všechny, bude váš kód cennou lekcí pro mladé vývojáře toužící po osvícení.