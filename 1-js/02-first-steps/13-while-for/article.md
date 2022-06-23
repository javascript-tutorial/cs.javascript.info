# Cykly: while a for

Často potřebujeme opakovat některé akce. 

Například vypsat ze seznamu jedno zboží po druhém nebo jen vykonat stejný kód pro každé z čísel od 1 do 10.

Způsob, jak opakovat stejný kód několikrát, poskytují *cykly* neboli *smyčky*.

## Cyklus „while“

Cyklus `while` má následující syntaxi:

```js
while (podmínka) {
  // kód
  // tzv. „tělo cyklu“
}
```

Dokud je `podmínka` pravdivá, `kód` z těla cyklu se bude vykonávat.

Například tento cyklus vypisuje proměnnou `i` tak dlouho, dokud je `i < 3`:

```js run
let i = 0;
while (i < 3) { // zobrazí 0, pak 1, pak 2
  alert( i );
  i++;
}
```

Jedno vykonání těla cyklu se nazývá *iterace*. Cyklus ve výše uvedeném příkladu vykoná tři iterace.

Kdyby v tomto příkladu chyběl příkaz `i++`, cyklus by se vykonával (teoreticky) donekonečna. V praxi prohlížeče poskytují způsoby, jak takový cyklus zastavit, a v JavaScriptu na serverové straně můžeme proces zastavit („shodit“) sami.

Platnou podmínkou cyklu může být jakákoli proměnná nebo výraz, nejenom porovnání: příkaz `while` podmínku vyhodnotí a převede na typ boolean.

Například `while (i != 0)` se dá napsat kratším způsobem jako `while (i)`:

```js run
let i = 3;
*!*
while (i) { // když i bude 0, podmínka bude nepravdivá a cyklus skončí
*/!*
  alert( i );
  i--;
}
```

````smart header="Tělo tvořené jedním příkazem nemusí mít složené závorky"
Obsahuje-li tělo cyklu jen jediný příkaz, můžeme složené závorky `{…}` vynechat:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Cyklus „do..while“

Ověření podmínky můžeme přesunout až *za* tělo cyklu, použijeme-li syntaxi `do..while`:

```js
do {
  // tělo cyklu
} while (podmínka);
```

Cyklus nejprve vykoná tělo, pak ověří podmínku, a dokud je pravdivá, bude vykonávat tělo znovu a znovu.

Příklad:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Tuto formu syntaxe byste měli používat jen tehdy, když chcete, aby se tělo cyklu vykonalo vždy **aspoň jednou**, bez ohledu na pravdivost podmínky. Obvykle se dává přednost předchozí formě: `while(…) {…}`.

## Cyklus „for“

Cyklus `for` je složitější, ale také nejčastěji používaný.

Vypadá takto:

```js
for (začátek; podmínka; krok) {
  // ... tělo cyklu ...
}
```

Význam jednotlivých částí si objasníme na příkladu. Níže uvedený cyklus vykoná `alert(i)` pro `i` od `0` až do (ale ne včetně) `3`:

```js run
for (let i = 0; i < 3; i++) { // zobrazí 0, pak 1, pak 2
  alert(i);
}
```

Prozkoumáme příkaz `for` po částech:

| část  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| začátek | `let i = 0`    | Vykoná se jednou po vstupu do cyklu.                                      |
| podmínka | `i < 3`| Kontroluje se před každou iterací cyklu. Je-li nepravdivá, cyklus skončí.              |
| tělo | `alert(i)`| Vykonává se stále znovu, dokud je podmínka pravdivá.                         |
| krok | `i++`      | Vykoná se po těle cyklu při každé iteraci. |

Všeobecný algoritmus cyklu funguje takto:

```
Vykonej začátek
→ (platí-li podmínka → vykonej tělo a vykonej krok)
→ (platí-li podmínka → vykonej tělo a vykonej krok)
→ (platí-li podmínka → vykonej tělo a vykonej krok)
→ ...
```

To znamená, že `začátek` se vykoná jednou a pak se iteruje: po každém testu `podmínky` se vykoná `tělo` a `krok`.

