importance: 5

---

# Které handlery se spustí?

V proměnné je tlačítko, na kterém není žádný handler.

Které handlery se po vykonání následujícího kódu spustí kliknutím na tlačítko? Které zprávy se zobrazí?

```js no-beautify
tlačítko.addEventListener("click", () => alert("1"));

tlačítko.removeEventListener("click", () => alert("1"));

tlačítko.onclick = () => alert(2);
```
