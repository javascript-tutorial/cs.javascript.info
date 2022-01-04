
# Prototypové metody, objekty bez __proto__

V první kapitole této sekce jsme se zmínili, že existují moderní metody, jak nastavit prototyp.

Vlastnost `__proto__` je považována za zastaralou a trochu odmítanou (ve výhradně prohlížečové části standardu JavaScriptu).

Moderní metody jsou:

- [Object.create(proto, [deskriptory])](mdn:js/Object/create) -- vytvoří prázdný objekt, jehož `[[Prototype]]` bude `proto`, s nepovinnými deskriptory vlastností.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- vrátí `[[Prototype]]` objektu `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- nastaví `[[Prototype]]` objektu `obj` na `proto`.

Tyto metody by se měly používat místo `__proto__`.

Například:

```js run
let zvíře = {
  žere: true
};

// vytvoří nový objekt, jehož prototypem je zvíře
*!*
let králík = Object.create(zvíře);
*/!*

alert(králík.žere); // true

*!*
alert(Object.getPrototypeOf(králík) === zvíře); // true
*/!*

*!*
Object.setPrototypeOf(králík, {}); // změní prototyp objektu králík na {}
*/!*
```

`Object.create` má nepovinný druhý argument: deskriptory vlastností. Těmi můžeme poskytnout objektu další vlastnosti, například:

```js run
let zvíře = {
  žere: true
};

let králík = Object.create(zvíře, {
  skáče: {
    value: true
  }
});

alert(králík.skáče); // true
```

Deskriptory jsou ve stejném formátu, jaký byl popsán v kapitole <info:property-descriptors>.

Pomocí `Object.create` můžeme provádět klonování objektů, které je silnější než kopírování vlastností v cyklu `for..in`:

```js
let klon = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Toto volání vytvoří opravdu přesnou kopii `obj`, včetně všech vlastností: enumerovatelných i neenumerovatelných, datových vlastností i setterů/getterů -- všechno a ještě navíc se správným `[[Prototype]]`.

## Krátká historie

Spočítáme-li všechny způsoby, jak spravovat `[[Prototype]]`, zjistíme, že jich je spousta! Mnoho způsobů, jak udělat jednu věc!

Proč?

Je tomu tak z historických důvodů.

- Vlastnost konstruktoru `„prototype“` fungovala již od pradávných časů.
- Později, v roce 2012, se ve standardu objevila metoda `Object.create`, která poskytla možnost vytvářet objekty se zadaným prototypem, ale neposkytla možnost jej získávat nebo nastavovat. Prohlížeče tedy implementovaly nestandardní přístupovou vlastnost `__proto__`, která umožňovala uživateli kdykoli získávat a nastavovat prototyp.
- Později, v roce 2015, byly do standardu přidány `Object.setPrototypeOf` a `Object.getPrototypeOf`, které poskytují stejnou funkcionalitu jako `__proto__`. Jelikož `__proto__` bylo implementováno de facto všude, bylo tak trochu zavrženo a dostalo se do Přílohy B standardu, což je: volitelné pro neprohlížečová prostředí.

Nyní máme tedy k dispozici všechny tyto způsoby.

Proč bylo `__proto__` nahrazeno funkcemi `getPrototypeOf/setPrototypeOf`? To je zajímavá otázka, která od nás vyžaduje, abychom pochopili, proč je `__proto__` špatné. Čtěte dál, abyste získali odpověď.

```warn header="Pokud vám záleží na rychlosti, neměňte `[[Prototype]]` na existujících objektech"
Technicky můžeme `[[Prototype]]` nastavit nebo změnit kdykoli. Obvykle jej však nastavujeme jen jednou v okamžiku vytvoření objektu a pak už jej neměníme: `králík` dědí ze `zvíře` a to se nebude měnit.

A JavaScriptové enginy jsou na to vysoce optimalizované. Změna prototypu „za běhu“ pomocí `Object.setPrototypeOf` nebo `obj.__proto__=` je velmi pomalá operace, jelikož rozbíjí interní optimalizace operací přístupu k objektovým vlastnostem. Proto se jí zdržte, ledaže dobře víte, co děláte, nebo pokud vám na rychlosti JavaScriptu vůbec nezáleží.
```

## „Velmi plané“ objekty [#very-plain]

Jak víme, objekty můžeme používat jako asociativní pole k ukládání dvojic klíč/hodnota.

...Pokud se do něj však pokusíme uložit *uživatelem poskytnuté* klíče (například slovník s uživatelskými vstupy), uvidíme zajímavou závadu: všechny klíče fungují správně až na `"__proto__"`.

Ověřte si to na příkladu:

```js run
let obj = {};

let klíč = prompt("Jaký je klíč?", "__proto__");
obj[klíč] = "nějaká hodnota";

alert(obj[klíč]); // [object Object], ne "nějaká hodnota"!
```

Když zde uživatel napíše `__proto__`, přiřazení je ignorováno!

To by nás nemělo překvapovat. Vlastnost `__proto__` je speciální: musí to být buď objekt, nebo `null`. Řetězec nemůže být prototypem.

Takové chování jsme však *nezamýšleli* implementovat, že? Chceme ukládat dvojice klíč/hodnota a klíč jménem `"__proto__"` nebyl správně uložen. Takže je to chyba!

