Odpověď zní: `1` a `2`.

První handler se spustí proto, že nebyl odstraněn funkcí `removeEventListener`. Abychom handler odstranili, museli bychom předat přesně tutéž funkci, která byla přiřazena. V kódu je však předána nová funkce, která vypadá stejně, ale přesto je to jiná funkce.

Abychom odstranili objekt funkce, museli bychom si uložit odkaz na něj, například:

```js
function handler() {
  alert(1);
}

tlačítko.addEventListener("click", handler);
tlačítko.removeEventListener("click", handler);
```

Handler `tlačítko.onclick` funguje nezávisle a navíc k `addEventListener`.
