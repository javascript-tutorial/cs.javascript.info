importance: 1

---

# Proč tady zbude „aaa“?

V následujícím příkladu volání `tabulka.remove()` odstraní tabulku z dokumentu.

Pokud si ho však spustíte, uvidíte, že text `"aaa"` je stále viditelný.

Proč se tak děje?

```html height=100 run
<table id="tabulka">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(tabulka); // tabulka, jak by měla vypadat

  tabulka.remove();
  // proč je v dokumentu stále „aaa“?
</script>
```