Jestliže s cykly teprve začínáte, pomůže vám vrátit se k příkladu a na papíře si krok po kroku projít, jak se vykoná.

V našem případě se stane přesně toto:

```js
// for (let i = 0; i < 3; i++) alert(i)

// vykonej začátek
let i = 0
// platí-li podmínka → vykonej tělo a vykonej krok
if (i < 3) { alert(i); i++ }
// platí-li podmínka → vykonej tělo a vykonej krok
if (i < 3) { alert(i); i++ }
// platí-li podmínka → vykonej tělo a vykonej krok
if (i < 3) { alert(i); i++ }
// ...konec, protože nyní je i == 3
```

````smart header="Inline deklarace proměnné"
„Čítačová“ proměnná `i` je zde deklarována rovnou v cyklu. To se nazývá „inline“ (na místě) deklarace proměnné. Takové proměnné jsou viditelné jen uvnitř cyklu.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // chyba, tato proměnná neexistuje
```

Namísto definice nové proměnné můžeme použít existující:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // použijeme existující proměnnou
  alert(i); // 0, 1, 2
}

alert(i); // 3, je viditelná, protože byla deklarována mimo cyklus
```

````


### Vynechávání částí

Kteroukoli část `for` můžeme vynechat.

Například můžeme vynechat `začátek`, jestliže nechceme na začátku cyklu nic provádět.

Například zde:

```js run
let i = 0; // už máme proměnnou i deklarovanou a přiřazenou

for (; i < 3; i++) { // nepotřebujeme „začátek“
  alert( i ); // 0, 1, 2
}
```

Můžeme vynechat i část `krok`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Pak bude cyklus stejný jako `while (i < 3)`.

Ve skutečnosti můžeme vynechat všechno a vytvořit tím nekonečnou smyčku:

```js
for (;;) {
  // opakuje se neustále
}
```

Všimněte si, že dva středníky `;` ve `for` musejí být uvedeny, jinak nastane syntaktická chyba.

## Opuštění smyčky

Za běžných okolností se cyklus ukončí, když jeho podmínka přestane být splněna.

Kdykoli si však můžeme ukončení vynutit použitím speciální direktivy `break`.

Například níže uvedený cyklus se uživatele ptá na sérii čísel, a když uživatel žádné číslo nezadá, cyklus skončí:

```js run
let součet = 0;

while (true) {

  let hodnota = +prompt("Zadejte číslo", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Součet: ' + sum );
```

Direktiva `break` na řádku `(*)` se aktivuje, jestliže uživatel zadá prázdný řádek nebo zruší vstup. Okamžitě ukončí cyklus a předá řízení na první řádek za cyklem, konkrétně `alert`.

Kombinace „nekonečná smyčka + `break`, když je zapotřebí“ je výhodná v situacích, kdy potřebujeme podmínku cyklu ověřovat ne na začátku nebo na konci cyklu, ale uprostřed cyklu nebo dokonce na několika místech jeho těla.

## Pokračování k další iteraci [#continue]

Direktiva `continue` je „slabší verzí“ `break`. Nezastaví celý cyklus, ale zastaví jen právě probíhající iteraci a přinutí cyklus začít novou (jestliže podmínka platí).

Můžeme ji použít, když jsme hotovi s právě probíhající iterací a rádi bychom okamžitě přešli k další.

Níže uvedený cyklus využívá `continue` k vypsání jen lichých hodnot:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // je-li podmínka pravdivá, přeskočíme zbytek těla
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, pak 3, 5, 7, 9
}
```

Pro sudé hodnoty `i` direktiva `continue` ukončí vykonávání těla a předá řízení další iteraci `for` (s dalším číslem). Proto se `alert` bude volat jedině pro liché hodnoty.

````smart header="Direktiva `continue` pomáhá redukovat vnoření"
Cyklus, který zobrazuje liché hodnoty, by mohl vypadat i takto:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Z technického pohledu je to stejné jako výše uvedený příklad. Bezpochyby můžeme namísto použití `continue` vnořit kód do bloku `if`.

Jako vedlejší efekt jsme však vytvořili jednu další úroveň vnoření (volání `alert` uvnitř složených závorek). Je-li kód uvnitř `if` delší než několik řádků, může to snížit jeho celkovou čitelnost.
````

````warn header="`break/continue` nesmějí být na pravé straně „?“"
Všimněte si, že syntaktické konstrukce, které nejsou výrazy, nelze použít s ternárním operátorem „?“. Konkrétně tam nejsou povoleny direktivy jako `break/continue`.

Například vezměme si tento kód:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...a přepišme jej pomocí otazníku:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue tady nesmí být
```

