importance: 5

---

# Modální formulář

Vytvořte funkci `zobrazDotaz(html, callback)`, která zobrazí formulář se zprávou `html`, vstupním polem a tlačítky `OK/STORNO`.

- Uživatel by měl něco napsat do textového pole a stisknout `key:Enter` nebo tlačítko OK, pak bude volána funkce `callback(hodnota)` s hodnotou, kterou zadal.
- Jinak pokud uživatel stiskne `key:Esc` nebo STORNO, bude voláno `callback(null)`.

V obou případech bude proces vstupu ukončen a formulář se odstraní.

Požadavky:

- Formulář by měl být uprostřed okna.
- Formulář je *modální*. Jinými slovy, není možná žádná interakce se zbytkem stránky, dokud ho uživatel nezavře.
- Když se formulář zobrazí, fokus by měl být nastaven na `<input>` pro uživatele.
- Klávesy `key:Tab`/`key:Shift+Tab` by měly přepínat fokus mezi poli formuláře a neměly by umožnit odchod na jiné prvky stránky.

Příklad použití:

```js
zobrazDotaz("Zadejte něco<br>...chytrého :)", function(hodnota) {
  alert(hodnota);
});
```

Demo ve vnitřním rámu:

[iframe src="solution" height=160 border=1]

P.S. Zdrojový dokument obsahuje HTML/CSS pro formulář s fixní pozicí, ale učinit ho modálním je už na vás.
