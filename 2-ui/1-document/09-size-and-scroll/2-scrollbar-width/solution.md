Abychom zjistili šířku posuvníku, můžeme vytvořit element s rolováním, ale bez ohraničení a vnitřních okrajů.

Pak bude rozdíl mezi jeho úplnou šířkou `offsetWidth` a šířkou vnitřní plochy obsahu `clientWidth` přesně šířka posuvníku:

```js run
// vytvoříme div s posuvníkem
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// musíme jej vložit do dokumentu, jinak budou velikosti nulové
document.body.append(div);
let šířkaPosuvníku = div.offsetWidth - div.clientWidth;

div.remove();

alert(šířkaPosuvníku);
```
