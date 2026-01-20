importance: 4

---

# Řaditelná tabulka

Umožněte řazení tabulky: po kliknutí na element `<th>` by se měla seřadit podle příslušného sloupce.

Každý `<th>` má v atributu typ, například:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Věk</th>
      <th data-type="string">Jméno</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>Jan</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Anna</td>
    </tr>
    ...
  </tbody>
</table>
```

V uvedeném příkladu první sloupec obsahuje čísla a druhý řetězce. Řadicí funkce by měla provádět řazení podle typu.

Měly by být podporovány jen typy `"string"` a `"number"`.

Funkční příklad:

[iframe border=1 src="solution" height=190]

P.S. Tabulka může být velká, počet řádků a sloupců může být libovolný.
