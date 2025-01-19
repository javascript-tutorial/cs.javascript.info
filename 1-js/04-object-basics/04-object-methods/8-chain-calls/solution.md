Řešením je v každém volání vrátit tento objekt samotný.

```js run demo
let žebřík = {
  stupeň: 0,
  nahoru() {
    this.stupeň++;
*!*
    return this;
*/!*
  },
  dolů() {
    this.stupeň--;
*!*
    return this;
*/!*
  },
  zobrazStupeň() {
    alert( this.stupeň );
*!*
    return this;
*/!*
  }
};

žebřík.nahoru().nahoru().dolů().zobrazStupeň().dolů().zobrazStupeň(); // zobrazí 1, pak 0
```

Můžeme také psát každé volání na nový řádek. U delšího zřetězení je to čitelnější:

```js
žebřík
  .nahoru()
  .nahoru()
  .dolů()
  .zobrazStupeň() // 1
  .dolů()
  .zobrazStupeň(); // 0
```
