# File a FileReader

Objekt třídy [File](https://www.w3.org/TR/FileAPI/#dfn-file) je zděděn z `Blob` a je rozšířen o schopnosti týkající se souborového systému.

Je možné ho získat dvěma způsoby.

Prvním je konstruktor, podobně jako `Blob`:

```js
new File(částiSouboru, názevSouboru, [volby])
```

- **`částiSouboru`** -- je pole hodnot Blob/BufferSource/String.
- **`názevSouboru`** -- řetězec s názvem souboru.
- **`volby`** -- nepovinný objekt:
    - **`lastModified`** -- časové razítko (celočíselné datum) poslední změny.

Druhým, častějším způsobem je získání souboru z `<input type="file">`, přetažení nebo jiného prohlížečového rozhraní. V takovém případě soubor získá tyto informace z operačního systému.

Jelikož `File` je zděděn z `Blob`, objekty `File` mají stejné vlastnosti jako `Blob` a navíc:
- `name` -- název souboru,
- `lastModified` -- časové razítko poslední změny.

Tímto způsobem můžeme získat objekt `File` z `<input type="file">`:

```html run
<input type="file" onchange="zobrazSoubor(this)">

<script>
function zobrazSoubor(vstup) {
  let soubor = vstup.files[0];

  alert(`Název souboru: ${soubor.name}`); // např. my.png
  alert(`Naposledy změněn: ${soubor.lastModified}`); // např. 1552830408824
}
</script>
```

```smart
Ve vstupu je možné vybrat více souborů, proto `vstup.files` je objekt podobný poli, který je obsahuje. Zde máme pouze jeden soubor, takže prostě vezmeme `vstup.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) je objekt, jehož jediným smyslem je načítat data z objektů `Blob` (a tedy i `File`).

Data doručuje pomocí událostí, neboť načítání z disku může nějaký čas trvat.

Konstruktor:

```js
let reader = new FileReader(); // bez argumentů
```

Hlavní metody:

- **`readAsArrayBuffer(blob)`** -- načte data v binárním formátu `ArrayBuffer`.
- **`readAsText(blob, [kódování])`** -- načte data jako textový řetězec se zadaným kódováním (standardně `utf-8`).
- **`readAsDataURL(blob)`** -- načte binární data a zakóduje je do datového URL v base64.
- **`abort()`** -- zruší prováděnou operaci.

Volba metody `read*` závisí na tom, kterému formátu dáváme přednost a jak chceme tato data použít.

- `readAsArrayBuffer` -- pro binární soubory, pro provádění operací nízké úrovně. Operace vysoké úrovně, např. vyjímání části dat, jsou ve `File` zděděny z `Blob`, takže je můžeme volat rovnou bez načítání.
- `readAsText` -- pro textové soubory, když chceme získat řetězec.
- `readAsDataURL` -- kdybychom chtěli použít data v `src` značky `img` nebo jiné. Pro tento účel existuje alternativa k načítání souboru, kterou jsme probrali v kapitole <info:blob>: `URL.createObjectURL(soubor)`.

Když načítání probíhá, nastávají tyto události:
- `loadstart` -- načítání začalo.
- `progress` -- nastává během načítání.
- `load` -- načítání skončilo bez chyb.
- `abort` -- voláno `abort()`.
- `error` -- nastala chyba.
- `loadend` -- načítání skončilo, ať už úspěšně nebo s chybou.

Když načítání skončilo, můžeme přistupovat k výsledku následovně:
- `reader.result` je výsledek (pokud skončilo úspěšně),
- `reader.error` je chyba (pokud selhalo).

Nejčastěji používanými událostmi jsou bezpochyby `load` a `error`.

Příklad načítání souboru:

```html run
<input type="file" onchange="načtiSoubor(this)">

<script>
function načtiSoubor(vstup) {
  let soubor = vstup.files[0];

  let reader = new FileReader();

  reader.readAsText(soubor);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="`FileReader` pro bloby"
Jak jsme zmínili v kapitole <info:blob>, `FileReader` umí načítat nejen soubory, ale všechny bloby.

S jeho pomocí můžeme převést blob na jiný formát:
- `readAsArrayBuffer(blob)` -- na `ArrayBuffer`,
- `readAsText(blob, [kódování])` -- na řetězec (alternativa k `TextDecoder`),
- `readAsDataURL(blob)` -- na datové URL v base64.
```


```smart header="Ve Web Workers je k dispozici i `FileReaderSync`"
Pro Web Workers existuje i synchronní varianta `FileReader`, nazvaná [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Jeho načítací metody `read*` negenerují události, ale vracejí výsledek, stejně jako běžné funkce.

To je však možné jen uvnitř Web Workeru, protože prodlevy v synchronních voláních, které mohou při načítání ze souborů nastat, nejsou ve Web Workers tak důležité. Nemají vliv na stránku.
```

## Shrnutí

Objekty `File` jsou zděděny z `Blob`.

Kromě metod a vlastností `Blob` mají objekty `File` i vlastnosti `name` a `lastModified` a vnitřní schopnost číst ze souborového systému. Objekty `File` zpravidla získáváme z uživatelského vstupu, například `<input>` nebo událostí přetažení (`ondragend`).

Objekty `FileReader` umějí číst ze souboru nebo blobu, a to v jednom ze tří formátů:
- Řetězec (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Datové URL, zakódované pomocí base64 (`readAsDataURL`).

V mnoha případech však nemusíme načíst obsah souboru. Můžeme vytvořit krátké URL voláním `URL.createObjectURL(soubor)` a přiřadit je do `<a>` nebo `<img>`, stejně jako jsme to dělali s bloby. Tímto způsobem můžeme stáhnout soubor nebo jej zobrazit jako obrázek, jako součást plátna a podobně.

A pokud chceme poslat `File` po síti, je to také snadné: síťová API, např. `XMLHttpRequest` nebo `fetch`, přirozeně přijímají objekty `File`.