Zde důsledky nejsou hrozivé. V jiných případech však můžeme přiřazovat objektové hodnoty a pak se prototyp může změnit. Výsledkem bude, že se provádění pokazí naprosto nečekanými způsoby.

Co je horší -- vývojáři o takové možnosti většinou vůbec nepřemýšlejí. To činí takové chyby obtížně zaznamenatelnými a dokonce je mění na zranitelnost, zvláště když je JavaScript použit na straně serveru.

Nečekané věci se mohou dít i tehdy, když přiřazujeme do `toString`, což je defaultně funkce, a do jiných vestavěných metod.

Jak se můžeme tomuto problému vyhnout?

Za prvé, můžeme namísto do planých objektů jednoduše ukládat do `Map`, pak bude všechno v pořádku.

Ale i `Object` nám zde může dobře posloužit, protože autoři jazyka na tento problém mysleli už před dlouhou dobou.

`__proto__` není vlastnost objektu, ale přístupová vlastnost `Object.prototype`:

![](object-prototype-2.svg)

Jestliže je tedy `obj.__proto__` čtena nebo nastavována, z jeho prototypu se volá odpovídající getter/setter a ten nastaví `[[Prototype]]`.

Jak bylo řečeno na začátku této sekce tutoriálu: `__proto__` je způsob přístupu k `[[Prototype]]`, není to samotný `[[Prototype]]`.

Jestliže tedy zamýšlíme používat objekt jako asociativní pole a takovým problémům se vyhnout, můžeme to udělat malým trikem:

```js run
*!*
let obj = Object.create(null);
*/!*

let klíč = prompt("Jaký je klíč?", "__proto__");
obj[klíč] = "nějaká hodnota";

alert(obj[klíč]); // "nějaká hodnota"
```

`Object.create(null)` vytvoří prázdný objekt bez prototypu (`[[Prototype]]` je `null`):

![](object-prototype-null.svg)

Pro `__proto__` tedy nebude zděděn žádný getter/setter. Nyní se bude zpracovávat jako běžná datová vlastnost, takže uvedený příklad bude fungovat správně.

Takové objekty můžeme nazývat „velmi plané“ nebo „čistě slovníkové“ objekty, protože jsou ještě jednodušší než obvyklý planý objekt `{...}`.

Nevýhodou je, že takový objekt postrádá veškeré vestavěné objektové metody, např. `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Chyba (není toString)
```

...To je však u asociativních polí zpravidla dobře.

Všimněte si, že většina metod vztahujících se k objektům jsou `Object.něco(...)`, např. `Object.keys(obj)` -- nejsou v prototypu, takže budou na takových objektech fungovat:


```js run
let čínskýSlovník = Object.create(null);
čínskýSlovník.ahoj = "你好";
čínskýSlovník.sbohem = "再见";

alert(Object.keys(čínskýSlovník)); // ahoj,sbohem
```

## Shrnutí

Moderní metody pro nastavení prototypu a přímý přístup k němu jsou:

- [Object.create(proto, [deskriptory])](mdn:js/Object/create) -- vytvoří prázdný objekt se zadaným `proto` jako `[[Prototype]]` (může být `null`) a nepovinnými deskriptory vlastností.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- vrátí `[[Prototype]]` objektu `obj` (totéž jako getter `__proto__`).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- nastaví `[[Prototype]]` objektu `obj` na hodnotu `proto` (totéž jako setter `__proto__`).

Vestavěný getter/setter `__proto__` není bezpečný, jestliže chceme do objektu vkládat uživatelem vygenerované klíče. Je to proto, že uživatel může zadat `"__proto__"` jako klíč a pak nastane chyba, snad s lehkými, ale obecně s nepředvídatelnými důsledky.

Můžeme tedy buď použít `Object.create(null)` k vytvoření „velmi planého“ objektu bez `__proto__`, nebo se pro tento účel upnout k objektům `Map`.

`Object.create` také poskytuje snadný způsob, jak vytvořit mělkou kopii objektu se všemi deskriptory:

```js
let klon = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Ujasnili jsme si také, že `__proto__` je getter/setter pro `[[Prototype]]` a přebývá v `Object.prototype`, stejně jako jiné metody.

Můžeme vytvořit objekt bez prototypu pomocí `Object.create(null)`. Takové objekty se používají jako „čistě slovníkové“ a nemají žádné problémy, je-li `"__proto__"` použito jako klíč.

Další metody:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- vrátí pole vlastních enumerovatelných řetězcových názvů/hodnot/dvojic klíč-hodnota vlastností.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- vrátí pole všech našich symbolických klíčů.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- vrátí pole všech našich řetězcových klíčů.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- vrátí pole všech našich klíčů.
- [obj.hasOwnProperty(klíč)](mdn:js/Object/hasOwnProperty) -- vrátí `true`, jestliže `obj` má svůj vlastní (nezděděný) klíč jménem `klíč`.

Všechny metody, které vracejí vlastnosti objektu (např. `Object.keys` a jiné), vracejí „vlastní“ vlastnosti. Chceme-li zděděné, můžeme použít cyklus `for..in`.
