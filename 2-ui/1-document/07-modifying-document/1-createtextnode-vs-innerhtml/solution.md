Odpověď: **1 a 3**.

Oba příkazy mají za následek přidání textu `text` „jako text“ do elementu `elem`.

Zde je příklad:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
