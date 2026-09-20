V úloze <info:task/animate-ball> jsme museli animovat jenom jednu vlastnost. Nyní potřebujeme ještě jednu: `elem.style.left`.

Vodorovná souřadnice se mění podle jiného pravidla: „neskáče“, ale postupně se zvyšuje a tím posunuje míč doprava.

Můžeme pro ni napsat další volání `animate`.

Jako časovací funkci bychom mohli použít `lineární`, ale mnohem lépe vypadá něco jako `vytvořEaseOut(naDruhou)`.

Kód:

```js
let výška = hřiště.clientHeight - míč.clientHeight;
let šířka = 100;

// animace horního okraje (skákání)
animate({
  duration: 2000,
  timing: vytvořEaseOut(skákání),
  draw: function(postup) {
    míč.style.top = výška * postup + 'px'
  }
});

// animace levého okraje (posun doprava)
animate({
  duration: 2000,
  timing: vytvořEaseOut(naDruhou),
  draw: function(postup) {
    míč.style.left = šířka * postup + "px"
  }
});
```
