
Nejprve se podíváme, jak to *nedělat*:

```js
function vyčisti(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

To nebude fungovat, protože volání `remove()` posune prvky v kolekci `elem.childNodes`, takže elementy budou pokaždé začínat od indexu `0`. Avšak `i` se zvýší a některé elementy tedy budou přeskočeny.

Cyklus `for..of` dělá totéž.

Správná varianta může být:

```js
function vyčisti(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

A existuje i jednodušší způsob, jak udělat totéž:

```js
function vyčisti(elem) {
  elem.innerHTML = '';
}
```
