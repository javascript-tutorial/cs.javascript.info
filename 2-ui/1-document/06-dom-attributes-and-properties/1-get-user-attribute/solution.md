
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-název-widgetu="menu">Vyberte žánr</div>

  <script>
    // získáme ho
    let elem = document.querySelector('[data-název-widgetu]');

    // načteme hodnotu
    alert(elem.dataset.názevWidgetu);
    // nebo
    alert(elem.getAttribute('data-název-widgetu'));
  </script>
</body>
</html>
```
