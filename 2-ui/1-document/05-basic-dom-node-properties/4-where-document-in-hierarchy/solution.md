
K jaké třídě patří, můžeme zjistit tak, že si ho zobrazíme, třeba:

```js run
alert(document); // [object HTMLDocument]
```

Nebo:

```js run
alert(document.constructor.name); // HTMLDocument
```

Objekt `document` je tedy instancí třídy `HTMLDocument`.

Jaké je jeho místo v hierarchii?

Ano, můžeme si projít specifikaci, ale rychlejší bude zjistit to ručně.

Projděme řetězec prototypů použitím `__proto__`.

Jak víme, metody třídy jsou ve vlastnosti konstruktoru `prototype`. Například `HTMLDocument.prototype` obsahuje metody pro dokumenty.

Uvnitř `prototype` je také odkaz na konstruktor:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Abychom získali název třídy jako řetězec, můžeme použít `constructor.name`. Udělejme to pro celý prototypový řetězec objektu `document` až po třídu `Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

To je jeho hierarchie.

Můžeme tento objekt prozkoumat i pomocí `console.dir(document)` a podívat se na názvy otevřením `__proto__`. Konzole je interně přebírá z `constructor`.
