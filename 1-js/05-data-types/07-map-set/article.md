# Mapa a množina

Prozatím jsme se naučili dvěma následujícím složitým datovým strukturám:

- Objekty se používají k ukládání klíčovaných kolekcí.
- Pole se používají k ukládání seřazených kolekcí.

Pro skutečný život to však nestačí. Proto existují také `Map` (mapa) a `Set` (množina).

## Mapa

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) je kolekce datových prvků uložených pod klíči, podobně jako `Object`. Hlavní rozdíl je však v tom, že `Map` umožňuje klíče libovolného typu.

Její metody a vlastnosti jsou:

- `new Map()` -- vytvoří mapu.
- [`mapa.set(klíč, hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- uloží hodnotu pod klíčem.
- [`mapa.get(klíč)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- vrátí hodnotu podle klíče, jestliže `klíč` v mapě neexistuje, vrátí `undefined`.
- [`mapa.has(klíč)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- vrátí `true`, jestliže `klíč` existuje, jinak `false`.
- [`mapa.delete(klíč)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- odstraní prvek (dvojici klíč/hodnota) podle zadaného klíče.
- [`mapa.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- odstraní z mapy všechny hodnoty.
- [`mapa.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- vrátí aktuální počet prvků.

Příklad:

```js run
let mapa = new Map();

mapa.set('1', 'str1');   // řetězcový klíč
mapa.set(1, 'num1');     // číselný klíč
mapa.set(true, 'bool1'); // booleovský klíč

// pamatujete si na obvyklý Object? ten převádí klíče na řetězce
// Map si pamatuje typ klíče, takže tyto dva klíče jsou rozdílné:
alert( mapa.get(1)   ); // 'num1'
alert( mapa.get('1') ); // 'str1'

alert( mapa.size ); // 3
```

Jak vidíme, na rozdíl od objektů zde nejsou klíče převáděny na řetězce. Je povolen jakýkoli typ klíče.

```smart header="`mapa[klíč]` není správný způsob, jak používat mapu"
Ačkoli `mapa[klíč]` funguje také, např. můžeme nastavit `mapa[klíč] = 2`, zachází s mapou jako s planým JavaScriptovým objektem, takže pro něj platí všechna příslušná omezení (jen řetězcové/symbolické klíče a podobně).

Měli bychom tedy používat metody mapy: `set`, `get` a tak dále.
```

**Mapa může používat jako klíče i objekty.**

Příklad:

```js run
let jan = { jméno: "Jan" };

// pro každého uživatele budeme ukládat počet jeho návštěv
let mapaPočetNávštěv = new Map();

// jan je klíč mapy
mapaPočetNávštěv.set(jan, 123);

alert( mapaPočetNávštěv.get(jan) ); // 123
```

Používání objektů jako klíčů je jedna z nejpozoruhodnějších a nejdůležitějších vlastností map. Pro `Object` to neplatí. Řetězec jako klíč objektu je správně, ale jako klíč objektu nemůžeme použít jiný `Object`.

Zkusme to:

```js run
let jan = { jméno: "Jan" };
let ben = { jméno: "Ben" };

let objPočetNávštěv = {}; // zkusíme použít objekt

objPočetNávštěv[ben] = 234; // zkusíme použít jako klíč objekt ben
objPočetNávštěv[jan] = 123; // zkusíme použít jako klíč objekt jan, objekt ben bude nahrazen

*!*
// Toto bude zapsáno!
alert( objPočetNávštěv["[object Object]"] ); // 123 
*/!*
```

Jelikož `objPočetNávštěv` je objekt, převede všechny klíče typu `Object`, např. výše uvedené `jan` a `ben`, na stejný řetězec `"[object Object]"`. To rozhodně není to, co jsme chtěli.

```smart header="Jak `Map` porovnává klíče"
Pro testování ekvivalence klíčů `Map` používá algoritmus [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Je to zhruba totéž jako striktní rovnost `===`, ale rozdíl spočívá v tom, že `NaN` se považuje za rovné `NaN`. Jako klíč tedy můžeme použít i `NaN`.

Tento algoritmus nemůžeme změnit nebo si ho přizpůsobit.
```

````smart header="Zřetězení"
Každé volání `mapa.set` vrátí samotnou mapu, takže volání můžeme „zřetězit“:

```js
mapa.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Iterace nad mapou

Pro procházení prvků mapy existují 3 metody:

- [`mapa.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- vrátí iterovatelný objekt klíčů,
- [`mapa.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- vrátí iterovatelný objekt hodnot,
- [`mapa.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) --  vrátí iterovatelný objekt dvojic `[klíč, hodnota]`, používá se standardně ve `for..of`.

Příklad:

```js run
let mapaRecept = new Map([
  ['okurky',  500],
  ['rajčata', 350],
  ['cibule',  50]
]);

// iterace nad klíči (zelenina)
for (let zelenina of mapaRecept.keys()) {
  alert(zelenina); // okurky, rajčata, cibule
}

// iterace nad hodnotami (množství)
for (let množství of mapaRecept.values()) {
  alert(množství); // 500, 350, 50
}

// iterace nad dvojicemi [klíč, hodnota]
for (let dvojice of mapaRecept) { // totéž jako mapaRecept.entries()
  alert(dvojice); // okurky,500 (a tak dále)
}
```

```smart header="Zachovává se pořadí vložení"
Iterace probíhá ve stejném pořadí, v jakém byly hodnoty vloženy. `Map` toto pořadí na rozdíl od `Object` zachovává.
```

Navíc `Map` obsahuje vestavěnou metodu `forEach`, podobně jako `Array`:

```js
// spustí tuto funkci pro každou dvojici (klíč, hodnota)
mapaRecepty.forEach( (hodnota, klíč, mapa) => {
  alert(`${klíč}: ${hodnota}`); // okurky: 500 atd.
});
```

## Object.entries: mapa z objektu

Když je vytvořena mapa, můžeme do ní při inicializaci předat pole (nebo jiný iterovatelný objekt) dvojic klíč/hodnota, například:

```js run
// pole dvojic [klíč, hodnota]
let mapa = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( mapa.get('1') ); // str1
```

Máme-li planý objekt a rádi bychom z něj vytvořili mapu, můžeme použít vestavěnou metodu [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), která vrací pole dvojic klíč/hodnota objektu přesně v tomto formátu.

Můžeme tedy vytvořit mapu z objektu takto:

```js run
let obj = {
  jméno: "Jan",
  věk: 30
};

*!*
let mapa = new Map(Object.entries(obj));
*/!*

alert( mapa.get('jméno') ); // Jan
```

Zde `Object.entries` vrací pole dvojic klíč/hodnota: `[ ["jméno","Jan"], ["věk", 30] ]`. To je přesně to, co potřebuje `Map`.


## Object.fromEntries: objekt z mapy

Právě jsme viděli, jak vytvořit `Map` z planého objektu pomocí `Object.entries(obj)`.

Existuje i metoda `Object.fromEntries`, která provádí opak -- když jí předáme pole dvojic `[klíč, hodnota]`, vytvoří z něj objekt:

```js run
let ceny = Object.fromEntries([
  ['banán', 1],
  ['pomeranč', 2],
  ['maso', 4]
]);

// nyní ceny = { banán: 1, pomeranč: 2, maso: 4 }

alert(ceny.pomeranč); // 2
```

Použitím `Object.fromEntries` můžeme získat z mapy planý objekt.

Například uložíme do mapy data, ale potřebujeme je předat kódu třetí strany, který očekává planý objekt.

Postupujeme takto:

```js run
let mapa = new Map();
mapa.set('banán', 1);
mapa.set('pomeranč', 2);
mapa.set('maso', 4);

*!*
let obj = Object.fromEntries(mapa.entries()); // vytvoří planý objekt (*)
*/!*

// hotovo!
// obj = { banán: 1, pomeranč: 2, maso: 4 }

alert(obj.pomeranč); // 2
```

Volání `mapa.entries()` vrací iterovatelný objekt dvojic klíč/hodnota, přesně ve správném formátu pro `Object.fromEntries`.

Řádek `(*)` můžeme také zkrátit:
```js
let obj = Object.fromEntries(mapa); // vypustíme .entries()
```

To je totéž, protože `Object.fromEntries` očekává jako argument iterovatelný objekt, ne nutně pole. A standardní iterace mapy vrací stejné dvojice klíč/hodnota jako `mapa.entries()`. Dostaneme tedy planý objekt se stejnými dvojicemi klíč/hodnota, jaké obsahuje `mapa`.

## Množina

Množina [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) je speciální typ kolekce -- „množina hodnot“ (bez klíčů), v níž se každá hodnota může vyskytnout pouze jednou.

Její hlavní metody jsou:

- [`new Set([iterovatelnýObjekt])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set)  -- vytvoří množinu, a je-li poskytnut `iterovatelnýObjekt` (obvykle pole), zkopíruje do ní hodnoty z tohoto objektu.
- [`množina.add(hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- přidá hodnotu, vrátí samotnou množinu.
- [`množina.delete(hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- odstraní hodnotu, vrátí `true`, jestliže `hodnota` v okamžiku volání existovala, jinak `false`.
- [`množina.has(hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- vrátí `true`, jestliže hodnota v množině existuje, jinak `false`.
- [`množina.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- odstraní z množiny všechny hodnoty.
- [`množina.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- je počet hodnot.

Hlavní vlastností množiny je, že opakovaná volání `množina.add(hodnota)` se stejnou hodnotou nic neprovedou. To je důvod, proč se každá hodnota v množině objeví pouze jednou.

Například máme přicházející návštěvníky a rádi bychom si je všechny pamatovali. Avšak opakované návštěvy by neměly vést ke zdvojení. Každý návštěvník musí být „započítán“ jen jednou.

`Set` je pro tento účel to pravé:

```js run
let množina = new Set();

let jan = { jméno: "Jan" };
let petr = { jméno: "Petr" };
let marie = { jméno: "Marie" };

// návštěvy, někteří uživatelé přišli vícekrát
množina.add(jan);
množina.add(petr);
množina.add(marie);
množina.add(jan);
množina.add(marie);

// množina si pamatuje jen unikátní hodnoty
alert( množina.size ); // 3

for (let uživatel of množina) {
  alert(uživatel.jméno); // Jan (pak Petr a Marie)
}
```

Alternativou pro `Set` by mohlo být pole uživatelů a kód, který při každém vložení hledá duplikáty pomocí [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Výkon by však byl mnohem horší, protože tato metoda prochází celým polem a ověřuje každý prvek. `Set` je interně pro kontrolu unikátnosti mnohem lépe optimalizována.

## Iterace nad množinou

Množinu můžeme procházet buď pomocí `for..of`, nebo pomocí `forEach`:

```js run
let množina = new Set(["pomeranče", "jablka", "banány"]);

for (let hodnota of množina) alert(hodnota);

// totéž s forEach:
množina.forEach((hodnota, hodnotaZnovu, množina) => {
  alert(hodnota);
});
```

Všimněte si něčeho legračního. Funkce zpětného volání předávaná do `forEach` má 3 argumenty: `hodnota`, pak *stejnou hodnotu* `hodnotaZnovu` a pak cílový objekt. Opravdu, stejná hodnota se v argumentech objevuje dvakrát.

To slouží ke kompatibilitě s `Map`, v níž zpětné volání předávané do `forEach` má tři argumenty. Jistě, vypadá to trochu zvláštně. Může to však pomoci v některých případech snadno nahradit mapu množinou a naopak.

Rovněž jsou podporovány stejné metody, jaké má `Map` pro iterovatelné objekty:

- [`množina.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- vrátí iterovatelný objekt s hodnotami,
- [`množina.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- totéž jako `množina.keys()`, kvůli kompatibilitě s `Map`,
- [`množina.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- vrátí iterovatelný objekt s dvojicemi `[hodnota, hodnota]`, existuje kvůli kompatibilitě s `Map`.

## Shrnutí

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- je kolekce hodnot s klíči.

Metody a vlastnosti:

- [`new Map([iterovatelnýObjekt])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- vytvoří mapu, nepovinný objekt `iterovatelnýObjekt` (např. pole) obsahuje dvojice `[klíč,hodnota]` pro inicializaci.
- [`mapa.set(klíč, hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- uloží hodnotu pod klíčem, vrátí samotnou mapu.
- [`mapa.get(klíč)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- vrátí hodnotu podle klíče, jestliže `klíč` v mapě neexistuje, vrátí `undefined`.
- [`mapa.has(klíč)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- vrátí `true`, jestliže `klíč` existuje, jinak `false`.
- [`mapa.delete(klíč)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- odstraní prvek podle zadaného klíče, vrátí `true`, jestliže `klíč` v okamžiku volání existoval, jinak `false`.
- [`mapa.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- odstraní z mapy všechny hodnoty.
- [`mapa.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- vrátí aktuální počet prvků.

Rozdíly oproti běžnému objektu:

- Klíče mohou být libovolné včetně objektů.
- Další příhodné metody, vlastnost `size`.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- je kolekce unikátních hodnot.

Metody a vlastnosti:

- [`new Set(iterovatelnýObjekt)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- vytvoří množinu, nepovinný objekt `iterovatelnýObjekt` (např. pole) obsahuje hodnoty pro inicializaci.
- [`množina.add(hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- přidá hodnotu (pokud `hodnota` již existuje, neudělá nic), vrátí samotnou množinu.
- [`množina.delete(hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- odstraní hodnotu, vrátí `true`, jestliže `hodnota` v okamžiku volání existovala, jinak `false`.
- [`množina.has(hodnota)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- vrátí `true`, jestliže hodnota v množině existuje, jinak `false`.
- [`množina.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- odstraní z množiny všechny hodnoty.
- [`množina.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- je počet hodnot.

Iterace nad mapou a množinou probíhá vždy ve stejném pořadí, v jakém byly prvky vloženy. Nemůžeme tedy říci, že tyto kolekce nejsou seřazené, ale nemůžeme prvky seřadit jinak ani přímo získat prvek podle jeho pořadí.