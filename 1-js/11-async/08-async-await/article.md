# Async/await

Existuje speciální syntaxe, která umožňuje pracovat s přísliby pohodlnějším způsobem. Nazývá se „async/await“. Je překvapivě snadné jí porozumět a používat ji.

## Asynchronní funkce

Začněme klíčovým slovem `async`. To může být umístěno před funkci, například:

```js
async function f() {
  return 1;
}
```

Slovo „async“ před funkcí znamená jedno jediné: funkce vždy vrátí příslib. Jiné hodnoty budou automaticky zabaleny do splněného příslibu.

Například tato funkce vrátí splněný příslib s výsledkem `1`; otestujme to:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...Mohli bychom explicitně vrátit příslib, což by bylo totéž:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Klíčové slovo `async` tedy zaručuje, že funkce vrátí příslib, a jiné hodnoty než přísliby do něj zabalí. Jednoduché, že? Ale to není všechno. Existuje další klíčové slovo, `await`, které funguje výhradně uvnitř funkcí s `async` a je opravdu pěkné.

## Await

Syntaxe:

```js
// funguje jen v asynchronních funkcích
let hodnota = await příslib;
```

Klíčové slovo `await` přiměje JavaScript počkat, než se příslib usadí, a vrátí jeho výsledek.

Následuje příklad s příslibem, který se splní za 1 sekundu:
```js run
async function f() {

  let příslib = new Promise((splň, zamítni) => {
    setTimeout(() => splň("hotovo!"), 1000)
  });

*!*
  let výsledek = await příslib; // čeká, než se příslib splní (*)
*/!*

  alert(výsledek); // "hotovo!"
}

f();
```

Výkon funkce se na řádku `(*)` „pozastaví“ a obnoví se až tehdy, když se příslib usadí. Jeho výsledek se uloží do proměnné `výsledek`. Proto uvedený kód zobrazí za jednu sekundu „hotovo!“.

Zdůrazněme to: `await` doslova přeruší výkon funkce, dokud se příslib neusadí, a pak jej obnoví s výsledkem příslibu. To nestojí žádné zdroje CPU, protože motor JavaScriptu mezitím může vykonávat jinou práci: spouštět další skripty, ošetřovat události a podobně.

Je to jen elegantnější syntaxe získání výsledku příslibu než `příslib.then`. A snadněji se čte a píše.

````warn header="V běžných funkcích nelze `await` používat"
Pokud se pokusíme použít `await` v neasynchronní funkci, nastane syntaktická chyba:

```js run
function f() {
  let příslib = Promise.resolve(1);
*!*
  let výsledek = await příslib; // Syntaktická chyba
*/!*
}
```

Tuto chybu můžeme získat, když zapomeneme uvést `async` před funkcí. Jak bylo uvedeno, `await` funguje jedině uvnitř funkce s `async`.
````

Vezměme nyní příklad `zobrazAvatara()` z kapitoly <info:promise-chaining> a přepišme jej za použití `async/await`:

1. Musíme nahradit volání `.then` za `await`.
2. Aby to fungovalo, měli bychom také označit funkci jako `async`.

```js run
async function zobrazAvatara() {

  // načteme náš JSON
  let odpověď = await fetch('/article/promise-chaining/user.json');
  let uživatel = await odpověď.json();

  // načteme uživatele GitHubu
  let odpověďGitHubu = await fetch(`https://api.github.com/users/${uživatel.name}`);
  let uživatelGitHubu = await odpověďGitHubu.json();

  // zobrazíme avatara
  let obrázek = document.createElement('img');
  obrázek.src = uživatelGitHubu.avatar_url;
  obrázek.className = "promise-avatar-example";
  document.body.append(obrázek);

  // počkáme 3 sekundy
  await new Promise((splň, zamítni) => setTimeout(splň, 3000));

  obrázek.remove();

  return uživatelGitHubu;
}

zobrazAvatara();
```

Pěkně čisté a snadno čitelné, že? Mnohem lepší než předtím.

````smart header="Moderní prohlížeče povolují `await` na nejvyšší úrovni v modulech"
V moderních prohlížečích funguje `await` dobře i na nejvyšší úrovni, když jsme uvnitř modulu. Moduly probereme v článku <info:modules-intro>.

Například:

```js run module
// předpokládáme, že tento kód běží na nejvyšší úrovni uvnitř modulu
let odpověď = await fetch('/article/promise-chaining/user.json');
let uživatel = await odpověď.json();

console.log(uživatel);
```

Jestliže nepoužíváme moduly nebo musíme podporovat i [starší prohlížeče](https://caniuse.com/mdn-javascript_operators_await_top_level), pak existuje univerzální návod: zabalení do anonymní asynchronní funkce.

Například:

```js
(async () => {
  let odpověď = await fetch('/article/promise-chaining/user.json');
  let uživatel = await odpověď.json();
  ...
})();
```

````

````smart header="`await` přijímá „thenable“ objekty"
Stejně jako `příslib.then`, i `await` nám umožňuje používat thenable objekty (ty, které obsahují volatelnou metodu `then`). Myšlenkou je, že objekt třetí strany nemusí být příslib, ale objekt kompatibilní s příslibem: k tomu, abychom jej použili s `await`, stačí, aby podporoval `then`.  

Následuje příklad třídy `Thenable`; `await` pod ní přijímá její instance:

```js run
class Thenable {
  constructor(číslo) {
    this.číslo = číslo;
  }
  then(splň, zamítni) {
    alert(splň);
    // splnění s hodnotou this.číslo*2 za 1000 ms
    setTimeout(() => splň(this.číslo * 2), 1000); // (*)
  }
}

