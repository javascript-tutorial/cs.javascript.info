
# Gettery a settery vlastností

Existují dva druhy vlastností objektů.

První druh jsou *datové vlastnosti*. S nimi už pracovat umíme. Všechny vlastnosti, které jsme až doposud používali, byly datové vlastnosti.

Druhý druh vlastností je něco nového. Jsou to *přístupové (accessorové) vlastnosti*. Jsou to v zásadě funkce, které se spustí při načítání a nastavování hodnoty, ale v externím kódu vypadají jako běžné vlastnosti.

## Gettery a settery

Přístupové vlastnosti jsou představovány metodami nazývanými „getter“ a „setter“. V objektovém literálu jsou označeny `get` a `set`:

```js
let obj = {
  *!*get názevVlastnosti()*/!* {
    // getter, kód spuštěný při načítání obj.názevVlastnosti
  },

  *!*set názevVlastnosti(hodnota)*/!* {
    // setter, kód spuštěný při nastavování obj.názevVlastnosti = hodnota
  }
};
```

Getter se spustí, když je vlastnost `obj.názevVlastnosti` načítána, setter -- když je měněna.

Například máme objekt `uživatel` s vlastnostmi `jméno` a `příjmení`:

```js
let uživatel = {
  jméno: "Jan",
  příjmení: "Novák"
};
```

Nyní chceme přidat vlastnost `celéJméno`, která by měla být `"Jan Novák"`. Samozřejmě nechceme kopírovat a vkládat existující informaci, a tak ji můžeme implementovat jako přístupovou:

```js run
let uživatel = {
  jméno: "Jan",
  příjmení: "Novák",

*!*
  get celéJméno() {
    return `${this.jméno} ${this.příjmení}`;
  }
*/!*
};

*!*
alert(uživatel.celéJméno); // Jan Novák
*/!*
```

Zvenčí se přístupová vlastnost jeví jako obyčejná. To je myšlenka přístupových vlastností. *Nevoláme* `uživatel.celéJméno` jako funkci, ale normálně ji *přečteme*: getter se spustí za scénou.

Dosud má `celéJméno` jen getter. Jestliže se pokusíme přiřadit `uživatel.celéJméno=`, nastane chyba:

```js run
let uživatel = {
  get celéJméno() {
    return `...`;
  }
};

*!*
uživatel.celéJméno = "Test"; // Chyba (vlastnost má jen getter)
*/!*
```

Opravme ji přidáním setteru pro `uživatel.celéJméno`:

```js run
let uživatel = {
  jméno: "Jan",
  příjmení: "Novák",

  get celéJméno() {
    return `${this.jméno} ${this.příjmení}`;
  },

*!*
  set celéJméno(hodnota) {
    [this.jméno, this.příjmení] = hodnota.split(" ");
  }
*/!*
};

// nastavení vlastnosti celéJméno se spustí se zadanou hodnotou.
uživatel.celéJméno = "Alice Cooper";

alert(uživatel.jméno); // Alice
alert(uživatel.příjmení); // Cooper
```

Výsledkem je, že máme „virtuální“ vlastnost `celéJméno`. Lze ji číst i do ní zapisovat.

## Přístupové deskriptory

Deskriptory přístupových vlastností se liší od deskriptorů datových vlastností.

U přístupových vlastností není `value` nebo `writable`, ale místo nich tam jsou funkce `get` a `set`.

To znamená, že přístupový deskriptor může mít:

- **`get`** -- funkci bez argumentů, která se spustí při čtení vlastnosti,
- **`set`** -- funkci s jedním argumentem, která je volána, když se vlastnost nastavuje,
- **`enumerable`** -- totéž jako u datových vlastností,
- **`configurable`** -- totéž jako u datových vlastností.

Například chceme-li vytvořit přístupovou vlastnost `celéJméno` pomocí metody `defineProperty`, můžeme předat deskriptor s `get` a `set`:

