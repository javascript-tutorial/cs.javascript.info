
# Konverze objektů na primitivní typy

Co se stane, když se objekty sečtou `obj1 + obj2`, odečtou `obj1 - obj2` nebo zobrazí pomocí `alert(obj)`?

JavaScript neumožňuje přesně nastavit způsob, jakým operátory pracují nad objekty. Na rozdíl od některých jiných programovacích jazyků, např. Ruby nebo C++, nemůžeme implementovat speciální objektovou metodu, která bude zpracovávat sčítání (nebo jiné operátory).

Při takovýchto operacích se objekty automaticky konvertují na primitivy a pak se nad těmito primitivy vykoná operace, jejímž výsledkem je primitivní hodnota.

To je důležité omezení, jelikož výsledkem `obj1 + obj2` nemůže být jiný objekt!

Například nemůžeme vytvořit objekty představující vektory nebo matice (nebo úspěchy či cokoli jiného), sečíst je a jako výsledek očekávat „sečtený“ objekt. Takové architektonické výkony jsou automaticky „mimo mísu“.

Protože zde tedy nemůžeme mnoho udělat, v reálných projektech nebývá žádné počítání s objekty. Když se objeví, je to obvykle důsledkem chyby v kódu.

V této kapitole probereme, jak převést objekt na primitiv a jak si to přizpůsobit.

Má to dva účely:

1. Umožní nám to porozumět, co se děje v případě chyby v kódu, když k takové operaci neúmyslně dojde.
2. Existují výjimky, kdy jsou takové operace možné a vypadají dobře. Například odečítání nebo porovnávání dat (objekty `Date`). Narazíme na ně později.

## Pravidla konverze

V kapitole <info:type-conversions> jsme viděli pravidla číselných, řetězcových a booleanových konverzí primitivů. Objekty jsme však vynechali. Nyní, když známe metody a symboly, můžeme tuto mezeru zaplnit.

1. V booleovském kontextu jsou všechny objekty `true`. Existují jen konverze na číslo a na řetězec.
2. Konverze na číslo se odehrává, když objekty odečítáme nebo s nimi provádíme matematické funkce. Například objekty `Date` (vysvětlíme je v kapitole <info:date>) můžeme od sebe odečíst a výsledkem `datum1 - datum2` je časový rozdíl mezi těmito dvěma daty.
3. Co se týče konverze na řetězec -- ta se zpravidla odehrává, když pošleme objekt na výstup, např. `alert(obj)`, a v podobných kontextech.

Konverze na řetězec a na číslo můžeme vyladit použitím speciálních objektových metod.

Existují tři varianty typové konverze, k nimž dochází v různých situacích.

