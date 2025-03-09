importance: 5

---

# Které proměnné jsou dostupné?

Následující funkce `vytvořPracovníka` vytvoří jinou funkci a vrátí ji. Nová funkce může být volána odjinud.

Bude mít přístup k vnějším proměnným z místa svého vzniku, nebo z místa volání, nebo z obojího?

```js
function vytvořPracovníka() {
  let jméno = "Petr";

  return function() {
    alert(jméno);
  };
}

let jméno = "Jan";

// vytvoření funkce
let pracuj = vytvořPracovníka();

// její volání
pracuj(); // co zobrazí?
```

Kterou hodnotu zobrazí? „Petr“ nebo „Jan“?
