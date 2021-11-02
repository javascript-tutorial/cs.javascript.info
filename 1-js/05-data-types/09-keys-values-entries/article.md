
# Metody Object.keys, values, entries

Odhlédněme nyní od individuálních datových struktur a promluvme si o iteracích nad nimi.

V předchozí kapitole jsme viděli metody `mapa.keys()`, `mapa.values()`, `mapa.entries()`.

Tyto metody jsou generické, existuje společná dohoda ohledně jejich používání pro datové struktury. Jestliže si sami vytvoříme vlastní datovou strukturu, měli bychom je implementovat také.

Jsou podporovány v:

- `Map`
- `Set`
- `Array`

Plané objekty rovněž podporují podobné metody, ale jejich syntaxe je trochu jiná.

## Object.keys, values, entries

Pro plané objekty jsou k dispozici následující metody:

- [Object.keys(obj)](mdn:js/Object/keys) -- vrací pole klíčů.
- [Object.values(obj)](mdn:js/Object/values) -- vrací pole hodnot.
- [Object.entries(obj)](mdn:js/Object/entries) -- vrací pole dvojic `[klíč, hodnota]`.

Prosíme, všimněte si rozdílů (například ve srovnání s mapou):

|                | Mapa                | Objekt                                  |
|----------------|---------------------|-----------------------------------------|
| Syntaxe volání | `mapa.keys()`       | `Object.keys(obj)`, ale ne `obj.keys()` |
| Vrací          | iterovatelný objekt | „skutečné“ pole                         |

Prvním rozdílem je, že musíme volat `Object.keys(obj)`, ne `obj.keys()`.

Proč tomu tak je? Hlavním důvodem je flexibilita. Pamatujte, že objekty jsou základem všech složitých struktur v JavaScriptu. Můžeme tedy mít svůj vlastní objekt, např. `data`, který implementuje svou vlastní metodu `data.values()`. A přesto na něm můžeme volat `Object.values(data)`.

Druhým rozdílem je, že metody `Object.*` vracejí „opravdová“ pole, ne jen iterovatelné objekty. Tak tomu je zejména z historických důvodů.

Příklad:

```js
let uživatel = {
  jméno: "Jan",
  věk: 30
};
```

- `Object.keys(uživatel) = ["jméno", "věk"]`
- `Object.values(uživatel) = ["Jan", 30]`
- `Object.entries(uživatel) = [ ["jméno","Jan"], ["věk",30] ]`

Zde je příklad použití `Object.values` k procházení hodnot vlastností:

```js run
let uživatel = {
  jméno: "Jan",
  věk: 30
};

// cyklus nad hodnotami
for (let hodnota of Object.values(uživatel)) {
  alert(hodnota); // Jan, poté 30
}
```

```warn header="Object.keys/values/entries ignorují symbolické vlastnosti"
Stejně jako cyklus `for..in`, i tyto metody ignorují vlastnosti, jejichž klíčem je `Symbol(...)`.

Zpravidla nám to vyhovuje. Jestliže však chceme i symbolické klíče, existuje samostatná metoda [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols), která vrací pole výhradně symbolických klíčů. Existuje i metoda [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), která vrací *všechny* klíče.
```


## Transformace objektů

Objekty postrádají mnohé metody, které existují pro pole, např. `map`, `filter` a jiné.

Pokud je chceme použít, můžeme použít `Object.entries`, po níž bude následovat `Object.fromEntries`:

1. Použijte `Object.entries(obj)` k získání pole dvojic klíč/hodnota z `obj`.
2. Na tomto poli použijte metody polí, např. `map`.
3. Na výsledné pole volejte `Object.fromEntries(pole)`, která z něj opět udělá objekt.

Například máme objekt s cenami a rádi bychom je zdvojnásobili:

```js run
let ceny = {
  banány: 1,
  pomeranče: 2,
  maso: 4,
};

*!*
let dvojnásobnéCeny = Object.fromEntries(
  // převedeme na pole, zmapujeme a pak nám funkce fromEntries znovu vytvoří objekt
  Object.entries(ceny).map(([klíč, hodnota]) => [klíč, hodnota * 2])
);
*/!*

alert(dvojnásobnéCeny.maso); // 8
```   

Na první pohled to může vypadat obtížně, ale jakmile to jednou nebo dvakrát použijete, bude snadné tomu porozumět. Tímto způsobem můžeme vytvořit silné řetězce transformací.