
# Skripty: async, defer

Skripty na moderních webových stránkách jsou často „objemnější“ než HTML kód: jejich velikost při stahování je větší a čas zpracování je také delší.

Když prohlížeč načítá HTML kód a narazí na značku `<script>...</script>`, nemůže pokračovat v sestavování DOMu, ale musí okamžitě spustit skript. Pro externí skripty `<script src="..."></script>` platí totéž: prohlížeč musí počkat, než se skript načte, spustit načtený skript a teprve pak může zpracovat zbytek stránky.

To vede ke dvěma důležitým obtížím:

1. Skripty nevidí DOM elementy, které se nacházejí pod nimi, takže k nim nemohou přidávat handlery a podobně.
2. Pokud je na začátku stránky objemný skript, „zablokuje stránku“. Uživatelé neuvidí obsah stránky, dokud se skript nenačte a nespustí:

```html run height=100
<p>...obsah před skriptem...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Toto není vidět, dokud se skript nenačte -->
<p>...obsah za skriptem...</p>
```

Dá se to obejít několika způsoby. Můžeme například umístit skript na konec stránky. Pak uvidí elementy nad sebou a nezablokuje zobrazení obsahu stránky:

```html
<body>
  ...veškerý obsah je před skriptem...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Toto řešení má však k dokonalosti daleko. Prohlížeč si například všimne skriptu (a může ho začít načítat) až po načtení celého HTML dokumentu. U dlouhých HTML dokumentů to může způsobit znatelnou prodlevu.

Lidé s velmi rychlým připojením takové věci nevidí, ale na světě je stále mnoho lidí, kteří mají nízkou rychlost internetu a používají nedokonalé mobilní připojení.

Naštěstí značka `<script>` má dva atributy, které nám tento problém vyřeší: `defer` a `async`.

## defer

Atribut `defer` říká prohlížeči, že nemá na skript čekat. Prohlížeč bude místo čekání pokračovat ve zpracovávání HTML kódu a sestavování DOMu. Skript se načte „na pozadí“ a spustí se, až bude celý DOM sestaven.

Následující příklad je stejný jako výše uvedený, ale obsahuje `defer`:

```html run height=100
<p>...obsah před skriptem...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- viditelné okamžitě -->
<p>...obsah za skriptem...</p>
```

Jinými slovy:

- Skripty obsahující `defer` stránku nikdy nezablokují.
- Skripty obsahující `defer` se vždy spustí, až je DOM připraven (ale před událostí `DOMContentLoaded`).

Druhou část předvádí následující příklad:

```html run height=100
<p>...obsah před skripty...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM připraven po odložení!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...obsah za skripty...</p>
```

1. Obsah stránky se zobrazí okamžitě.
2. Handler události `DOMContentLoaded` čeká na odložený skript (obsahující `defer`). Spustí se až poté, co bude skript načten a vykonán.

**Vzájemné pořadí odložených skriptů zůstane zachováno, stejně jako u běžných skriptů.**

Dejme tomu, že máme dva odložené skripty: `long.js` (dlouhý) a `small.js` (krátký):

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

Prohlížeče hledají skripty na stránce a pro zlepšení výkonu je načítají paralelně. V uvedeném příkladu se tedy oba skripty budou načítat současně. Jako první zřejmě skončí `small.js`.

...Ale atribut `defer` kromě toho, že řekne prohlížeči, aby se „nezablokoval“, zajistí dodržení jejich vzájemného pořadí. I když se tedy jako první načte `small.js`, bude čekat a spustí se až po spuštění `long.js`.

Může to být důležité v případech, kdy potřebujeme načíst JavaScriptovou knihovnu a pak skript, který je na ní závislý.

```smart header="Atribut `defer` funguje jen pro externí skripty"
Pokud značka `<script>` neobsahuje `src`, atribut `defer` je ignorován.
```

## async

Atribut `async` je podobný `defer`. I on způsobí, že skript nezablokuje načítání stránky. V jejich chování jsou však důležité rozdíly.

Atribut `async` znamená, že skript je úplně nezávislý:

- Prohlížeč se na asynchronních skriptech (s `async`) nezablokuje (stejně jako u `defer`).
- Ostatní skripty nečekají na skripty s `async` a skripty s `async` nečekají na ně.
- `DOMContentLoaded` a asynchronní skripty nečekají na sebe navzájem:
    - `DOMContentLoaded` může nastat před asynchronním skriptem (jestliže načítání asynchronního skriptu skončí až po dokončení stránky)
    - ...nebo po asynchronním skriptu (jestliže byl asynchronní skript krátký nebo byl v HTTP mezipaměti).

Jinými slovy, skripty s `async` se načítají v pozadí a spustí se, jakmile jsou připraveny. DOM a ostatní skripty na ně nečekají a ony samy nečekají na nic. Naprosto nezávislý skript, který se spustí, jakmile je načten. Jednoduché, jak to jen může být, že?

Následující příklad se podobá tomu, co jsme viděli s `defer`: dva skripty `long.js` a `small.js`, ale nyní obsahují `async` místo `defer`.

Nebudou čekat na sebe navzájem. Ten, který se načte jako první (pravděpodobně `small.js`), se jako první spustí:

```html run height=100
<p>...obsah před skripty...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM je připraven!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...obsah za skripty...</p>
```

- Obsah stránky se okamžitě zobrazí: `async` jej neblokuje.
- `DOMContentLoaded` může nastat před i po `async`, nemáme tady žádnou záruku.
- Menší skript `small.js` je uveden jako druhý, ale načte se pravděpodobně dříve než `long.js`, takže `small.js` se spustí jako první. Ale může to být i tak, že se jako první načte `long.js`, je-li v mezipaměti, a pak se jako první spustí on. Jinými slovy, asynchronní skripty se spustí v pořadí „kdo se dřív načte“.

Asynchronní skripty se skvěle hodí, když integrujeme na stránku nezávislý skript třetí strany: počítadla, reklamy a podobně, jelikož ty nezávisejí na našich skriptech a naše skripty by na ně neměly čekat:

```html
<!-- takto se obvykle přidává Google Analytics -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

