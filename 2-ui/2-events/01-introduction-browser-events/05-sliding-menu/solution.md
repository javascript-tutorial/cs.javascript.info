
# HTML/CSS
Nejprve vytvořme HTML/CSS.

Menu je samostatná grafická komponenta na stránce, proto bude lepší je umístit do jediného DOM elementu.

Seznam prvků menu můžeme vytvořit jako seznam `ul/li`.

Struktura příkladu vypadá takto:

```html
<div class="menu">
  <span class="titulek">Sladkosti (klikni na mě)!</span>
  <ul>
    <li>Koláč</li>
    <li>Kobliha</li>
    <li>Med</li>
  </ul>
</div>
```

Pro titulek používáme `<span>`, jelikož `<div>` má implicitně `display:block` a obsadil by 100% vodorovné šířky.

Příklad:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sladkosti (klikni na mě)!</div>
```

Jestliže tedy na něm nastavíme `onclick`, bude zachytávat i kliknutí napravo od textu.

Protože `<span>` má implicitně `display: inline`, zabere přesně tolik místa, aby se do něj vešel celý text:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sladkosti (klikni na mě)!</span>
```

# Přepínání menu

Při přepnutí menu by se měla změnit šipka a zobrazit nebo skrýt seznam menu.

Všechny tyto změny lze dokonale ošetřit v CSS. V JavaScriptu bychom měli označit aktuální stav menu přidáním nebo odebráním třídy `.otevřeno`.

Bez ní bude menu zavřené:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .titulek::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...A s třídou `.otevřeno` se šipka změní a seznam se zobrazí:

```css
.menu.otevřeno .titulek::before {
  content: '▼ ';
}

.menu.otevřeno ul {
  display: block;
}
```
