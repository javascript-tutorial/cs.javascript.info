# Hledání: getElement*, querySelector*

Navigační vlastnosti DOMu jsou skvělé, když jsou elementy navzájem u sebe. Ale co když nejsou? Jak získáme libovolný element stránky?

K tomu slouží další vyhledávací metody.

## document.getElementById nebo jen id

Jestliže element má atribut `id`, můžeme tento element získat pomocí metody `document.getElementById(id)`, ať se nachází kdekoli.

Příklad:

```html run
<div id="elem">
  <div id="elem-obsah">Element</div>
</div>

<script>
  // získáme element
*!*
  let elem = document.getElementById('elem');
*/!*

  // obarvíme jeho pozadí červeně
  elem.style.background = 'red';
</script>
```

Existuje i globální proměnná pojmenovaná podle `id`, která se na element odkazuje:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-obsah*/!*">Element</div>
</div>

<script>
  // elem je odkaz na DOM element s id="elem"
  elem.style.background = 'red';

  // id="elem-obsah" obsahuje pomlčku, takže to nemůže být název proměnné
  // ...můžeme však k němu přistupovat pomocí hranatých závorek: window['elem-obsah']
</script>
```

...To funguje, dokud v JavaScriptu nedeklarujeme proměnnou se stejným názvem, ta má pak přednost:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // elem je nyní 5, ne odkaz na <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Prosíme nepřistupujte k elementům přes globální proměnné nazvané podle id"
Toto chování je popsáno [ve specifikaci](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), ale je podporováno zejména kvůli kompatibilitě.

Prohlížeč se nám snaží pomoci tak, že míchá dohromady jmenné prostory JS a DOMu. To se hodí pro jednoduché skripty, vložené přímo do HTML, ale obecně to není dobrá věc. Mohou nastat konflikty názvů. Navíc když si někdo čte JS kód a nemá zobrazen HTML, není mu  zřejmé, odkud ona proměnná pochází.

V tomto tutoriálu používáme přímý odkaz na element pomocí `id` pro stručnost, když je zřejmé, odkud element pochází.

V reálném životě je preferována metoda `document.getElementById`.
```

```smart header="`id` musí být unikátní"
`id` musí být unikátní. V dokumentu může být pouze jeden element se zadaným `id`.

Pokud v něm je více elementů se stejným `id`, pak chování metod, které je využívají, bude nepředvídatelné, např. `document.getElementById` může vrátit náhodně kterýkoli z těchto elementů. Prosíme tedy, dodržujte toto pravidlo a zachovávejte `id` unikátní.
```

```warn header="Jen `document.getElementById`, ne `jakýkoliElement.getElementById`"
Metoda `getElementById` může být volána jedině na objektu `document`. Hledá zadané `id` v celém dokumentu.
```

## querySelectorAll [#querySelectorAll]

Zdaleka nejpřizpůsobivější metodou je `elem.querySelectorAll(css)`, která vrací všechny elementy uvnitř `elem`, které odpovídají zadanému CSS selektoru.

Zde najdeme všechny elementy `<li>`, které jsou posledními dětmi:

```html run
<ul>
  <li>Tento</li>
  <li>test</li>
</ul>
<ul>
  <li>prošel</li>
  <li>úspěšně</li>
</ul>
<script>
*!*
  let elementy = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elementy) {
    alert(elem.innerHTML); // "test", "úspěšně"
  }
</script>
```

Je to nepochybně silná metoda, protože můžeme použít jakýkoli CSS selektor.

```smart header="Můžeme použít i pseudotřídy"
V CSS selektoru jsou podporovány i pseudotřídy, např. `:hover` nebo `:active`. Například `document.querySelectorAll(':hover')` vrátí kolekci elementů, nad nimiž se právě nachází ukazatel (v pořadí vnoření: od vrchního `<html>` k nejvnořenějšímu elementu).
```

## querySelector [#querySelector]

Volání `elem.querySelector(css)` vrátí první element pro zadaný CSS selektor.

Jinými slovy, výsledek je stejný jako `elem.querySelectorAll(css)[0]`, ale tímto postupem najdeme *všechny* elementy a pak vezmeme jeden z nich, zatímco `elem.querySelector` najde pouze jeden. Je tedy rychlejší a navíc kratší na napsání.

## matches

Předchozí metody prohledávaly DOM.

Metoda [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) nic nehledá, ale jen prověří, zda `elem` odpovídá zadanému CSS selektoru. Vrací `true` nebo `false`.

Tato metoda se hodí, když iterujeme nad elementy (třeba v poli nebo v něčem podobném) a snažíme se vyfiltrovat ty, které nás zajímají.

Příklad:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // místo document.body.children zde může být libovolná kolekce
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("Odkaz na archív: " + elem.href );
    }
  }
</script>
```

## closest

*Předkové* elementu jsou: rodič, jeho rodič, rodič jeho rodiče a tak dále. Předkové společně tvoří řetěz rodičů od elementu až k vrcholu.

Metoda `elem.closest(css)` najde nejbližšího předka, který odpovídá zadanému CSS selektoru. Do hledání je zahrnut i samotný element `elem`.

Jinými slovy, metoda `closest` postupuje od elementu nahoru a prověří každého z rodičů. Jestliže odpovídá selektoru, hledání se zastaví a onen předek je vrácen.

Příklad:

```html run
<h1>Obsah</h1>

<div class="obsah">
  <ul class="kniha">
    <li class="kapitola">Kapitola 1</li>
    <li class="kapitola">Kapitola 2</li>
  </ul>
</div>

<script>
  let kapitola = document.querySelector('.kapitola'); // LI

  alert(kapitola.closest('.kniha')); // UL
  alert(kapitola.closest('.obsah')); // DIV

  alert(kapitola.closest('h1')); // null (protože h1 není předek)
