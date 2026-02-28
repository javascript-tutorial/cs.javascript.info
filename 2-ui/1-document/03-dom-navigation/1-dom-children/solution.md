Způsobů je mnoho, například:


DOM uzel `<div>`:

```js
document.body.firstElementChild
// nebo
document.body.children[0]
// nebo (první uzel je mezerový, takže vezmeme až druhý)
document.body.childNodes[1]
```

DOM uzel `<ul>`:

```js
document.body.lastElementChild
// nebo
document.body.children[1]
```

Druhý uzel `<li>` (obsahující Petra):

```js
// získáme <ul> a pak získáme jeho poslední dětský element
document.body.lastElementChild.lastElementChild
```
