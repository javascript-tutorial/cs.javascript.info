importance: 5

---

# Zkopírujte a seřaďte pole

Máme pole řetězců `pole`. Chtěli bychom mít jeho seřazenou kopii, ale `pole` chceme ponechat nezměněné.

Napište funkci `zkopírujASeřaď(pole)`, která takovou kopii vrátí.

```js
let pole = ["HTML", "JavaScript", "CSS"];

let seřazenéPole = zkopírujASeřaď(pole);

alert( seřazenéPole ); // CSS, HTML, JavaScript
alert( pole ); // HTML, JavaScript, CSS (beze změn)
```
