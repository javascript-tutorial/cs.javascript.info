
# Element šablony

Zabudovaný element `<template>` slouží jako úložiště šablon HTML kódu. Prohlížeč ignoruje jeho obsah a zkontroluje jen správnost syntaxe, ale v JavaScriptu k němu můžeme přistupovat a používat ho k vytvoření dalších elementů.

Teoreticky můžeme pro účely uložení HTML kódu vytvořit někde v HTML jakýkoli neviditelný element. Co je na `<template>` zvláštního?

Především jeho obsahem může být libovolný HTML, i když by normálně vyžadoval příslušnou uzavírací značku.

Například do něj můžeme vložit řádek tabulky `<tr>`:
```html
<template>
  <tr>
    <td>Obsah</td>
  </tr>
</template>
```

Zpravidla když se pokusíme vložit `<tr>` třeba dovnitř `<div>`, prohlížeč detekuje vadnou strukturu DOMu a „opraví“ ji tak, že kolem ní přidá `<table>`. To není to, co chceme. Naproti tomu `<template>` uchovává přesně to, co tam umístíme.

Do `<template>` můžeme ukládat i styly a skripty:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Ahoj");
  </script>
</template>
```

Prohlížeč zachází s obsahem `<template>`, jako by byl „mimo dokument“: styly se neaplikují, skripty se nespustí, `<video autoplay>` se nepřehraje a podobně.

Obsah ožije (styly se aplikují, skripty se spustí atd.), až když jej vložíme do dokumentu.

## Vložení šablony

Obsah šablony je k dispozici v její vlastnosti `content` jako [DocumentFragment](info:modifying-document#document-fragment) -- zvláštní typ DOM uzlu.

Můžeme s ním zacházet jako s kterýmkoli jiným DOM uzlem až na jednu speciální vlastnost: když ho někam vložíme, namísto něj se vloží jeho děti.

Příklad:

```html run
<template id="šablona">
  <script>
    alert("Ahoj");
  </script>
  <div class="zpráva">Ahoj, světe!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Naklonujeme obsah šablony, abychom ho mohli použít vícekrát
  elem.append(šablona.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Nyní se skript z <template> spustí
</script>
```

Přepišme příklad stínového DOMu z minulé kapitoly pomocí `<template>`:

```html run untrusted autorun="no-epub" height=60
<template id="šablona">
  <style> p { font-weight: bold; } </style>
  <p id="zpráva"></p>
</template>

<div id="elem">Klikněte na mě</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(šablona.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('zpráva').innerHTML = "Ahoj ze stínu!";
  };
</script>
```

Když na řádku `(*)` naklonujeme a vložíme `šablona.content`, vloží se namísto něj jeho děti (`<style>`, `<p>`), protože je to `DocumentFragment`.

Budou tvořit stínový DOM:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="zpráva"></p>
</div>
```

## Shrnutí

Když to shrneme:

- Obsahem `<template>` může být jakýkoli syntakticky správný HTML.
- S obsahem `<template>` se zachází, jako by byl „mimo dokument“, takže nic neovlivní.
- V JavaScriptu můžeme přistupovat k obsahu šablony `šablona.content` a naklonovat ho, abychom ho mohli použít v nové komponentě.

Značka `<template>` je poměrně unikátní, neboť:

- Prohlížeč kontroluje syntaxi HTML uvnitř ní (na rozdíl od řetězce se šablonou uvnitř skriptu).
- ...Stále však umožňuje použít libovolné HTML značky nejvyšší úrovně, včetně těch, které bez příslušných obklopujících značek nedávají smysl (např. `<tr>`).
- Obsah se stane interaktivním, až bude vložen do dokumentu: skripty se spustí, `<video autoplay>` se začne přehrávat atd.

Element `<template>` neobsahuje žádné iterační mechanismy, datové vazby nebo substituce proměnných, ale můžeme si je na něm implementovat.
