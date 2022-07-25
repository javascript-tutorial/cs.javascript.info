Musíme „namapovat“ všechny hodnoty z intervalu 0..1 na hodnoty od `min` do `max`.

To můžeme udělat ve dvou krocích:

1. Když vynásobíme náhodné číslo z 0..1 číslem `max-min`, pak se interval možných hodnot zvětší z `0..1` na `0..max-min`.
2. Když nyní přičteme `min`, možný interval se změní na interval od `min` do `max`.

Funkce:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

