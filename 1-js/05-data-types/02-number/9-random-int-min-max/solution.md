# Jednoduché, ale nesprávné řešení

Jednoduchým, ale nesprávným řešením by bylo generovat hodnotu od `min` do `max` a zaokrouhlit ji:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

Tato funkce funguje, ale nekorektně. Pravděpodobnost, že získáme krajní hodnoty `min` a `max`, je dvakrát nižší, než u ostatních hodnot.

Jestliže si mnohokrát za sebou spustíte výše uvedený příklad, snadno uvidíte, že `2` se objevuje nejčastěji.

Děje se to proto, že `Math.round()` získává náhodná čísla z intervalu `1..3` a zaokrouhluje je následovně:

```js no-beautify
hodnoty od 1    ... do 1.4999999999  se zaokrouhlí na 1
hodnoty od 1.5  ... do 2.4999999999  se zaokrouhlí na 2
hodnoty od 2.5  ... do 2.9999999999  se zaokrouhlí na 3
```

Nyní jasně vidíme, že `1` má dvakrát méně hodnot než `2`. Totéž platí pro `3`.

# Správné řešení

Tato úloha má mnoho správných řešení. Jedno z nich je přizpůsobit hranice intervalu. Abychom zajistili stejné intervaly, můžeme generovat hodnoty od `0.5` do `3.5` a tím přidat požadované pravděpodobnosti krajních hodnot:

```js run
*!*
function randomInteger(min, max) {
  // nyní rand je od (min-0.5) do (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Alternativním způsobem by bylo použít `Math.floor` pro náhodné číslo od `min` do `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // zde rand je od min do (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Nyní jsou všechny intervaly mapovány tímto způsobem:

```js no-beautify
hodnoty od 1  ... do 1.9999999999  se zaokrouhlí na 1
hodnoty od 2  ... do 2.9999999999  se zaokrouhlí na 2
hodnoty od 3  ... do 3.9999999999  se zaokrouhlí na 3
```

Všechny intervaly mají stejnou délku, takže konečné rozložení je rovnoměrné.