```js run
let uživatel = {
  jméno: "Jan",
  příjmení: "Novák"
};

*!*
Object.defineProperty(uživatel, 'celéJméno', {
  get() {
    return `${this.jméno} ${this.příjmení}`;
  },

  set(hodnota) {
    [this.jméno, this.příjmení] = hodnota.split(" ");
  }
*/!*
});

alert(uživatel.celéJméno); // Jan Novák

for(let klíč in uživatel) alert(klíč); // jméno, příjmení
```

Prosíme všimněte si, že vlastnost může být buď přístupová (má metody `get/set`), nebo datová (má `value`), ale ne obojí.

Pokusíme-li se poskytnout ve stejném deskriptoru `get` i `value`, nastane chyba:

```js run
*!*
// Chyba: Neplatný deskriptor vlastnosti.
*/!*
Object.defineProperty({}, 'vlastnost', {
  get() {
    return 1
  },

  value: 2
});
```

## Chytřejší gettery/settery

Gettery/settery můžeme používat jako wrappery nad „skutečnými“ hodnotami vlastností, abychom získali více kontroly nad operacemi s nimi.

Například jestliže chceme zakázat příliš krátká jména v objektu `uživatel`, můžeme mít setter `jméno` a udržovat hodnotu v oddělené vlastnosti `_jméno`:

```js run
let uživatel = {
  get jméno() {
    return this._jméno;
  },

  set jméno(hodnota) {
    if (hodnota.length < 4) {
      alert("Jméno je příliš krátké, musí mít alespoň 4 znaky");
      return;
    }
    this._jméno = hodnota;
  }
};

uživatel.jméno = "Petr";
alert(uživatel.jméno); // Petr

uživatel.jméno = ""; // Jméno je příliš krátké...
```

Jméno je tedy uloženo ve vlastnosti `_jméno` a přístup k němu se děje přes getter a setter.

Technicky může externí kód přistupovat přímo ke jménu pomocí `uživatel._jméno`. Je však široce známá konvence, že vlastnosti začínající podtržítkem `"_"` jsou interní a nemělo by se na ně sahat zvnějšku objektu.

## Používání pro kompatibilitu

Jedno z vynikajících využití přístupových vlastností je, že umožňují kdykoli převzít kontrolu nad „obyčejnou“ datovou vlastností tím, že ji nahradíme getterem a setterem a vylepšíme její chování.

Představme si, že jsme začali implementovat objekty uživatelů s použitím datových vlastností `jméno` a `věk`:

```js
function Uživatel(jméno, věk) {
  this.jméno = jméno;
  this.věk = věk;
}

let jan = new Uživatel("Jan", 25);

alert( jan.věk ); // 25
```

...Dříve nebo později se to však může změnit. Místo vlastnosti `věk` se můžeme rozhodnout ukládat `datumNarození`, protože je to přesnější a vhodnější:

```js
function Uživatel(jméno, datumNarození) {
  this.jméno = jméno;
  this.datumNarození = datumNarození;
}

let jan = new Uživatel("Jan", new Date(1992, 6, 1));
```

Co teď uděláme se starým kódem, který stále používá vlastnost `věk`?

Můžeme se pokusit všechna taková místa najít a opravit, ale to nám zabere čas a může to být těžko proveditelné, jestliže tento kód používá mnoho dalších lidí. A kromě toho je hezké mít `věk` v objektu `uživatel`, ne?

Necháme si ho.

Problém vyřeší přidání getteru pro `věk`:

```js run no-beautify
function Uživatel(jméno, datumNarození) {
  this.jméno = jméno;
  this.datumNarození = datumNarození;

*!*
  // věk se vypočítá z dnešního data a z data narození
  Object.defineProperty(this, "věk", {
    get() {
      let dnešníRok = new Date().getFullYear();
      return dnešníRok - this.datumNarození.getFullYear();
    }
  });
*/!*
}

let jan = new Uživatel("Jan", new Date(1992, 6, 1));

alert( jan.datumNarození ); // datumNarození je k dispozici
alert( jan.věk );      // ...stejně jako věk
```

Nyní bude fungovat i starý kód a navíc jsme získali další pěknou vlastnost.