Nazývají se „hinty“ *(česky „rady“ nebo „náznaky“ -- pozn. překl.)* a jsou popsány ve [specifikaci](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Pro konverzi objektu na řetězec, když nad objektem provádíme operaci, která očekává řetězec, např. `alert`:

    ```js
    // výstup
    alert(obj);

    // použití objektu jako klíče vlastnosti
    dalšíObj[obj] = 123;
    ```

`"number"`
: Pro konverzi objektu na číslo, např. když provádíme matematické výpočty:

    ```js
    // explicitní konverze
    let číslo = Number(obj);

    // matematika (kromě binárního plus)
    let n = +obj; // unární plus
    let delta = datum1 - datum2;

    // porovnání menší/větší než
    let větší = uživatel1 > uživatel2;
    ```

`"default"`
: Nastává ve vzácných případech, když si operátor „není jist“, jaký typ má očekávat.

    Například binární plus `+` může pracovat jak s řetězci (spojuje je), tak s čísly (sčítá je), takže zde by fungovaly řetězce i čísla. Jestliže tedy binární plus obdrží objekt jako argument, použije k jeho konverzi hint `"default"`.

    Rovněž je-li objekt porovnáván s řetězcem, číslem nebo symbolem pomocí `==`, není jisté, která konverze by se měla provést, takže je použit hint `"default"`.

    ```js
    // binární plus používá hint "default"
    let celkem = obj1 + obj2;

    // obj == číslo používá hint "default"
    if (uživatel == 1) { ... };
    ```

    Také operátory porovnání větší než a menší než, např. `<` `>`, mohou pracovat s řetězci i s čísly. Ty však používají hint `"number"`, ne `"default"`. Je tomu tak z historických důvodů.

    V praxi si však tyto svérázné detaily pamatovat nemusíme, neboť všechny vestavěné objekty až na jedinou výjimku (objekt `Date`, dozvíme se o něm později) implementují konverzi `"default"` stejným způsobem jako `"number"`. A my můžeme dělat totéž.

```smart header="Neexistuje hint `\"boolean\"`"
Všimněte si, že hinty jsou pouze tři. Tak jednoduché to je.

Neexistuje hint „boolean“ (v booleovském kontextu jsou všechny objekty `true`) ani žádný jiný. A pokud zacházíme s `"default"` stejně jako s `"number"`, což provádí většina vestavěných objektů, pak existují pouhé dvě konverze.
```

**Když JavaScript provádí konverzi, snaží se najít a zavolat tři objektové metody:**

1. Zavolá `obj[Symbol.toPrimitive](hint)` -- metodu se symbolickým klíčem `Symbol.toPrimitive` (systémový symbol), jestliže taková metoda existuje.
2. V opačném případě, je-li hint `"string"`:
    - pokusí se zavolat `obj.toString()` nebo `obj.valueOf()`, první z nich, která existuje.
3. V opačném případě, je-li hint `"number"` nebo `"default"`:
    - pokusí se zavolat `obj.valueOf()` nebo `obj.toString()`, první z nich, která existuje.

## Symbol.toPrimitive

Začněme první metodou. V JavaScriptu je vestavěný symbol jménem `Symbol.toPrimitive`, který by měl být použit k pojmenování konverzní metody, např. takto:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // sem přijde kód, který převede tento objekt na primitiv
  // musí vrátit primitivní hodnotu
  // hint = jeden ze "string", "number", "default"
};
```

Jestliže metoda `Symbol.toPrimitive` existuje, bude použita pro všechny hinty a žádné další metody nejsou zapotřebí.

Například zde ji implementuje objekt `uživatel`:

```js run
let uživatel = {
  jméno: "Jan",
  peníze: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{jméno: "${this.jméno}"}` : this.peníze;
  }
};

// demo konverzí:
alert(uživatel); // hint: string -> {jméno: "Jan"}
alert(+uživatel); // hint: number -> 1000
alert(uživatel + 500); // hint: default -> 1500
```

Jak vidíme z kódu, `uživatel` se stane sebepopisujícím řetězcem nebo peněžní částkou v závislosti na druhu konverze. Všechny případy konverze obstarává jediná metoda `uživatel[Symbol.toPrimitive]`.


## toString/valueOf

Neexistuje-li `Symbol.toPrimitive`, pak se JavaScript pokusí najít metody `toString` a `valueOf`:

- Pro hint "string": `toString`, a jestliže neexistuje, pak `valueOf` (při konverzi na řetězec má tedy přednost `toString`).
- Pro jiné hinty: `valueOf`, a jestliže neexistuje, pak `toString` (při výpočtech má tedy přednost `valueOf`).

Metody `toString` a `valueOf` pocházejí z dávných časů. Nejsou to symboly (symboly tak dávno ještě neexistovaly), ale „obvyklé“ metody pojmenované řetězcem. Poskytují alternativní způsob „ve starém stylu“, jak implementovat konverzi.

Tyto metody musejí vracet primitivní hodnotu. Jestliže `toString` nebo `valueOf` vrátí objekt, jsou ignorovány (tak, jako by taková metoda neexistovala).

Standardně planý objekt obsahuje následující metody `toString` a `valueOf`:

- Metoda `toString` vrací řetězec `"[object Object]"`.
- Metoda `valueOf` vrací objekt samotný.

Zde je příklad:

```js run
let uživatel = {jméno: "Jan"};

alert(uživatel); // [object Object]
alert(uživatel.valueOf() === uživatel); // true
```

Jestliže se tedy pokusíme použít objekt jako řetězec, např. ve volání `alert` nebo podobně, pak standardně uvidíme `[object Object]`.

Standardní `valueOf` je zde zmíněna jen pro úplnost, abychom se vyhnuli zmatkům. Jak vidíte, vrací objekt samotný, a proto je ignorována. Neptejte se mě proč, je tomu tak z historických důvodů. Můžeme tedy předpokládat, že ani neexistuje.

Implementujme tyto metody, abychom si konverzi přizpůsobili.

Například zde `uživatel` dělá totéž jako výše pomocí kombinace `toString` a `valueOf` namísto `Symbol.toPrimitive`:

```js run
let uživatel = {
  jméno: "Jan",
  peníze: 1000,

  // pro hint="string"
  toString() {
    return `{jméno: "${this.jméno}"}`;
  },

  // pro hint="number" nebo "default"
  valueOf() {
    return this.peníze;
  }

};

