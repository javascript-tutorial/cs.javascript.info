importance: 5

---

# Odrážejí se ve funkci poslední změny?

Funkce `řekniAhoj` používá název externí proměnné. Když bude spuštěna, kterou hodnotu použije?

```js
let jméno = "Jan";

function řekniAhoj() {
  alert("Ahoj, " + jméno);
}

jméno = "Petr";

řekniAhoj(); // co zobrazí: "Jan" nebo "Petr"?
```

Takové situace jsou běžné při vývoji v prohlížeči i na straně serveru. Funkce může být navržena ke spuštění později, než byla vytvořena, například po uživatelské akci nebo síťovém požadavku.

Otázka tedy zní: odráží poslední změny?
