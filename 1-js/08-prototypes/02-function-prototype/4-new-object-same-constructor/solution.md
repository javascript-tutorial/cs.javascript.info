Tento přístup můžeme použít, pokud jsme si jisti, že vlastnost `„constructor“` obsahuje správnou hodnotu.

Například pokud se nedotkneme defaultní vlastnosti `„prototype“`, pak bude tento kód zaručeně fungovat:

```js run
function Uživatel(jméno) {
  this.jméno = jméno;
}

let uživatel = new Uživatel('Jan');
let uživatel2 = new uživatel.constructor('Petr');

alert( uživatel2.jméno ); // Petr (funguje!)
```

Funguje to, protože `Uživatel.prototype.constructor == Uživatel`.

...Ale pokud někdo dejme tomu přepíše `Uživatel.prototype` a zapomene znovu vytvořit `constructor`, aby odkazoval na `Uživatel`, pak to selže.

Například:

```js run
function Uživatel(jméno) {
  this.jméno = jméno;
}
*!*
Uživatel.prototype = {}; // (*)
*/!*

let uživatel = new Uživatel('Jan');
let uživatel2 = new uživatel.constructor('Petr');

alert( uživatel2.jméno ); // undefined
```

Proč je `uživatel2.jméno` `undefined`?

Takto funguje `new uživatel.constructor('Petr')`:

1. Nejprve hledá `constructor` v objektu `uživatel`. Nic.
2. Pak sleduje řetězec prototypů. Prototyp objektu `uživatel` je `Uživatel.prototype` a ani ten nemá žádný `constructor` (protože jsme ho „zapomněli“ správně nastavit!).
3. Jde řetězcem dále nahoru. `Uživatel.prototype` je planý objekt a jeho prototypem je vestavěný `Object.prototype`. 
4. Nakonec pro vestavěný `Object.prototype` je vestavěný `Object.prototype.constructor == Object`. Ten se tedy použije.

Nakonec tedy máme `let uživatel2 = new Object('Petr')`. 

To pravděpodobně není to, co chceme. Rádi bychom vytvořili `new Uživatel`, ne `new Object`. To je výsledek chybějící vlastnosti `constructor`.

(Jen pro případ, že vás to zajímá: volání `new Object(...)` převede svůj argument na objekt. To je teoretická záležitost, v praxi nikdo nevolá `new Object` s hodnotou a obecně vůbec nepoužíváme `new Object` k vytváření objektů.)