</script>
```

## getElementsBy*

Existují i jiné metody, které hledají uzly podle značky, třídy a podobně.

V dnešní době jsou již převážně historií, neboť `querySelector` je silnější a kratší na napsání.

Uvedeme je tedy zejména pro úplnost, protože ve starších skriptech je stále můžete najít.

- `elem.getElementsByTagName(značka)` najde elementy se zadanou značkou a vrátí jejich kolekci. Parametr `značka` může být i hvězdička `"*"`, což znamená „libovolná značka“.
- `elem.getElementsByClassName(názevTřídy)` vrátí elementy, které mají zadanou CSS třídu.
- `document.getElementsByName(název)` vrátí všechny elementy z celého dokumentu, jejichž atribut `name` má zadanou hodnotu. Používá se velmi zřídka.

Příklad:
```js
// získáme všechny elementy <div> v dokumentu
let divy = document.getElementsByTagName('div');
```

Najděme všechny značky `input` uvnitř tabulky:

```html run height=50
<table id="tabulka">
  <tr>
    <td>Váš věk:</td>

    <td>
      <label>
        <input type="radio" name="věk" value="mladý" checked> méně než 18 let
      </label>
      <label>
        <input type="radio" name="věk" value="dospělý"> od 18 do 50 let
      </label>
      <label>
        <input type="radio" name="věk" value="senior"> více než 50 let
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let vstupy = tabulka.getElementsByTagName('input');
*/!*

  for (let vstup of vstupy) {
    alert( vstup.value + ': ' + vstup.checked );
  }
</script>
```

```warn header="Nezapomínejte na písmeno `\"s\"`!"
Začínající vývojáři někdy zapomínají na písmeno `"s"`. Snaží se tedy volat `getElementByTagName` místo <code>getElement<b>s</b>ByTagName</code>.

Písmeno `"s"` chybí v názvu `getElementById`, protože tato metoda vrací jediný element (písmeno „s“ je v angličtině přípona množného čísla podstatných jmen -- pozn. překl.). Avšak `getElementsByTagName` vrací kolekci elementů, takže `"s"` v názvu je.
```

````warn header="Metoda vrací kolekci, ne jediný element!"
Další rozšířenou začátečnickou chybou je napsat:

```js
// to nefunguje
document.getElementsByTagName('input').value = 5;
```

To nefunguje, protože tento kód vezme *kolekci* vstupů a přiřadí hodnotu přímo jí, ne elementům uvnitř.

Měli bychom buď iterovat nad kolekcí, nebo získat element podle jeho indexu a pak přiřazovat, například takto:

```js
// to by mělo fungovat (pokud existuje <input>)
document.getElementsByTagName('input')[0].value = 5;
```
````

Najděme elementy třídy `.článek`:

```html run height=50
<form name="můj-formulář">
  <div class="článek">Článek</div>
  <div class="dlouhý článek">Dlouhý článek</div>
</form>

<script>
  // hledání podle atributu name
  let form = document.getElementsByName('můj-formulář')[0];

  // hledání uvnitř formuláře podle třídy
  let články = form.getElementsByClassName('článek');
  alert(články.length); // 2, našly se dva elementy třídy "článek"
</script>
```

## Živé kolekce

Všechny metody `"getElementsBy*"` vracejí *živou* kolekci. Taková kolekce vždy odráží aktuální stav dokumentu a „automaticky se aktualizuje“, když se dokument změní.

Následující příklad obsahuje dva skripty.

1. První vytvoří odkaz na kolekci elementů `<div>`. Její délka je prozatím `1`.
2. Druhý se spustí až poté, co prohlížeč narazí na další `<div>`, takže délka kolekce bude `2`.

```html run
<div>První div</div>

<script>
  let divy = document.getElementsByTagName('div');
  alert(divy.length); // 1
</script>

<div>Druhý div</div>

<script>
*!*
  alert(divy.length); // 2
*/!*
</script>
```

Naproti tomu `querySelectorAll` vrací *statickou* kolekci, podobnou pevnému poli elementů.

Použijeme-li v uvedeném příkladu tuto metodu, oba skripty vypíší `1`:

```html run
<div>První div</div>

<script>
  let divy = document.querySelectorAll('div');
  alert(divy.length); // 1
</script>

<div>Druhý div</div>

<script>
*!*
  alert(divy.length); // 1
*/!*
</script>
```

Nyní jasně vidíme rozdíl. Statická kolekce se po přidání nového `div` do dokumentu nezvětšila.

## Shrnutí

Pro hledání uzlů v DOMu existuje 6 hlavních metod:

<table>
<thead>
<tr>
<td>Metoda</td>
<td>Hledá podle...</td>
<td>Může být volána na elementu?</td>
<td>Vrací živou kolekci?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS selektoru</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS selektoru</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>značky nebo <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>třídy</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Zdaleka nejpoužívanější jsou `querySelector` a `querySelectorAll`, ale občas nám mohou pomoci nebo můžeme najít ve starších skriptech i `getElement(s)By*`.

Kromě toho:

- Metoda `elem.matches(css)` prověří, zda `elem` odpovídá zadanému CSS selektoru.
- Metoda `elem.closest(css)` najde nejbližšího předka, který odpovídá zadanému CSS selektoru. Prověří i samotný `elem`.

A zmiňme ještě jednu metodu, která prověřuje vztah dítě-rodič, protože i ta je někdy užitečná:
-  `elemA.contains(elemB)` vrátí true, jestliže `elemB` leží uvnitř `elemA` (je potomkem `elemA`) nebo jestliže `elemA==elemB`.
