importance: 5

---

# Vylepšené chování tooltipu

Napište kód v JavaScriptu, který zobrazí tooltip nad elementem obsahujícím atribut `data-tooltip`. Textem tooltipu by měla být hodnota tohoto atributu.

Podobá se to úloze <info:task/behavior-tooltip>, ale elementy s tooltipem tentokrát mohou být vnořené. Zobrazí se ten nejhlouběji vnořený tooltip.

Může se zobrazit jen jeden tooltip současně.

Příklad:

```html
<div data-tooltip="Zde – je interiér domu" id="dům">
  <div data-tooltip="Zde – je střecha" id="střecha"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Číst dál…">Najeďte na mě</a>
</div>
```

Výsledek v rámu:

[iframe src="solution" height=300 border=1]
