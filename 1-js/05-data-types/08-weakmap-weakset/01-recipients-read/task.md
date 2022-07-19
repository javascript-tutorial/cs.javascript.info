importance: 5

---

# Uložení označení „přečteno“

Máme pole zpráv:

```js
let zprávy = [
  {text: "Ahoj", od: "Jan"},
  {text: "Jak se máš?", od: "Jan"},
  {text: "Brzy se uvidíme", od: "Alice"}
];
```

Váš kód k němu může přistupovat, ale zprávy spravuje kód někoho jiného. Tento kód pravidelně přidává nové zprávy a odebírá staré. Vy neznáte přesný okamžik, kdy se to stane.

Kterou datovou strukturu nyní můžete použít k uložení informace, že zpráva „byla přečtena“? Struktura musí být vybavena tak, aby pro zadaný objekt zprávy vydala odpověď na otázku „byla zpráva přečtena?“.

P.S. Když je zpráva odstraněna z pole `zprávy`, měla by zmizet i z vaší struktury.

P.P.S. Objekty zpráv bychom neměli modifikovat a přidávat do nich naše vlastnosti. Protože je spravuje kód někoho jiného, mohlo by to vést k nežádoucím důsledkům.
