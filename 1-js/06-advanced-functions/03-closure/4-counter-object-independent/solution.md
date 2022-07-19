Jistě že to bude fungovat správně.

Obě vnořené funkce jsou vytvořeny uvnitř stejného vnějšího lexikálního prostředí, takže mají společný přístup ke stejné proměnné `počet`:

```js run
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

alert( čítač.zvyš() ); // 1
alert( čítač.zvyš() ); // 2
alert( čítač.sniž() ); // 1
```
