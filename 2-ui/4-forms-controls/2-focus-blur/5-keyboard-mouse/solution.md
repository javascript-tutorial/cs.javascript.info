
Můžeme použitím `myš.onclick` zpracovat kliknutí a učinit myš „pohyblivou“ pomocí `position:fixed`, pak v `myš.onkeydown` zpracovávat šipkové klávesy.

Jediný problém je v tom, že `keydown` se spouští jedině na elementech s fokusem. Musíme tedy do elementu přidat `tabindex`. Jelikož máme zakázáno měnit HTML kód, můžeme k tomu použít vlastnost `myš.tabIndex`.

P.S. Můžeme také nahradit `myš.onclick` za `myš.onfocus`.
