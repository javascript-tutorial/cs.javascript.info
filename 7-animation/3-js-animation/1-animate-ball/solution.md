Pro skákání můžeme využít CSS vlastnost `top` a `position:absolute` pro míč uvnitř hřiště s `position:relative`.

Dolní souřadnice hřiště je `hřiště.clientHeight`. CSS vlastnost `top` se odkazuje na horní okraj míče, takže by měla probíhat od `0` do `hřiště.clientHeight - míč.clientHeight`, což je konečná nejnižší pozice horního okraje míče.

Pro efekt „skákání“ můžeme použít časovací funkci `skákání` v režimu `easeOut`.

Zde je konečný kód animace:

```js
let kam = hřiště.clientHeight - míč.clientHeight;

animate({
  duration: 2000,
  timing: vytvořEaseOut(skákání),
  draw(postup) {
    míč.style.top = kam * postup + 'px'
  }
});
```