alert(uživatel); // toString -> {jméno: "Jan"}
alert(+uživatel); // valueOf -> 1000
alert(uživatel + 500); // valueOf -> 1500
```

Jak vidíme, chování je stejné jako v předchozím příkladu se `Symbol.toPrimitive`.

Často chceme jediné místo „pro všechno“, aby obsloužilo všechny konverze na primitivy. V tom případě můžeme implementovat jen `toString`, např. takto:

```js run
let uživatel = {
  jméno: "Jan",

  toString() {
    return this.jméno;
  }
};

alert(uživatel); // toString -> Jan
alert(uživatel + 500); // toString -> Jan500
```

Není-li přítomna `Symbol.toPrimitive` a `valueOf`, obstará všechny konverze na primitivy metoda `toString`.

### Konverze může vrátit jakýkoli primitivní typ

O všech metodách konverze na primitivy je důležité vědět, že nemusejí nutně vracet „naznačený“ primitiv.

Nekontroluje se, zda metoda `toString` opravdu vrátila řetězec nebo zda metoda `Symbol.toPrimitive` pro hint `"number"` vrátila opravdu číslo.

Jediné, co je povinné: tyto metody musejí vracet primitiv, ne objekt.

```smart header="Historické poznámky"
Z historických důvodů platí, že jestliže `toString` nebo `valueOf` vrátí objekt, nenastane chyba, ale taková hodnota se ignoruje (jako by tato metoda neexistovala). Je to proto, že v dávných dobách nebyl v JavaScriptu žádný dobrý „chybový“ koncept.

Naproti tomu `Symbol.toPrimitive` *musí* vrátit primitiv, jinak bude ohlášena chyba.
```

## Další konverze

Jak již víme, mnoho operátorů a funkcí provádí typovou konverzi, např. násobení `*` převádí operandy na čísla.

Jestliže předáme objekt jako argument, provedou se dva kroky:
1. Objekt se konvertuje na primitiv (podle výše uvedených pravidel).
2. Není-li výsledný primitiv správného typu, konvertuje se.

Například:

```js run
let obj = {
  // při nepřítomnosti ostatních metod provádí toString všechny konverze
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objekt se konvertoval na primitiv "2", pak z něj násobení učinilo číslo
```

1. Násobení `obj * 2` nejprve převede objekt na primitiv (tedy na řetězec `"2"`).
2. Pak se ze `"2" * 2` stane `2 * 2` (řetězec se konvertuje na číslo).

Binární plus ve stejné situaci spojí řetězce, jelikož s radostí přijme řetězec:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), konverze na primitiv vrátila řetězec => zřetězení
```

## Shrnutí

Konverze objektu na primitiv je volána automaticky mnoha vestavěnými funkcemi a operátory, které očekávají primitiv jako hodnotu.

Dělí se na 3 druhy (hinty):
- `"string"` (pro `alert` a jiné operace, které vyžadují řetězec)
- `"number"` (pro matematické výpočty)
- `"default"` (jen málo operátorů)

Specifikace výslovně popisuje, který operátor používá který hint. Existuje jen velmi málo operátorů, které „nevědí, co očekávat“, a tak používají hint `"default"`. Vestavěné objekty obvykle hint `"default"` zpracovávají stejně jako `"number"`, a tak se v praxi poslední dva uvedené hinty často spojují dohromady.

Algoritmus konverze je:

1. Zavolá `obj[Symbol.toPrimitive](hint)`, jestliže tato metoda existuje.
2. V opačném případě, je-li hint `"string"`:
    - pokusí se zavolat `obj.toString()` nebo `obj.valueOf()`, první z nich, která existuje.
3. V opačném případě, je-li hint `"number"` nebo `"default"`:
    - pokusí se zavolat `obj.valueOf()` nebo `obj.toString()`, první z nich, která existuje.

V praxi často postačí implementovat jen `obj.toString()` jako „zachytávací“ metodu pro všechny konverze, která by měla vracet „člověkem čitelnou“ reprezentaci objektu, pro účely logování nebo ladění.

Stejně jako u matematických operátorů JavaScript neposkytuje způsob, jak je „přetížit“ pomocí metod, takže projekty z reálného života je používají na objekty jen zřídka.