...přestane to fungovat: nastane syntaktická chyba.

To je další důvod, proč nepoužívat operátor otazníku `?` namísto `if`.
````

## Návěští pro break/continue

Někdy se potřebujeme dostat ven z několika vnořených cyklů najednou.

Například v níže uvedeném kódu vykonáváme cyklus nad `i` a `j`, který se ptá na hodnoty `(i, j)` od `(0,0)` do `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let vstup = prompt(`Hodnota na souřadnicích (${i},${j})`, '');

    // co když chceme vyskočit odtud až na „Hotovo“ níže?
  }
}

alert('Hotovo!');
```

Potřebujeme způsob, jak tento proces zastavit, jestliže uživatel zruší vstup.

Pouhé `break` po `vstup` by ukončilo jen vnitřní cyklus. To nám však nestačí. Návěští, pojďte nám na pomoc!

*Návěští* je identifikátor s dvojtečkou před cyklem:
```js
názevNávěští: for (...) {
  ...
}
```

Příkaz `break <názevNávěští>` v níže uvedeném cyklu vyskočí až z návěští:

```js run no-beautify
*!*vnější:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let vstup = prompt(`Hodnota na souřadnicích (${i},${j})`, '');

    // je-li zadán prázdný řetězec nebo zrušen vstup, vyskočí se z obou cyklů
    if (!vstup) *!*break vnější*/!*; // (*)

    // provedeme něco s hodnotou...
  }
}
alert('Hotovo!');
```

Ve výše uvedeném kódu `break vnější` najde návěští s názvem `vnější` a vyskočí z jeho cyklu.

Řízení se tedy předá přímo z `(*)` na `alert('Hotovo!')`.

Můžeme návěští umístit i na samostatný řádek:

```js no-beautify
vnější:
for (let i = 0; i < 3; i++) { ... }
```

Návěští můžeme použít i v direktivě `continue`. V takovém případě výkon kódu přeskočí k další iteraci cyklu s uvedeným návěštím.

````warn header="Návěští nám neumožňují „skákat“ kamkoli!"
Návěští nám neumožňují skákat na libovolné místo v kódu.

Například nejde udělat toto:
```js
break návěští; // skok na návěští níže (nebude fungovat)

návěští: for (...)
```

Direktiva `break` musí být uvnitř kódového bloku. Technicky to může být jakýkoli kódový blok s návěštím, např.:
```js
návěští: {
  // ...
  break návěští; // funguje to
  // ...
}
```

...Avšak v 99,9% případů se `break` používá uvnitř cyklů, jak jsme viděli ve výše uvedených příkladech.

Direktiva `continue` může být jedině uvnitř cyklu.
````

## Shrnutí

Uvedli jsme tři druhy cyklů:

- `while` -- Podmínka se ověří před každou iterací.
- `do..while` -- Podmínka se ověří po každé iteraci.
- `for (;;)` -- Podmínka se ověří před každou iterací, jsou možná i další nastavení.

K vytvoření „nekonečné“ smyčky se obvykle používá konstrukce `while(true)`. Takovou smyčku lze zastavit direktivou `break`, stejně jako každou jinou.

Pokud nechceme už nic provádět v současné iteraci a chceme rovnou přejít k další, použijeme direktivu `continue`.

`break/continue` podporují návěští před cyklem. Návěští je jediný způsob, jak může `break/continue` ve vnořeném cyklu vyskočit z vnějšího cyklu.
