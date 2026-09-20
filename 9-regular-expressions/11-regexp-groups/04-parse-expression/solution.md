Regulární výraz pro číslo je: `pattern:-?\d+(\.\d+)?`. Vytvořili jsme ho v předchozí úloze.

Operátor je `pattern:[-+*/]`. Pomlčka `pattern:-` je v hranatých závorkách uvedena jako první, protože uprostřed by znamenala rozsah znaků, ale my potřebujeme právě znak `-`.

Lomítko `/` by mělo být v JavaScriptovém RV `pattern:/.../` předznamenáno únikovým znakem, uděláme to později.

Potřebujeme číslo, operátor a pak další číslo. A nepovinné mezery mezi nimi.

Celý regulární výraz: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

Má 3 části a mezi nimi je `pattern:\s*`:
1. `pattern:-?\d+(\.\d+)?` - první číslo,
2. `pattern:[-+*/]` - operátor,
3. `pattern:-?\d+(\.\d+)?` - druhé číslo.

Aby z každé z těchto částí vznikl samostatný prvek v poli výsledků, uzavřeme je do závorek: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

V akci:

```js run
let rv = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(rv) );
```

Výsledek obsahuje:

- `výsledek[0] == "1.2 + 12"` (celá shoda)
- `výsledek[1] == "1.2"` (první skupina `(-?\d+(\.\d+)?)` -- první číslo včetně desetinné části)
- `výsledek[2] == ".2"` (druhá skupina`(\.\d+)?` -- první desetinná část)
- `výsledek[3] == "+"` (třetí skupina `([-+*\/])` -- operátor)
- `výsledek[4] == "12"` (čtvrtá skupina `(-?\d+(\.\d+)?)` -- druhé číslo)
- `výsledek[5] == undefined` (pátá skupina `(\.\d+)?` -- poslední desetinná část chybí, takže je undefined)

Chceme jen čísla a operátor, ne celou shodu nebo desetinné části, takže výsledek trochu „pročistíme“.

Celou shodu (první prvek pole) můžeme odstranit posunem pole `výsledek.shift()`.

Skupiny obsahující desetinné části (skupiny 2 a 4) `pattern:(.\d+)` můžeme vyloučit přidáním `pattern:?:` na začátek: `pattern:(?:\.\d+)?`.

Konečné řešení:

```js run
function parsuj(výraz) {
  let rv = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let výsledek = výraz.match(rv);

  if (!výsledek) return [];
  výsledek.shift();

  return výsledek;
}

alert( parsuj("-1.23 * 3.45") );  // -1.23, *, 3.45
```

Alternativou k použití nezachytávacího `?:` by bylo pojmenování skupin, například:

```js run
function parsuj(výraz) {
	let rv = /(?<a>-?\d+(?:\.\d+)?)\s*(?<operátor>[-+*\/])\s*(?<b>-?\d+(?:\.\d+)?)/;

	let výsledek = výraz.match(rv);

	return [výsledek.groups.a, výsledek.groups.operátor, výsledek.groups.b];
}

alert( parsuj("-1.23 * 3.45") );  // -1.23, *, 3.45;
```