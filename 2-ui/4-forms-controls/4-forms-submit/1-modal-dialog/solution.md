Modální okno lze implementovat pomocí poloprůhledného `<div id="zakrývající-div">`, který zakrývá celé okno, například:

```css
#zakrývající-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Protože tento `<div>` vše překrývá, bude všechna kliknutí dostávat on, ne stránka za ním.

Můžeme také zabránit rolování stránky nastavením `body.style.overflowY='hidden'`.

Formulář by neměl být v tomto `<div>`, ale vedle něj, jelikož nechceme, aby měl `opacity`.
