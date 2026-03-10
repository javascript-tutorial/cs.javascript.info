importance: 5

---

# Přidejte možnost volby

Máme `<select>`:

```html
<select id="žánry">
  <option value="rock">Rock</option>
  <option value="blues" selected>Blues</option>
</select>
```

Pomocí JavaScriptu:

1. Zobrazte hodnotu a text zvolené možnosti.
2. Přidejte další možnost: `<option value="klasika">Klasika</option>`.
3. Označte ji jako zvolenou.

Všimněte si, že pokud uděláte všechno správně, měl by váš alert zobrazit `blues`.
