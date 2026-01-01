Je mnoho způsobů, jak toho dosáhnout.

Zde jsou některé z nich:

```js
// 1. Tabulka s `id="tabulka-věků"`.
let tabulka = document.getElementById('tabulka-věků')

// 2. Všechny elementy <label> uvnitř této tabulky
tabulka.getElementsByTagName('label')
// nebo
document.querySelectorAll('#tabulka-věků label')

// 3. První element <td> v této tabulce (se slovem „Věk“)
tabulka.rows[0].cells[0]
// nebo
tabulka.getElementsByTagName('td')[0]
// nebo
tabulka.querySelector('td')

// 4. Formulář s názvem "hledání"
// předpokládáme, že v dokumentu je jen jeden element s name="hledání"
let form = document.getElementsByName('hledání')[0]
// nebo specificky formulář
document.querySelector('form[name="hledání"]')

// 5. První <input> v tomto formuláři
form.getElementsByTagName('input')[0]
// nebo
form.querySelector('input')

// 6. Poslední <input> v tomto formuláři
let vstupy = form.querySelectorAll('input') // najdeme všechny vstupy
vstupy[vstupy.length-1] // vezmeme poslední
```
