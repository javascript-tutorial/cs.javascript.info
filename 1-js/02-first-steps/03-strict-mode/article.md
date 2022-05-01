# Moderní režim, „use strict“

Dlouhou dobu byl JavaScript vyvíjen bez problémů s kompatibilitou. Do jazyka byly přidávány nové prvky, zatímco stará funkcionalita se neměnila.

Mělo to tu výhodu, že se nerozbíjel již existující kód. Nevýhodou však bylo, že každá chyba nebo nedokonalé rozhodnutí tvůrců JavaScriptu zůstala v jazyce zakotvena navždy.

To platilo až do roku 2009, kdy se objevil ECMAScript 5 (ES5), který do jazyka přidal nové vlastnosti a upravil některé již existující. Aby starý kód nepřestal fungovat, většina těchto úprav je defaultně vypnuta. Musíte je výslovně povolit speciální direktivou: `"use strict"`.

## „use strict“

Tato direktiva má podobu řetězce: `"use strict"` nebo `'use strict'`. Když je umístěna na začátku skriptu, celý skript bude fungovat „moderním“ způsobem.

Příklad:

```js
"use strict";

// tento kód funguje moderním způsobem
...
```

Brzy se naučíme používat funkce (způsob, jak seskupit příkazy), a tak s předstihem zmíníme, že `"use strict"` můžeme umístit i na začátek funkce. Když to uděláme, umožníme striktní režim pouze v této funkci. Většinou jej však lidé používají pro celý skript.

````warn header="Zajistěte, aby „use strict“ bylo na začátku"
Zajistěte, aby `"use strict"` bylo hned na samém začátku vašeho skriptu, jinak nebude striktní režim povolen.

Zde není striktní režim povolen:

```js no-strict
alert("nějaký kód");
// níže uvedený "use strict" se ignoruje - musí být na začátku

"use strict";

// striktní režim není aktivován
```

Nad `"use strict"` nesmí být nic jiného než komentáře.
````

```warn header="`use strict` nelze nijak zrušit"
Neexistuje žádná direktiva jako `"no use strict"`, která by vrátila motoru výchozí chování. Jakmile jednou vstoupíme do striktního režimu, už není cesty zpět.
```

## Prohlížečová konzole

Všimněte si, že když spouštíte kód ve [vývojářské konzoli](info:devtools), nepoužívá `use strict` defaultně.
Někdy, když `use strict` znamená rozdíl, dostanete nesprávné výsledky.

Jak tedy vlastně používat `use strict` v konzoli?

Za prvé, můžete zkusit vložit více řádků pomocí `key:Shift+Enter` a umístit `use strict` na začátek, například takto:

```js
'use strict'; <Shift+Enter pro nový řádek>
//  ...váš kód
<Enter pro spuštění>
```

Funguje to ve většině prohlížečů, konkrétně ve Firefoxu a Chrome.

Pokud to nefunguje, např. v nějakém starém prohlížeči, existuje jeden nepěkný, ale spolehlivý způsob, jak zajistit `use strict`. Umístěte jej do tohoto wrapperu:

```js
(function() {
  'use strict';

  // ...zde je váš kód...
})()
```

## Měli bychom používat „use strict“?

Odpověď na tuto otázku se může zdát samozřejmá, ale není tomu tak.

Můžeme doporučit, abyste zahajovali skripty `"use strict"`... ale víte, co je fajn?

Moderní JavaScript podporuje „třídy“ a „moduly“ - pokročilé jazykové struktury (určitě se k nim dostaneme), které používají `use strict` automaticky. Pokud je tedy používáme, nemusíme direktivu `use strict` přidávat.

**Prozatím tedy `"use strict"` používejte; na začátku vašich skriptů bývá vítaným hostem. Později, až budete mít celý svůj kód v třídách a modulech, jej můžete vypustit.**

Prozatím tedy víme, jak obecně `use strict` používat.
Až se v dalších kapitolách naučíme další vlastnosti jazyka, poznáme rozdíly mezi striktním a starším režimem. Naštěstí jich není mnoho a ve skutečnosti nám spíše zlepšují život.

Všechny příklady v našem tutoriálu předpokládají striktní režim, pokud není (velmi zřídka) uvedeno jinak.
