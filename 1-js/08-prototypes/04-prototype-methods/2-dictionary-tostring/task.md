importance: 5

---

# Přidejte toString do slovníku

Máme objekt `slovník` vytvořený použitím `Object.create(null)`, do něhož ukládáme libovolné dvojice `klíč/hodnota`.

Přidejte do něj metodu `slovník.toString()`, která by měla vracet seznam klíčů oddělených čárkou. Vaše metoda `toString` by se neměla ukazovat v cyklu `for..in` nad objektem.

Takto by to mělo fungovat:

```js
let slovník = Object.create(null);

*!*
// váš kód přidávající metodu slovník.toString
*/!*

// přidáme nějaká data
slovník.jablko = "Jablko";
slovník.__proto__ = "test"; // __proto__ je zde klíč obvyklé vlastnosti

// v cyklu jsou jen jablko a __proto__
for(let klíč in slovník) {
  alert(klíč); // "jablko", pak "__proto__"
}  

// váš toString v akci
alert(slovník); // "jablko,__proto__"
```
