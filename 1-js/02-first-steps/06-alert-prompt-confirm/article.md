# Interakce: alert, prompt, confirm

Protože jako demonstrační prostředí budeme používat prohlížeč, podíváme se na několik funkcí sloužících k interakci s uživatelem: `alert`, `prompt` a `confirm`.

## alert

Tuto funkci jsme už viděli. Zobrazí zprávu a počká, až uživatel stiskne tlačítko „OK“.

Příklad:

```js run
alert("Ahoj");
```

Miniokno se zprávou se nazývá *modální okno*. Slovo „modální“ znamená, že uživatel nemůže komunikovat se zbytkem stránky, mačkat jiná tlačítka apod., dokud nevyhodnotí toto okno -- v tomto případě dokud nestiskne „OK“.

## prompt

Funkce `prompt` přijímá dva argumenty:

```js no-beautify
výsledek = prompt(titulek, [default]);
```

Zobrazí modální okno s textovou zprávou, vstupní pole pro návštěvníka a tlačítka OK a Storno.

`titulek`
: Text, který se má zobrazit návštěvníkovi.

`default`
: Volitelný druhý parametr, úvodní hodnota ve vstupním poli.

```smart header="Hranaté závorky v syntaxi `[...]`"
Hranaté závorky okolo `default` ve výše uvedené syntaxi označují, že parametr je dobrovolný a není vyžadován.
```

Návštěvník může do vstupního pole něco napsat a stisknout OK. Pak získáme napsaný text jako `výsledek`. Nebo může zrušit vstup stisknutím tlačítka Storno nebo klávesy `key:Esc`. Pak jako `výsledek` obdržíme `null`.

Volání `prompt` vrátí text ze vstupního pole nebo `null`, pokud byl vstup zrušen.

Příklad:

```js run
let věk = prompt('Kolik je ti let?', 100);

alert(`Je ti ${věk} let!`); // Je ti 100 let!
```

````warn header="Pro IE vždy uvádějte `default`"
Druhý parametr je nepovinný, ale jestliže ho neuvedeme, Internet Explorer vloží do dotazu text `"undefined"`.

Spusťte si v Internet Exploreru tento kód a uvidíte:

```js run
let test = prompt("Test");
```

Aby dotazy vypadaly dobře i v IE, doporučujeme vždy uvádět i druhý argument:

```js run
let test = prompt("Test", ''); // <-- pro IE
```
````

## confirm

Syntaxe:

```js
výsledek = confirm(otázka);
```

Funkce `confirm` zobrazí modální okno s otázkou -- v našem případě obsaženou v promenné `otázka` -- a dvěma tlačítky: OK a Storno.

Výsledek bude `true`, jestliže uživatel stiskne OK, jinak bude `false`.

Příklad:

```js run
let jeŠéf = confirm("Jsi šéf?");

alert( jeŠéf ); // pokud bylo stisknuto OK, tak true
```

## Shrnutí

Uvedli jsme tři funkce specifické pro prohlížeče, které umožňují interakci s návštěvníky:

`alert`
: Zobrazí zprávu.

`prompt`
: Zobrazí zprávu, která požádá uživatele o zadání textu. Vrátí zadaný text nebo `null`, pokud uživatel stiskl tlačítko Storno nebo klávesu `key:Esc`.

`confirm`
: Zobrazí zprávu a počká, než uživatel stiskne „OK“ nebo „Storno“. Vrátí `true`, pokud stiskl OK, nebo `false`, pokud stiskl Storno nebo klávesu `key:Esc`.

Všechny tyto metody jsou modální: pozastaví vykonávání skriptu a neumožní návštěvníkovi komunikovat se zbytkem stránky, dokud okno nezmizí.

Všechny uvedené metody mají dvě omezení:

1. Poloha modálního okna je stanovena prohlížečem. Obvykle je uprostřed.
2. Vzhled okna závisí na prohlížeči. Nelze jej upravit.

To je cena za jednoduchost. Existují jiné způsoby, kde můžete upravit vzhled oken a umožnit bohatší interakci s návštěvníkem, ale pokud nám na těchto věcech příliš nezáleží, tyto metody fungují dobře.