```smart header="Atribut `async` funguje jen pro externí skripty"
Stejně jako `defer`, i atribut `async` je ignorován, jestliže značka `<script>` neobsahuje `src`.
```

## Dynamické skripty

Je ještě jeden důležitý způsob, jak přidat skript na stránku.

Můžeme vytvořit skript a připojit jej k dokumentu dynamicky v JavaScriptu:

```js run
let skript = document.createElement('script');
skript.src = "/article/script-async-defer/long.js";
document.body.append(skript); // (*)
```

Skript se začne načítat hned, jakmile je připojen k dokumentu `(*)`.

**Dynamické skripty se standardně chovají jako „asynchronní“.**

To znamená:
- Na nic nečekají a nic nečeká na ně.
- Skript, který se načte první, se první spustí (pořadí „kdo se dřív načte“).

Můžeme to změnit, když explicitně nastavíme `skript.async=false`. Pak budou skripty spuštěny v pořadí podle dokumentu, stejně jako u `defer`.

V následujícím příkladu funkce `načtiSkript(src)` načte skript a také nastaví `async` na `false`.

Proto se `long.js` spustí vždy jako první (jelikož byl jako první přidán):

```js run
function načtiSkript(src) {
  let skript = document.createElement('script');
  skript.src = src;
  skript.async = false;
  document.body.append(skript);
}

// long.js se spustí jako první kvůli async=false
načtiSkript("/article/script-async-defer/long.js");
načtiSkript("/article/script-async-defer/small.js");
```

Bez `skript.async=false` by se skripty spustily standardně v pořadí, v jakém byly načteny (první zřejmě `small.js`).

Opět, stejně jako u `defer`, záleží na pořadí, jestliže chceme načíst knihovnu a pak jiný skript, který na ní závisí.


## Shrnutí

Atributy `async` a `defer` mají jedno společné: načítání takových skriptů neblokuje vykreslování stránky. Uživatel si tedy může ihned přečíst obsah stránky a seznámit se s ní.

Jsou však mezi nimi i významné rozdíly:

|         | Pořadí | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Kdo se dřív načte*. Na jejich pořadí v dokumentu nezáleží -- ten, který se načte první, se první spustí. |  Nemá vliv. Mohou se načíst a spustit, i když ještě není načten celý dokument. To se stává, když jsou skripty malé nebo jsou v mezipaměti a dokument je dostatečně dlouhý. |
| `defer` | *Pořadí podle dokumentu* (stejné, v jakém jsou uvedeny v dokumentu). |  Spustí se poté, co je dokument načten a zpracován (v případě potřeby čekají), bezprostředně před `DOMContentLoaded`. |

V praxi se `defer` používá pro skripty, které potřebují celý DOM a/nebo záleží na vzájemném pořadí jejich spuštění.

A `async` se používá pro nezávislé skripty, například počítadla nebo reklamy, na jejichž vzájemném pořadí spuštění nezáleží.

```warn header="Stránka bez skriptů by měla být použitelná"
Prosíme všimněte si, že jestliže použijete `defer` nebo `async`, pak uživatel uvidí stránku ještě *předtím*, než se skript načte.

V takovém případě nebudou některé grafické komponenty pravděpodobně ještě inicializovány.

Nezapomeňte přidat oznámení „načítá se“ a zakázat tlačítka, která ještě nefungují, aby uživatel jasně viděl, co už může na stránce dělat a co se teprve připravuje.
```
