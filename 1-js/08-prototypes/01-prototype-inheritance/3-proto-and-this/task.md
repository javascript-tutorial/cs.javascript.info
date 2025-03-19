importance: 5

---

# Kam se to zapíše?

Máme objekt `králík` zděděný z objektu `zvíře`.

Jestliže zavoláme `králík.žer()`, který objekt získá vlastnost `sytý`: `zvíře` nebo `králík`? 

```js
let zvíře = {
  žer() {
    this.sytý = true;
  }
};

let králík = {
  __proto__: zvíře
};

králík.žer();
```
