
# Prototypové metody, objekty bez __proto__

V první kapitole této sekce jsme se zmínili, že existují moderní metody, jak nastavit prototyp.

Nastavování nebo čtení prototypu pomocí `obj.__proto__` je považováno za zastaralé a je mírně zavrhováno (je přesunuto do části standardu JavaScriptu nazvané „Příloha B“, která je určena výhradně pro prohlížeče).

Moderní metody pro načtení a nastavení prototypu jsou:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- vrátí `[[Prototype]]` objektu `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- nastaví `[[Prototype]]` objektu `obj` na `proto`.

Jediné využití `__proto__`, nad kterým se lze nezamračit, je použít ho jako vlastnost při vytvoření nového objektu: `{ __proto__: ... }`.

Ačkoli i k tomu existuje speciální metoda:

- [Object.create(proto[, deskriptory])](mdn:js/Object/create) -- vytvoří prázdný objekt, jehož `[[Prototype]]` bude `proto`, s možností uvést jeho deskriptory vlastností.

Například:

```js run
let zvíře = {
  žere: true
};

// vytvoří nový objekt, jehož prototypem je zvíře
*!*
let králík = Object.create(zvíře); // totéž jako {__proto__: zvíře}
*/!*

alert(králík.žere); // true

*!*
alert(Object.getPrototypeOf(králík) === zvíře); // true
*/!*

*!*
Object.setPrototypeOf(králík, {}); // změní prototyp objektu králík na {}
*/!*
```

Metoda `Object.create` je trochu silnější, jelikož má nepovinný druhý argument: deskriptory vlastností. 

V nich můžeme novému objektu poskytnout další vlastnosti, například:

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
let klon = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

Toto volání vytvoří opravdu přesnou kopii `obj`, včetně všech vlastností: enumerovatelných i neenumerovatelných, datových vlastností i setterů a getterů -- se vším a navíc se správným `[[Prototype]]`.

## Krátká historie

Způsobů, jak pracovat s `[[Prototype]]`, existuje velké množství. Jak k tomu došlo a proč?

Je tomu tak z historických důvodů.

Prototypová dědičnost byla v jazyce obsažena již od jeho začátků, ale způsoby, jak s ní manipulovat, se s časem vyvíjely.

- Vlastnost konstruktoru `"prototype"` fungovala již od pradávných časů. Je to nejstarší způsob, jak vytvářet objekty se zadaným prototypem.
- Později, v roce 2012, se ve standardu objevila metoda `Object.create`, která poskytla možnost vytvářet objekty se zadaným prototypem, ale neposkytla možnost jej načítat nebo nastavovat. Některé prohlížeče tedy implementovaly nestandardní přístupovou vlastnost `__proto__`, která umožňovala uživateli kdykoli načítat nebo nastavovat prototyp, aby poskytly vývojářům větší flexibilitu.
- Později, v roce 2015, byly do standardu přidány metody `Object.setPrototypeOf` a `Object.getPrototypeOf`, které poskytují stejnou funkcionalitu jako `__proto__`. Jelikož `__proto__` bylo implementováno de facto všude, bylo tak trochu zavrženo a dostalo se do Přílohy B standardu, což znamená, že pro jiná než prohlížečová prostředí není povinné.
- Později, v roce 2022, bylo oficiálně umožněno používat `__proto__` v objektových literálech `{...}` (přesunuto z Přílohy B), ale ne jako getter/setter `obj.__proto__` (stále v Příloze B).

Proč bylo `__proto__` nahrazeno funkcemi `getPrototypeOf/setPrototypeOf`?

Proč bylo `__proto__` částečně rehabilitováno a jeho použití dovoleno v `{...}`, ale ne jako getter/setter?

To je zajímavá otázka, která od nás vyžaduje, abychom pochopili, proč je `__proto__` špatné.

Brzy se dozvíme odpověď.

```warn header="Pokud vám záleží na rychlosti, neměňte `[[Prototype]]` na existujících objektech"
Technicky můžeme `[[Prototype]]` nastavit nebo načíst kdykoli. Obvykle jej však nastavujeme jen jednou v okamžiku vytvoření objektu a pak už jej neměníme: `králík` dědí ze `zvíře` a to se nebude měnit.

