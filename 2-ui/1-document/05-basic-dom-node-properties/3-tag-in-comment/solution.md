Odpověď zní: **`BODY`**.

```html run
<script>
  let tělo = document.body;

  tělo.innerHTML = "<!--" + tělo.tagName + "-->";

  alert( tělo.firstChild.data ); // BODY
</script>
```

Krok za krokem, co se děje:

1. Obsah značky `<body>` je nahrazen komentářem. Tímto komentářem je `<!--BODY-->`, jelikož `body.tagName == "BODY"`. Jak si pamatujeme, `tagName` je v HTML vždy velkými písmeny.
2. Tento komentář je nyní jediným dětským uzlem, takže jej získáme v `body.firstChild`.
3. Vlastnost `data` komentáře obsahuje jeho obsah (uvnitř `<!--...-->`): `"BODY"`.
