importance: 5

---

# Rozdíl mezi voláními

Vytvořme nový objekt `králík`:

```js
function Králík(jméno) {
  this.jméno = jméno;
}
Králík.prototype.řekniAhoj = function() {
  alert(this.jméno);
};

let králík = new Králík("Králík");
```

Učiní všechna tato volání totéž, nebo ne?

```js
králík.řekniAhoj();
Králík.prototype.řekniAhoj();
Object.getPrototypeOf(králík).řekniAhoj();
králík.__proto__.řekniAhoj();
```
