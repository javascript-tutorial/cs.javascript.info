# Šipkové funkce (arrow funkce) – základy 
Existuje ještě jedna velice jednoduchá a výstižná syntaxe vytváření funkcí, která často bývá lepší než funkční výrazy.

Nazývá se „šipková funkce“, jelikož vypadá takto:

```js
let funkce = (arg1, arg2, ..., argN) => výraz;
```

Tím se vytvoří funkce `funkce`, která přijímá argumenty `arg1..argN`, pak s jejich použitím vyhodnotí `výraz` na pravé straně a vrátí jeho výsledek.

Jinými slovy, je to kratší verze tohoto:

```js
let funkce = function(arg1, arg2, ..., argN) {
  return výraz;
};
```

Podívejme se na konkrétní příklad:

```js run
let součet = (a, b) => a + b;

/* Tato šipková funkce je zkrácenou formou této funkce:

let součet = function(a, b) {
  return a + b;
};
*/

alert( součet(1, 2) ); // 3
```

Jak vidíte, `(a, b) => a + b` znamená funkci, která přijímá dva argumenty pojmenované `a` a `b`. Když je vykonána, vyhodnotí výraz `a + b` a vrátí jeho výsledek.

- Máme-li pouze jeden argument, můžeme závorky kolem něj vynechat, čímž se zápis ještě zkrátí.

    Příklad:

    ```js run
    *!*
    let dvojnásobek = n => n * 2;
    // zhruba totéž jako: let dvojnásobek = function(n) { return n * 2 }
    */!*

    alert( dvojnásobek(3) ); // 6
    ```

- Nejsou-li žádné argumenty, závorky budou prázdné, ale musejí být uvedeny:

    ```js run
    let řekniAhoj = () => alert("Ahoj!");

    řekniAhoj();
    ```

Šipkové funkce můžeme používat stejným způsobem jako funkční výrazy.

Například k dynamickému vytvoření funkce:

```js run
let věk = prompt("Kolik je vám let?", 18);

let uvítání = (věk < 18) ?
  () => alert('Ahoj!') :
  () => alert("Zdravíme vás!");

uvítání();
```

Šipkové funkce mohou na první pohled vypadat podivně a nepříliš čitelně, ale to se rychle změní, jakmile si oči na tuto strukturu zvyknou.

Jsou velmi vhodné pro jednoduché jednořádkové akce, kdy se nám prostě nechce psát příliš mnoho slov.

## Víceřádkové šipkové funkce

Šipkové funkce, které jsme doposud viděli, byly velmi jednoduché. Přebíraly argumenty z levé strany `=>`, vyhodnotily s nimi výraz na pravé straně a vrátily jeho hodnotu.

Někdy potřebujeme složitější funkci s více výrazy a příkazy. V takovém případě je můžeme uzavřít do složených závorek. Hlavní rozdíl je v tom, že složené závorky vyžadují uvnitř `return`, aby mohly vrátit hodnotu (stejně jako běžná funkce).

Například takto:

```js run
let součet = (a, b) => {  // složená závorka uvozuje víceřádkovou funkci
  let výsledek = a + b;
*!*
  return výsledek; // když používáme složené závorky, musíme výslovně uvést „return“
*/!*
};

alert( součet(1, 2) ); // 3
```

```smart header="Bude toho víc"
Zde jsme chválili šipkové funkce pro jejich stručnost, ale to ještě není všechno!

Šipkové funkce mají i jiné zajímavé vlastnosti.

Abychom je mohli prostudovat do hloubky, musíme napřed poznat některé další prvky JavaScriptu. K šipkovým funkcím se tedy vrátíme později v kapitole <info:arrow-functions>.

Prozatím už můžeme používat šipkové funkce pro jednořádkové akce a callbacky.
```

## Shrnutí

Šipkové funkce se hodí pro jednoduché akce, zvláště pro jednořádkové funkce. Dají se napsat dvěma způsoby:

1. Bez složených závorek: `(...args) => výraz` -- na pravé straně je výraz: funkce jej vyhodnotí a vrátí jeho výsledek. Závorky můžeme vynechat, má-li funkce pouze jeden argument, např. `n => n*2`.
2. Se složenými závorkami: `(...args) => { tělo }` -- složené závorky nám umožňují uvést ve funkci více příkazů, ale aby funkce něco vrátila, musíme výslovně uvést `return`.
