Řešení, krok po kroku:

```html run
<select id="žánry">
  <option value="rock">Rock</option>
  <option value="blues" selected>Blues</option>
</select>

<script>
  // 1)
  let zvolenáMožnost = žánry.options[žánry.selectedIndex];
  alert( zvolenáMožnost.value );

  // 2)
  let nováMožnost = new Option("Klasika", "klasika");
  žánry.append(nováMožnost);

  // 3)
  nováMožnost.selected = true;
</script>
```
