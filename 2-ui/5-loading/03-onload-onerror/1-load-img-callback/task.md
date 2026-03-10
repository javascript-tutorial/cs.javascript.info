importance: 4

---

# Načtení obrázků s callbackem

Za normálních okolností se obrázky načítají, když jsou vytvořeny. Když tedy na stránku přidáme `<img>`, uživatel neuvidí obrázek okamžitě. Prohlížeč jej musí napřed načíst.

Abychom obrázek zobrazili hned, můžeme jej vytvořit „v předstihu“, například takto:

```js
let obrázek = document.createElement('img');
obrázek.src = 'my.jpg';
```

Prohlížeč začne načítat obrázek a zapamatuje si ho v mezipaměti. Když se později tentýž obrázek objeví v dokumentu (nezáleží na tom, jak), ukáže se okamžitě.

**Vytvořte funkci `načtiObrázkyPředem(zdroje, callback)`, která načte všechny obrázky z pole `zdroje`, a až budou připraveny, spustí `callback`.**

Například tento kód po načtení obrázků zobrazí `alert`:

```js
function načteny() {
  alert("Obrázky načteny")
}

načtiObrázkyPředem(["1.jpg", "2.jpg", "3.jpg"], načteny);
```

V případě chyby by funkce stále měla považovat obrázek za „načtený“.

Jinými slovy, `callback` se spustí, až budou všechny obrázky buď načteny, nebo jejich načítání skončí chybou.

Tato funkce je užitečná například tehdy, když plánujeme zobrazit galerii s mnoha rolovatelnými obrázky a chceme zajistit, aby všechny obrázky byly načteny.

Ve zdrojovém dokumentu najdete odkazy na testovací obrázky a také kód, který ověří, zda jsou načteny nebo ne. Měl by vypsat `300`.
