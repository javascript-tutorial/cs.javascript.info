# Události change, input, cut, copy, paste

Probereme různé události, které doprovázejí aktualizaci dat.

## Událost change

Událost `change` se spustí, když je dokončena změna elementu.

U textových vstupů to znamená, že událost nastane, když element ztratí fokus.

Například dokud píšeme do následujícího textového pole, událost nenastane. Jakmile však přesuneme fokus jinam, například klikneme na tlačítko, událost `change` se vyvolá:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Tlačítko">
```

Pro jiné elementy: `select`, `input type=checkbox/radio` se spustí hned po změně volby:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Zvolte něco</option>
  <option value="1">Možnost 1</option>
  <option value="2">Možnost 2</option>
  <option value="3">Možnost 3</option>
</select>
```


## Událost input

Událost `input` se spustí pokaždé, když uživatel změní hodnotu.

Na rozdíl od událostí klávesnice se spustí při každé změně hodnoty, i když nebyla provedena klávesnicí: při vkládání pomocí myši nebo při diktování textu pomocí rozpoznávání řeči.

Příklad:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="výsledek"></span>
<script>
  input.oninput = function() {
    výsledek.innerHTML = input.value;
  };
</script>
```

Pokud chceme zpracovávat každou změnu hodnoty v `<input>`, pak je tato událost nejlepší možností.

Na druhou stranu, událost `input` se nespustí při vstupu z klávesnice a jiných akcích, které nezpůsobí změnu hodnoty, např. při stisknutí šipkových kláves `key:⇦` `key:⇨`, když jsme ve vstupním poli.

```smart header="V `oninput` nelze nic zakázat"
Událost `input` se spustí až poté, co byla hodnota změněna.

Nemůžeme v ní tedy použít `událost.preventDefault()` -- je už pozdě, nemělo by to žádný efekt.
```

## Události cut, copy, paste

Tyto události nastávají při vyjmutí/zkopírování/vložení hodnoty.

Patří do třídy [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) a poskytují přístup k datům, která jsou vyjmuta/zkopírována/vložena.

Můžeme také tuto akci zrušit voláním `událost.preventDefault()`, pak se nic nezkopíruje/nevloží.

Například následující kód zakáže všechny události `cut/copy/paste` a zobrazí text, který se pokoušíme vyjmout/zkopírovat/vložit:

```html autorun height=40 run
<input type="text" id="vstup">
<script>
  vstup.onpaste = function(událost) {
    alert("paste: " + událost.clipboardData.getData('text/plain'));
    událost.preventDefault();
  };

  vstup.oncut = vstup.oncopy = function(událost) {
    alert(událost.type + '-' + document.getSelection());
    událost.preventDefault();
  };
</script>
```

Prosíme všimněte si, že volání `událost.clipboardData.getData(...)` uvnitř handlerů událostí `cut` a `copy` vrátí prázdný řetězec. Je to tím, že data ještě technicky nejsou ve schránce. Jestliže použijeme `událost.preventDefault()`, nebudou vůbec zkopírována.

Uvedený příklad tedy k získání označeného textu používá `document.getSelection()`. Podrobnosti o výběru textu v dokumentu najdete v kapitole <info:selection-range>.

Je možné zkopírovat/vložit nejenom text, ale cokoli. Můžeme například zkopírovat a vložit soubor ze správce souborů v operačním systému.

Je to tím, že `clipboardData` implementuje rozhraní `DataTransfer`, běžně používané pro přetahování a kopírování/vkládání. Je to už trochu mimo náš rámec, ale jeho metody naleznete ve [specifikaci DataTransferu](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Kromě toho existuje další asynchronní API pro přístup ke schránce: `navigator.clipboard`. Více o něm naleznete ve specifikaci [API a události schránky](https://www.w3.org/TR/clipboard-apis/), [není podporováno ve Firefoxu](https://caniuse.com/async-clipboard).

### Bezpečnostní omezení

Schránka je „globální“ záležitost na úrovni operačního systému. Uživatel se může přepínat mezi různými aplikacemi a kopírovat/vkládat rozličné věci, ale stránka v prohlížeči by je neměla vidět.

Většina prohlížečů tedy umožňuje plynulé čtení a zápis do schránky jedině v rámci určitých uživatelských akcí, například kopírování/vkládání.

Ve všech prohlížečích kromě Firefoxu je zakázáno generovat „vlastní“ události schránky pomocí `dispatchEvent`. A i když dokážeme takovou událost vyvolat, specifikace jasně uvádí, že takové „syntetické“ události nesmějí poskytovat přístup do schránky.

I kdyby se někdo rozhodl v handleru události uložit `událost.clipboardData` a později k nim přistoupit, nebude to fungovat.

Abychom to zopakovali, [událost.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) funguje výhradně v kontextu uživatelem vyvolaných handlerů událostí.

Naproti tomu [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) je novější API, určené k použití v jakémkoli kontextu, a pokud je třeba, zeptá se uživatele na svolení.

## Shrnutí

Události pro změnu dat:

| Událost | Popis | Zvláštnosti |
|---------|----------|-------------|
| `change`| Hodnota byla změněna. | U textových polí se spouští při ztrátě fokusu. |
| `input` | U textových polí při každé změně. | Na rozdíl od `change` se spouští okamžitě. |
| `cut/copy/paste` | Akce vyjmutí/zkopírování/vložení. | Tuto akci lze zakázat. Vlastnost `událost.clipboardData` poskytuje přístup do schránky. Všechny prohlížeče kromě Firefoxu navíc podporují `navigator.clipboard`. |
