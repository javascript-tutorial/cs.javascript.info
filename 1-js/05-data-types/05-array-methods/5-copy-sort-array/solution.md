Můžeme použít metodu `slice()`, aby vytvořila kopii, a spustit řazení na ní:

```js run
function zkopírujASeřaď(pole) {
  return pole.slice().sort();
}

let původníPole = ["HTML", "JavaScript", "CSS"];

*!*
let seřazenéPole = zkopírujASeřaď(původníPole);
*/!*

alert( seřazenéPole );
alert( původníPole );
```

