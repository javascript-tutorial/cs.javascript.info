importance: 5

---

# Změna „prototype“

V následujícím kódu vytvoříme `new Králík` a pak se pokusíme změnit jeho prototyp.

Na začátku máme tento kód:

```js run
function Králík() {}
Králík.prototype = {
  žere: true
};

let králík = new Králík();

alert( králík.žere ); // true
```


1. Přidáme další řádek (zvýrazněný). Co nyní zobrazí `alert`?

    ```js
    function Králík() {}
    Králík.prototype = {
      žere: true
    };

    let králík = new Králík();

    *!*
    Králík.prototype = {};
    */!*

    alert( králík.žere ); // ?
    ```

2. ...A když kód vypadá takto (jeden řádek změněn)?

    ```js
    function Králík() {}
    Králík.prototype = {
      žere: true
    };

    let králík = new Králík();

    *!*
    Králík.prototype.žere = false;
    */!*

    alert( králík.žere ); // ?
    ```

3. A takto (jeden řádek změněn)?

    ```js
    function Králík() {}
    Králík.prototype = {
      žere: true
    };

    let králík = new Králík();

    *!*
    delete králík.žere;
    */!*

    alert( králík.žere ); // ?
    ```

4. Poslední varianta:

    ```js
    function Králík() {}
    Králík.prototype = {
      žere: true
    };

    let králík = new Králík();

    *!*
    delete Králík.prototype.žere;
    */!*

    alert( králík.žere ); // ?
    ```
