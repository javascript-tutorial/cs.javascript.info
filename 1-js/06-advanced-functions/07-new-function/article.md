
# Syntaxe „new Function“

Existuje ještě jeden způsob, jak vytvořit funkci. Používá se jen zřídka, ale někdy nemáme jinou možnost.

## Syntaxe

Syntaxe vytvoření funkce:

```js
let funkce = new Function ([arg1, arg2, ...argN], těloFunkce);
```

Funkce je vytvořena s argumenty `arg1...argN` a zadaným tělem `těloFunkce`.

Je snadnější tomu porozumět, když se podíváme na příklad. Toto je funkce se dvěma argumenty:

```js run
let sečti = new Function('a', 'b', 'return a + b');

alert( sečti(1, 2) ); // 3
```

A zde je funkce bez argumentů, jenom s tělem:

```js run
let řekniAhoj = new Function('alert("Ahoj")');

řekniAhoj(); // Ahoj
```

Hlavní rozdíl oproti ostatním způsobům, jaké jsme viděli, je, že funkce je vytvořena doslovně z řetězce, který je předán za běhu skriptu.

Všechny předchozí deklarace po nás programátorech požadovaly, abychom zapsali kód funkce do skriptu.

Avšak `new Function` umožňuje převést libovolný řetězec na funkci. Například můžeme získat novou funkci ze serveru a pak ji spustit:

```js
let str = ... dynamické získání kódu ze serveru ...

let funkce = new Function(str);
funkce();
```

Používá se jen ve velmi specifických případech, například když získáme kód ze serveru nebo k dynamickému kompilování funkce ze šablony ve složitých webových aplikacích.

## Uzávěr

Funkce si zpravidla pamatuje, kde se zrodila, ve speciální vlastnosti `[[Environment]]`. Ta se odkazuje na lexikální prostředí, z něhož byla funkce vytvořena (probrali jsme to v kapitole <info:closure>).

Když je však funkce vytvořena pomocí `new Function`, do její vlastnosti `[[Environment]]` se nenastaví odkaz na aktuální lexikální prostředí, ale na globální.

Taková funkce tedy nemá přístup k vnějším proměnným, jedině ke globálním.

```js run
function vraťFunkci() {
  let hodnota = "test";

*!*
  let funkce = new Function('alert(hodnota)');
*/!*

  return funkce;
}

vraťFunkci()(); // chyba: hodnota není definována
```

Porovnejte si to s běžným chováním:

```js run
function vraťFunkci() {
  let hodnota = "test";

*!*
  let funkce = function() { alert(hodnota); };
*/!*

  return funkce;
}

vraťFunkci()(); // *!*"test"*/!*, z lexikálního prostředí funkce vraťFunkci
```

Tato speciální vlastnost `new Function` vypadá zvláštně, ale v praxi se ukazuje být velmi užitečná.

Představme si, že musíme vytvořit funkci z řetězce. Kód této funkce není znám v době psaní skriptu (to je důvod, proč nepoužijeme obvyklou funkci), ale bude znám v průběhu spuštění. Můžeme jej získat ze serveru nebo z jiného zdroje.

Naše nová funkce musí interagovat s hlavním skriptem.

Co kdyby mohla přistupovat k vnějším proměnným?

Problém je, že předtím, než je JavaScript zveřejněn k produkci, je zkomprimován použitím *minifikátoru* -- speciálního programu, který zkrátí kód tím, že odstraní komentáře, přebytečné mezery a -- co je důležité, přejmenuje lokální proměnné na kratší.

Například jestliže funkce obsahuje `let uživatelskéJméno`, minifikátor je nahradí za `let a` (nebo jiné písmeno, je-li toto již použito) a učiní tak všude. To je obvykle bezpečné, jelikož proměnná je lokální a nic mimo funkci k ní nemůže přistupovat. A uvnitř funkce minifikátor nahradí každou zmínku o ní. Minifikátory jsou chytré, analyzují strukturu kódu, takže nic nerozbíjejí. Není to jen tupé najdi a nahraď.

Kdyby tedy `new Function` měla přístup k vnějším proměnným, nedokázala by najít přejmenované `uživatelskéJméno`.

**Kdyby `new Function` měla přístup k vnějším proměnným, měla by problémy s minifikátory.**

Navíc by takový kód byl architektonicky špatný a náchylný k chybám.

K tomu, abychom něco předali funkci vytvořené pomocí `new Function`, bychom měli používat její argumenty.

## Shrnutí

Syntaxe:

```js
let funkce = new Function ([arg1, arg2, ...argN], těloFunkce);
```

Z historických důvodů můžeme argumenty uvést i jako seznam oddělený čárkou.

Tyto tři deklarace znamenají totéž:

```js
new Function('a', 'b', 'return a + b'); // základní syntaxe
new Function('a,b', 'return a + b'); // oddělené čárkou
new Function('a , b', 'return a + b'); // oddělené čárkou s mezerami
```

Vlastnost `[[Environment]]` funkcí vytvořených pomocí `new Function` se odkazuje na globální lexikální prostředí, ne na vnější. Proto tyto funkce nemohou používat vnější proměnné. To je však ve skutečnosti dobře, protože nás to ochraňuje před chybami. Explicitní předávání parametrů je architektonicky mnohem lepší metoda a nezpůsobuje problémy s minifikátory.
