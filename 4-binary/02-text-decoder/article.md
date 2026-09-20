# TextDecoder a TextEncoder

Co když jsou binární data ve skutečnosti řetězec? Například když obdržíme soubor s textovými daty.

Vestavěný objekt [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) nám umožní načíst hodnotu do skutečného JavaScriptového řetězce, když uvedeme buffer a kódování.

Nejprve jej musíme vytvořit:
```js
let dekodér = new TextDecoder([kódování], [volby]);
```

- **`kódování`** -- kódování, standardně `utf-8`, ale podporována jsou i `big5`, `windows-1251` a mnoho dalších.
- **`volby`** -- nepovinný objekt:
  - **`fatal`** -- booleovská hodnota, pokud je `true`, pak se pro neplatné (nerozkódovatelné) znaky vyhodí výjimka, jinak (standardně) budou nahrazeny znakem `\uFFFD`.
  - **`ignoreBOM`** -- booleovská hodnota, pokud je `true`, pak se ignoruje BOM (nepovinný znak pořadí bytů v Unicode), je potřeba jen zřídka.

...A pak dekódujeme:

```js
let řetězec = dekodér.decode([vstup], [volby]);
```

- **`vstup`** -- `BufferSource` k dekódování.
- **`volby`** -- nepovinný objekt:
  - **`stream`** -- `true` při dekódování proudů, kdy je `dekodér` volán opakovaně pro přicházející bloky dat. V takovém případě může být znak, zakódovaný ve více bytech, občas rozdělen mezi jednotlivé bloky. Tato volba říká, že si `TextDecoder` má pamatovat „nedokončené“ znaky a dekódovat je, až přijde další blok.

Příklad:

```js run
let uint8Array = new Uint8Array([65, 104, 111, 106]);

alert( new TextDecoder().decode(uint8Array) ); // Ahoj
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Chceme-li dekódovat jen část bufferu, můžeme pro ni vytvořit náhled z podpole:


```js run
let uint8Array = new Uint8Array([0, 65, 104, 111, 106, 0]);

// řetězec je uprostřed
// vytvoříme nad ním nový náhled, aniž bychom něco kopírovali
let binárníŘetězec = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binárníŘetězec) ); // Ahoj
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) provádí opak -- převádí řetězec na byty.

Jeho syntaxe je:

```js
let kodér = new TextEncoder();
```

Jediné kódování, které podporuje, je `utf-8`.

Má dvě metody:
- **`encode(řetězec)`** -- vrátí `Uint8Array` z řetězce.
- **`encodeInto(řetězec, cíl)`** -- zakóduje `řetězec` do objektu `cíl`, kterým musí být `Uint8Array`.

```js run
let kodér = new TextEncoder();

let uint8Array = kodér.encode("Ahoj");
alert(uint8Array); // 65,104,111,106
```
