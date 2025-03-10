
# Unicode, vnitřní reprezentace řetězce

```warn header="Pokročilá znalost"
Tato kapitola se hlouběji zabývá vnitřní reprezentací řetězců. Tato znalost vám bude užitečná, jestliže plánujete pracovat s emoji, vzácnými matematickými nebo hieroglyfickými znaky nebo jinými vzácnými symboly.
```

Jak už víme, řetězce v JavaScriptu jsou založeny na [Unicode](https://cs.wikipedia.org/wiki/Unicode): každý znak je reprezentován posloupností 1 až 4 bytů.

JavaScript nám umožňuje vložit znak do řetězce specifikací jeho hexadecimálního kódu v Unicode pomocí jednoho z následujících tří zápisů:

- `\xXX`

    `XX` musí být dvě hexadecimální číslice s hodnotou mezi `00` a `FF`, pak `\xXX` je znak, jehož kód v Unicode je `XX`.

    Protože zápis `\xXX` podporuje jen dvě hexadecimální číslice, může být použit jen pro prvních 256 znaků Unicode.

    Těchto prvních 256 znaků obsahuje latinskou abecedu, většinu základních syntaktických znaků a některé další. Například `"\x7A"` je totéž jako `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, symbol copyrightu
    ```

- `\uXXXX`

    `XXXX` musí být přesně 4 hexadecimální číslice s hodnotou mezi `0000` a `FFFF`, pak `\uXXXX` je znak, jehož kód v Unicode je `XXXX`.

    Tímto zápisem mohou být reprezentovány i znaky, jejichž hodnoty v Unicode jsou větší než `U+FFFF`, ale v takovém případě musíme použít takzvaný zástupný pár (o zástupných párech pohovoříme později v této kapitole).

    ```js run
    alert( "\u00A9" ); // ©, totéž jako \xA9 s použitím 4-ciferného hexadecimálního zápisu
    alert( "\u044F" ); // я, písmeno z kyrilice (azbuky)
    alert( "\u2191" ); // ↑, symbol šipky nahoru
    ```

- `\u{X…XXXXXX}`

    `X…XXXXXX` musí být hexadecimální hodnota 1 až 6 bytů mezi `0` a `10FFFF` (nejvyšší kódová hodnota definovaná v Unicode). Tento zápis nám umožňuje snadno reprezentovat všechny existující znaky v Unicode.

    ```js run
    alert( "\u{20331}" ); // 佫, vzácný čínský znak (dlouhý Unicode)
    alert( "\u{1F60D}" ); // 😍, symbol usmívající se tváře (další dlouhý Unicode)
    ```

## Zástupné páry

Všechny často používané znaky mají 2-bytové kódy (4 hexadecimální číslice). Písmena ve většině evropských jazyků, číslice a základní sjednocené ideografické sady CJK (CJK -- pro čínské, japonské a korejské písemné soustavy) mají 2-bytovou reprezentaci.

JavaScript byl původně založen na kódování UTF-16, které umožňovalo jen 2 byty na znak. Avšak 2 byty umožňují jen 65536 kombinací, a to pro každý možný symbol v Unicode nestačí.

Vzácné symboly, které vyžadují více než 2 byty, jsou tedy zakódovány dvojicí 2-bytových znaků nazývanou „zástupný pár“ („surrogate pair“).

Vedlejším efektem je, že délka takových symbolů je `2`:

```js run
alert( '𝒳'.length ); // 2, VELKÉ X V MATEMATICKÉM PÍSMU
alert( '😂'.length ); // 2, TVÁŘ SE SLZAMI RADOSTI
alert( '𩷶'.length ); // 2, vzácný čínský znak
```

Je to proto, že v době, kdy JavaScript vznikl, ještě zástupné páry neexistovaly, a proto nejsou jazykem správně zpracovávány!

Ve skutečnosti máme v každém z uvedených řetězců jediný symbol, ale vlastnost `length` ukazuje délku `2`.

Rovněž získání symbolu může být problematické, jelikož většina prvků jazyka zachází se zástupnými páry jako se dvěma znaky.

Například zde vidíme na výstupu dva podivné znaky:

```js run
alert( '𝒳'[0] ); // zobrazuje zvláštní symboly...
alert( '𝒳'[1] ); // ...části zástupného páru
```

Části zástupného páru nemají jedna bez druhé žádný význam. V uvedeném příkladu se tedy ve skutečnosti zobrazí nesmysly.

Technicky lze zástupné páry detekovat podle jejich kódu: jestliže znak má kód v intervalu `0xd800..0xdbff`, pak je to první část zástupného páru. Další znak (druhá část) musí mít kód v intervalu `0xdc00..0xdfff`. Tyto intervaly jsou ve standardu exkluzívně rezervovány pro zástupné páry.

Proto byly do JavaScriptu přidány metody [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) a [řetězec.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt), které si dokáží se zástupnými páry poradit.

Jsou v zásadě stejné jako [String.fromCharCode](mdn:js/String/fromCharCode) a [řetězec.charCodeAt](mdn:js/String/charCodeAt), ale se zástupnými páry zacházejí správně.

Zde vidíme rozdíl:

```js run
// charCodeAt nezná zástupné páry, takže vydá kód pro 1. část:
alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt zná zástupné páry
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, přečte obě části zástupného páru
```

Ovšem načítáme-li od pozice 1 (a to je zde dosti nekorektní), pak obě vrátí jen druhou část páru:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// nesmyslná 2. část páru
```

Další způsoby, jak si se zástupnými páry poradit, naleznete v kapitole <info:iterable>. Pravděpodobně pro to existují i speciální knihovny, ale žádná není dostatečně známá na to, abychom ji tady doporučili.

````warn header="Zásadní zjištění: dělení řetězců na libovolném místě je nebezpečné"
Nemůžeme jen tak rozdělit řetězec na libovolné pozici, např. volat `řetězec.slice(0, 6)` a očekávat, že to bude platný řetězec, např.:

```js run
alert( 'ahoj 😂'.slice(0, 6) ); //  ahoj [?]
```

Zde vidíme na výstupu nesmyslný znak (první polovinu zástupného páru úsměvu).

Mějte to na paměti, jestliže zamýšlíte zodpovědně pracovat se zástupnými páry. Nemusí to být velký problém, ale aspoň byste měli rozumět tomu, co se děje.
````

## Diakritická znaménka a normalizace

Mnoho jazyků obsahuje symboly, které se skládají ze základního znaku a znaménka nad nebo pod ním.

Například písmeno `a` může být základním znakem pro tyto znaky: `àáâäãåā`.

Většina běžných „složených“ znaků má v tabulce Unicode svůj vlastní kód. Ne však všechny, protože možných kombinací je příliš mnoho.

Abychom mohli používat libovolné složeniny, standard Unicode nám umožňuje použít několik znaků Unicode za sebou: základní znak následovaný jedním nebo více znaky „znamének“, která jej „ozdobí“.

Například máme-li `S` následované speciálním znakem „tečka nahoře“ (kód `\u0307`), zobrazí se jako Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Potřebujeme-li další znaménko nad písmenem (nebo pod ním) -- žádný problém, jednoduše přidáme potřebný znak znaménka.

Například připojíme-li znak „tečka dole“ (kód `\u0323`), budeme mít „S s tečkami nahoře a dole“: `Ṩ`.

Příklad:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

To nám poskytuje velkou flexibilitu, ale také zajímavý problém: dva znaky mohou vizuálně vypadat stejně, ale být reprezentovány různými složeninami z Unicode.

Příklad:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + tečka nahoře + tečka dole
let s2 = 'S\u0323\u0307'; // Ṩ, S + tečka dole + tečka nahoře

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false, třebaže znaky vypadají stejně (?!)
```

Řešení nám poskytuje algoritmus „normalizace Unicode“, který převádí každý řetězec do jednoduché „normální“ formy.

Je implementován metodou [řetězec.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Je humorné, že v naší situaci `normalize()` ve skutečnosti spojí posloupnost tří znaků do jednoho: `\u1e68` (S se dvěma tečkami).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

V realitě však tomu tak není vždy. Důvodem je, že symbol `Ṩ` je „dostatečně běžný“, takže jej tvůrci Unicode zahrnuli do hlavní tabulky a přiřadili mu kód.

Pokud se chcete o pravidlech a variantách normalizace dozvědět víc, jsou popsána v příloze standardu Unicode: [Normalizační formy Unicode](https://www.unicode.org/reports/tr15/), ale pro většinu praktických účelů je informace z tohoto článku dostačující.
