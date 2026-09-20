
# FormData

Tato kapitola pojednává o odesílání HTML formulářů: se soubory nebo bez nich, s dodatečnými poli a podobně.

Mohou nám s tím pomoci objekty třídy [FormData](https://xhr.spec.whatwg.org/#interface-formdata). Jak jste možná uhádli, tento objekt reprezentuje data HTML formuláře.

Jeho konstruktor je následující:
```js
let formData = new FormData([form]);
```

Pokud je uveden HTML element `form`, objekt automaticky načte jeho pole.

Zvláštností na `FormData` je, že síťové metody, např. `fetch`, mohou přijímat objekt `FormData` jako tělo požadavku. Bude zakódován a odeslán s `Content-Type: multipart/form-data`.

Z pohledu serveru to vypadá jako obvyklé odeslání formuláře.

## Poslání jednoduchého formuláře

Nejprve pošleme jednoduchý formulář.

Jak vidíte, je to skoro na jeden řádek:

```html run autorun
<form id="formElem">
  <input type="text" name="jméno" value="Jan">
  <input type="text" name="příjmení" value="Novák">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let odpověď = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let výsledek = await odpověď.json();

    alert(výsledek.message);
  };
</script>
```

Serverový kód není v tomto příkladu uveden, protože je mimo náš rámec. Server přijme požadavek POST a odpoví „User saved“ („Uživatel uložen“).

## Metody třídy FormData

Pole ve `FormData` můžeme měnit pomocí těchto metod:

- `formData.append(název, hodnota)` - přidá do formuláře pole s názvem `název` a hodnotou `hodnota`,
- `formData.append(název, blob, názevSouboru)` - přidá pole, jako by to bylo `<input type="file">`, třetí argument `názevSouboru` nastaví název souboru (ne název formulářového pole), jako by to byl název souboru z uživatelova souborového systému,
- `formData.delete(název)` - odstraní pole s názvem `název`,
- `formData.get(název)` - vrátí hodnotu pole s názvem `název`,
- `formData.has(název)` - pokud existuje pole s názvem `název`, vrátí `true`, jinak vrátí `false`.

Technicky formulář smí obsahovat více polí se stejným názvem, takže několik volání `append` přidá několik polí se stejným názvem.

Existuje i metoda `set`, která má stejnou syntaxi jako `append`, ale rozdíl spočívá v tom, že `.set` odstraní všechna pole s názvem `název` a pak přidá nové pole. Tím zajistí, že ve formuláři bude jen jedno pole s názvem `název`. Všechno ostatní je jako u `append`:

- `formData.set(název, hodnota)`,
- `formData.set(název, blob, názevSouboru)`.

Můžeme také iterovat nad poli ve `formData` pomocí cyklu `for..of`:

```js run
let formData = new FormData();
formData.append('klíč1', 'hodnota1');
formData.append('klíč2', 'hodnota2');

// Seznam dvojic klíč/hodnota
for(let [název, hodnota] of formData) {
  alert(`${název} = ${hodnota}`); // klíč1 = hodnota1, pak klíč2 = hodnota2
}
```

## Poslání formuláře se souborem

Formulář se vždy posílá jako `Content-Type: multipart/form-data`. Toto kódování umožňuje posílat soubory. Posílají se tedy i pole `<input type="file">`, podobně jako při obvyklém odeslání formuláře.

Následující příklad obsahuje takový formulář:

```html run autorun
<form id="formElem">
  <input type="text" name="křestníJméno" value="Jan">
  Obrázek: <input type="file" name="obrázek" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let odpověď = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let výsledek = await odpověď.json();

    alert(výsledek.message);
  };
</script>
```

## Posílání formuláře s daty blobu

Jak jsme viděli v kapitole <info:fetch>, je snadné poslat dynamicky generovaná binární data, např. obrázek, jako `Blob`. Můžeme jej předat přímo jako parametr `body` metody `fetch`.

V praxi je však často vhodnější neposílat obrázek odděleně, ale jako součást formuláře s dalšími poli, například s názvem nebo jinými metadaty.

Navíc servery jsou obvykle lépe navrženy pro příjem formulářů zakódovaných v `multipart` než planých binárních dat.

Tento příklad posílá pomocí `FormData` obrázek z `<canvas>` spolu s některými dalšími poli jako formulář:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Odeslat" onclick="odešli()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function odešli() {
      let blobObrázku = await new Promise(splň => canvasElem.toBlob(splň, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "Jan");
      formData.append("image", blobObrázku, "image.png");
*/!*    

      let odpověď = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let výsledek = await odpověď.json();
      alert(výsledek.message);
    }

  </script>
</body>
```

Prosíme všimněte si, jak se přidává obrázek `Blob`:

```js
formData.append("image", blobObrázku, "image.png");
```

Je to totéž, jako by ve formuláři byl `<input type="file" name="image">` a návštěvník poslal ze svého souborového systému soubor s názvem `"image.png"` (3. argument) a daty `blobObrázku` (2. argument).

Server načte data formuláře a soubor stejně, jako při obvyklém odeslání formuláře.

## Shrnutí

Objekty [FormData](https://xhr.spec.whatwg.org/#interface-formdata) se používají k načtení HTML formuláře a jeho odeslání metodou `fetch` nebo jinou síťovou metodou.

Můžeme buď vytvořit `new FormData(form)` z HTML formuláře, nebo vytvořit objekt úplně bez formuláře a pak do něj přidávat pole následujícími metodami:

- `formData.append(název, hodnota)`
- `formData.append(název, blob, názevSouboru)`
- `formData.set(název, hodnota)`
- `formData.set(název, blob, názevSouboru)`

Všimněme si zde dvou zvláštností:

1. Metoda `set` odstraní pole se stejným názvem, metoda `append` ne. To je jediný rozdíl mezi nimi.
2. K odeslání souboru potřebujeme tříargumentovou syntaxi. Poslední argument je název souboru, který se v `<input type="file">` zpravidla bere z uživatelova souborového systému.

Další metody jsou:

- `formData.delete(název)`
- `formData.get(název)`
- `formData.has(název)`

A je to!