async function f() {
  // počká 1 sekundu, pak výsledek bude 2
  let výsledek = await new Thenable(1);
  alert(výsledek);
}

f();
```

Jestliže `await` obdrží nepříslibový objekt obsahující `.then`, pak tuto metodu zavolá a jako argumenty `splň` a `zamítni` jí poskytne zabudované funkce (tak, jak to učiní pro obvyklý exekutor `Promise`). Pak `await` počká, dokud nebude zavolána jedna z nich (v uvedeném příkladu se to stane na řádku `(*)`), a poté bude pokračovat s výsledkem.
````

````smart header="Asynchronní třídní metody"
Chceme-li deklarovat asynchronní třídní metodu, jednoduše před ni uvedeme `async`:

```js run
class Čekatel {
*!*
  async čekej() {
*/!*
    return await Promise.resolve(1);
  }
}

new Čekatel()
  .čekej()
  .then(alert); // 1 (to je totéž jako (výsledek => alert(výsledek)))
```
Význam je stejný: zajišťuje, že vrácená hodnota je příslib, a umožňuje `await`.

````
## Ošetřování chyb

Jestliže je příslib normálně splněn, pak `await příslib` vrátí výsledek. V případě zamítnutí však vyvolá chybu, tak, jako by na tomto řádku byl uveden příkaz `throw`.

Tento kód:

```js
async function f() {
*!*
  await Promise.reject(new Error("Ouha!"));
*/!*
}
```

...je stejný jako tento:

```js
async function f() {
*!*
  throw new Error("Ouha!");
*/!*
}
```

V reálných situacích může nějakou dobu trvat, než bude příslib zamítnut. V tom případě předtím, než `await` vyvolá chybu, nastane prodleva.

Tuto chybu můžeme zachytit pomocí `try..catch`, stejným způsobem, jako obvyklé `throw`:

```js run
async function f() {

  try {
    let odpověď = await fetch('http://takove-url-neni');
  } catch(chyba) {
*!*
    alert(chyba); // TypeError: failed to fetch
*/!*
  }
}

f();
```

V případě chyby řízení skočí do bloku `catch`. Můžeme také zabalit více řádků:

```js run
async function f() {

  try {
    let odpověď = await fetch('/tady-neni-uzivatel');
    let uživatel = await odpověď.json();
  } catch(chyba) {
    // zachytává chyby z funkce fetch i z funkce odpověď.json
    alert(chyba);
  }
}

f();
```

Pokud nemáme `try..catch`, stane se příslib generovaný voláním asynchronní funkce `f()` zamítnutým. Můžeme připojit `.catch`, abychom to ošetřili:

```js run
async function f() {
  let odpověď = await fetch('http://takove-url-neni');
}

// f() se stane zamítnutým příslibem
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

Jestliže sem zapomeneme přidat `.catch`, získáme neošetřenou chybu příslibu (viditelnou v konzoli). Takové chyby můžeme zachytávat pomocí globálního handleru událostí `unhandledrejection`, popsaného v kapitole <info:promise-error-handling>.


```smart header="`async/await` a `promise.then/catch`"
Když používáme `async/await`, potřebujeme `.then` jenom zřídka, neboť `await` nám čekání zpracuje. A místo `.catch` můžeme použít běžné `try..catch`. To je obvykle (ale ne vždy) vhodnější.

Avšak na nejvyšší úrovni kódu, když jsme mimo jakoukoli funkci s `async`, nemůžeme syntakticky použít `await`, takže je obvyklou praktikou přidat `.then/catch` pro ošetření konečného výsledku nebo vypadnuvší chyby, jako na řádku `(*)` v uvedeném příkladu.
```

````smart header="`async/await` funguje správně s `Promise.all`"
Když potřebujeme čekat na více příslibů, můžeme je zabalit do `Promise.all` a pak volat `await`:

```js
// čekáme na pole výsledků
let výsledky = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

V případě chyby se tato chyba vyvolá jako obvykle, z neúspěšného příslibu do `Promise.all`, a pak se stane výjimkou, kterou můžeme zachytit použitím `try..catch` okolo volání.

````

## Shrnutí

Klíčové slovo `async` před funkcí má dva efekty:

1. Způsobí, že funkce vždy vrátí příslib.
2. Umožní v ní použít `await`.

Klíčové slovo `await` před příslibem přiměje JavaScript čekat, než se příslib usadí, a pak:

1. Pokud je to chyba, vygeneruje se výjimka -- totéž, jako by přesně na tomto místě bylo voláno `throw chyba`.
2. V opačném případě vrátí výsledek.

Společně poskytují vynikající rámec pro psaní asynchronního kódu, který je snadné číst i psát.

S `async/await` potřebujeme psát `příslib.then/catch` jen zřídka, ale stále bychom neměli zapomínat, že tyto metody jsou založeny na příslibech, protože někdy (např. na nejvyšší úrovni kódu) je musíme použít. Když čekáme na mnoho úkolů současně, hodí se i `Promise.all`.
