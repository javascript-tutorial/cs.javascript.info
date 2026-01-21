Když prohlížeč načte atribut `on*`, např. `onclick`, vytvoří handler z jeho obsahu.

Pro `onclick="handler()"` funkce bude:

```js
function(událost) {
  handler() // obsah atributu onclick
}
```

Nyní vidíme, že hodnota, kterou vrátí `handler()`, není použita a nemá vliv na výsledek.

Oprava je jednoduchá:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Můžeme také použít `událost.preventDefault()` následovně:

```html run
<script>
*!*
  function handler(událost) {
    alert("...");
    událost.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
