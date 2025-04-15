importance: 5

---

# Objekt čítače

Zde je vytvořen objekt čítače pomocí konstruktoru.

Bude to fungovat? Co se zobrazí?

```js
function Čítač() {
  let počet = 0;

  this.zvyš = function() {
    return ++počet;
  };
  this.sniž = function() {
    return --počet;
  };
}

let čítač = new Čítač();

alert( čítač.zvyš() ); // ?
alert( čítač.zvyš() ); // ?
alert( čítač.sniž() ); // ?
```