JavaScriptové motory jsou na to vysoce optimalizované. Změna prototypu „za běhu“ pomocí `Object.setPrototypeOf` nebo `obj.__proto__=` je velmi pomalá operace, jelikož rozbíjí vnitřní optimalizace operací přístupu k objektovým vlastnostem. Proto se jí zdržte, s výjimkou situací, kdy dobře víte, co děláte, nebo kdy vám na rychlosti JavaScriptu vůbec nezáleží.
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

Když zde uživatel zadá `__proto__`, přiřazení na řádku 4 je ignorováno!

To může být pro nevývojáře jistě překvapením, ale my bychom tomu měli rozumět. Vlastnost `__proto__` je speciální: musí to být buď objekt, nebo `null`. Řetězec nemůže být prototypem. To je důvod, proč je přiřazení řetězce do `__proto__` ignorováno.

Takové chování jsme však *nezamýšleli* implementovat, že? Chceme ukládat dvojice klíč/hodnota a klíč jménem `"__proto__"` nebyl správně uložen. Takže je to chyba!

Zde důsledky nejsou hrozivé. V jiných případech však můžeme do `obj` přiřazovat objekty místo řetězců a pak se prototyp zcela jistě změní. Výsledkem bude, že se běh skriptu pokazí naprosto nečekanými způsoby.

Co je horší -- vývojáři o takové možnosti většinou vůbec nepřemýšlejí. To činí takové chyby obtížně zaznamenatelnými a dokonce způsobuje zranitelnost, zvláště když je JavaScript použit na straně serveru.

Nečekané věci se mohou dít i tehdy, když přiřazujeme do `obj.toString`, protože je to vestavěná objektová metoda.

Jak se můžeme tomuto problému vyhnout?

Za prvé, místo planých objektů můžeme k ukládání použít `Map`, pak bude všechno v pořádku:

```js run
let mapa = new Map();

let klíč = prompt("Jaký je klíč?", "__proto__");
mapa.set(klíč, "nějaká hodnota");

alert(mapa.get(klíč)); // "nějaká hodnota" (jak jsme zamýšleli)
```

...Avšak syntaxe `Object` je často lákavější, protože je stručnější.

Naštěstí *můžeme* použít objekty, protože autoři jazyka na tento problém mysleli už před dlouhou dobou.

Jak víme, `__proto__` není vlastnost objektu, ale přístupová vlastnost `Object.prototype`:

![](object-prototype-2.svg)

Jestliže je tedy `obj.__proto__` čtena nebo nastavována, z prototypu objektu se volá odpovídající getter či setter a ten `[[Prototype]]` načte nebo nastaví.

Jak bylo řečeno na začátku této sekce tutoriálu: `__proto__` je způsob přístupu k `[[Prototype]]`, není to samotný `[[Prototype]]`.

Jestliže tedy zamýšlíme používat objekt jako asociativní pole a takovým problémům se vyhnout, můžeme to udělat malým trikem:

```js run
*!*
let obj = Object.create(null);
// or: obj = { __proto__: null }
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

- K vytvoření objektu se zadaným prototypem použijeme:

    - literální syntaxi: `{ __proto__: ... }`, která umožňuje specifikovat více vlastností,
    - nebo  [Object.create(proto[, deskriptory])](mdn:js/Object/create), která umožňuje specifikovat deskriptory vlastností.
    
    Metoda `Object.create` poskytuje snadný způsob, jak vytvořit mělkou kopii objektu se všemi deskriptory:

    ```js
    let klon = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```

- Moderní metody pro načtení a nastavení prototypu jsou:

    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- vrátí `[[Prototype]]` objektu `obj` (totéž jako getter `__proto__`).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- nastaví `[[Prototype]]` objektu `obj` na hodnotu `proto` (totéž jako setter `__proto__`).
    
- Načtení a nastavení prototypu pomocí vestavěného getteru/setteru `__proto__` se nedoporučuje a nyní je ve specifikaci obsaženo v Příloze B.

- Uvedli jsme i objekty bez prototypů, vytvořené pomocí `Object.create(null)` nebo `{__proto__: null}`.
    
    Tyto objekty se používají jako slovníky, aby do nich bylo možné uložit jakékoli klíče (třeba i vygenerované uživatelem).
    
    Normálně objekty dědí z `Object.prototype` vestavěné metody a getter/setter `__proto__`, což znamená, že odpovídající klíče jsou „obsazeny“, a může to způsobit vedlejší efekty. Je-li prototyp `null`, objekty jsou skutečně prázdné.
