# Vnější rohy

Vnější rohy jsou v zásadě to, co dostaneme od funkce [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Souřadnice levého horního rohu `odpověď1` a pravého dolního rohu `odpověď2`:

```js
let souřadnice = elem.getBoundingClientRect();

let odpověď1 = [souřadnice.left, souřadnice.top];
let odpověď2 = [souřadnice.right, souřadnice.bottom];
```

# Vnitřní levý horní roh

Od vnějšího rohu se liší o šířku ohraničení. Spolehlivý způsob, jak vzdálenost zjistit, je `clientLeft/clientTop`:

```js
let odpověď3 = [souřadnice.left + hřiště.clientLeft, souřadnice.top + hřiště.clientTop];
```

# Vnitřní pravý dolní roh

V našem případě musíme odečíst velikost ohraničení od vnějších souřadnic.

Můžeme použít CSS:

```js
let odpověď4 = [
  souřadnice.right - parseInt(getComputedStyle(hřiště).borderRightWidth),
  souřadnice.bottom - parseInt(getComputedStyle(hřiště).borderBottomWidth)
];
```

Alternativní způsob by byl přičíst `clientWidth/clientHeight` k souřadnicím levého horního rohu. To je asi ještě lepší:

```js
let odpověď4 = [
  souřadnice.left + hřiště.clientLeft + hřiště.clientWidth,
  souřadnice.top + hřiště.clientTop + hřiště.clientHeight
];
```
