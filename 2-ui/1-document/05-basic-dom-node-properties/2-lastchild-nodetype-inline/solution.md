Je tady chyták.

Ve chvíli výkonu skriptu `<script>` je poslední DOM uzel právě `<script>`, protože prohlížeč ještě nezpracoval zbytek stránky.

Výsledek je tedy `1` (elementový uzel).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
