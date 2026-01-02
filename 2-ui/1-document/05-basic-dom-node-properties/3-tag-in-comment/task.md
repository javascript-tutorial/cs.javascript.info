importance: 3

---

# Značka v komentáři

Co zobrazí tento kód?

```html
<script>
  let tělo = document.body;

  tělo.innerHTML = "<!--" + tělo.tagName + "-->";

  alert( tělo.firstChild.data ); // co bude zde?
</script>
```
