
K přidání tlačítka můžeme použít buď `position:absolute` (a nastavit u záložky `position:relative`), nebo `float:right`. `float:right` má tu výhodu, že tlačítko nikdy nepřekryje text, ale `position:absolute` nám dává větší svobodu. Volba je tedy na vás.

Pak může kód pro každou záložku vypadat takto:
```js
záložka.insertAdjacentHTML("afterbegin", '<button class="tlačítko-odstranit">[x]</button>');
```

Pak se `<button>` stane `záložka.firstChild`, takže k němu můžeme přidat handler následovně:

```js
záložka.firstChild.onclick = () => záložka.remove();
```
