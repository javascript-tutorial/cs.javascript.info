libs:
  - lodash

---

# Currying

[Currying neboli curryování](https://en.wikipedia.org/wiki/Currying) je pokročilá technika práce s funkcemi. Používá se nejen v JavaScriptu, ale i v jiných jazycích.

Currying je transformace funkce, která přeloží funkci volatelnou způsobem `f(a, b, c)` na volatelnou způsobem `f(a)(b)(c)`.

Currying nevolá funkci, jen ji transformuje.

Nejprve se podívejme na příklad, abychom lépe porozuměli tomu, o čem se tady mluví, a pak na praktické aplikace.

Vytvořme pomocnou funkci `curry(f)`, která provádí currying dvouargumentové funkce `f`. Jinými slovy, `curry(f)` na dvouargumentové funkci `f(a, b)` ji přeloží na funkci, která se bude spouštět jako `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) provede curryingovou transformaci
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// použití
function součet(a, b) {
  return a + b;
}

let curryovanýSoučet = curry(součet);

alert( curryovanýSoučet(1)(2) ); // 3
```

Jak vidíte, implementace je přímočará: jsou to pouhé dva wrappery.

- Výsledkem `curry(func)` je wrapper `function(a)`.
- Když je zavolán způsobem `curryovanýSoučet(1)`, argument se uloží do lexikálního prostředí a vrátí se nový wrapper `function(b)`.
- Pak je tento wrapper volán s argumentem `2` a předá volání původní funkci `součet`.

Pokročilejší implementace curryingu, např. [_.curry](https://lodash.com/docs#curry) z knihovny lodash, vrátí wrapper, který umožní, aby funkce mohla být volána jak normálně, tak parciálně:

```js run
function součet(a, b) {
  return a + b;
}

let curryovanýSoučet = _.curry(součet); // použijeme _.curry z knihovny lodash

alert( curryovanýSoučet(1, 2) ); // 3, stále volatelná normálně
alert( curryovanýSoučet(1)(2) ); // 3, voláno parciálně
```

## Currying? K čemu to je?

Abychom pochopili výhody, potřebujeme cenný příklad z reálného života.

Mějme například logovací funkci `log(datum, důležitost, zpráva)`, která naformátuje a vypíše informaci. Ve skutečných projektech mají takové funkce mnoho užitečných možností, např. posílání logů po síti, zde jenom zavoláme `alert`:

```js
function log(datum, důležitost, zpráva) {
  alert(`[${datum.getHours()}:${datum.getMinutes()}] [${důležitost}] ${zpráva}`);
}
```

Zcurryujme ji!

```js
log = _.curry(log);
```

Pak bude `log` fungovat normálně:

```js
log(new Date(), "DEBUG", "nějaký debug"); // log(a, b, c)
```

...Ale bude fungovat i v curryované formě:

```js
log(new Date())("DEBUG")("nějaký debug"); // log(a)(b)(c)
```

Nyní můžeme snadno vytvořit pohodlnou funkci pro aktuální logování:

```js
// logNyní bude parciální log s pevným prvním argumentem
let logNyní = log(new Date());

// použijeme ji
logNyní("INFO", "zpráva"); // [HH:mm] INFO zpráva
```

Nyní `logNyní` je `log` s pevným prvním argumentem, jinými slovy „parciálně aplikovaná funkce“ nebo krátce „parciální funkce“.

Můžeme jít dál a vytvořit pohodlnou funkci pro aktuální logování debugů:

```js
let debugNyní = logNyní("DEBUG");

debugNyní("zpráva"); // [HH:mm] DEBUG zpráva
```

Tedy:
1. Po curryingu nic neztratíme: `log` se stále dá volat normálně.
2. Můžeme snadno generovat parciální funkce, např. pro logování s dnešním datem.

## Pokročilá implementace curryingu

V případě, že byste chtěli zajít do detailů, zde je „pokročilá“ implementace curryingu pro víceargumentové funkce, kterou bychom mohli použít výše.

Je opravdu krátká:

```js
function curry(funkce) {

  return function curryovaná(...args) {
    if (args.length >= funkce.length) {
      return funkce.apply(this, args);
    } else {
      return function(...args2) {
        return curryovaná.apply(this, args.concat(args2));
      }
    }
  };

}
```

Příklady použití:

```js
function součet(a, b, c) {
  return a + b + c;
}

let curryovanýSoučet = curry(součet);

alert( curryovanýSoučet(1, 2, 3) ); // 6, stále normálně volatelná
alert( curryovanýSoučet(1)(2,3) ); // 6, currying 1. argumentu
alert( curryovanýSoučet(1)(2)(3) ); // 6, úplný currying
```

Nová funkce `curry` může vypadat komplikovaně, ale ve skutečnosti je snadné jí porozumět.

Výsledkem volání `curry(funkce)` je wrapper `curryovaná`, který vypadá takto:

```js
// funkce je funkce, která se má transformovat
function curryovaná(...args) {
  if (args.length >= funkce.length) { // (1)
    return funkce.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curryovaná.apply(this, args.concat(args2));
    }
  }
};
```

Když ji spustíme, obsahuje dvě výkonové větve `if`:

1. Je-li počet předaných argumentů `args` stejný nebo větší, než v definici původní funkce (`funkce.length`), pak jí jen předáme volání pomocí `funkce.apply`. 
2. V opačném případě získáme parciální funkci: ještě funkci `funkce` nebudeme volat. Místo toho se vrátí další wrapper, který znovu aplikuje funkci `curryovaná` a poskytne jí předchozí argumenty společně s novými.

Když ji pak znovu zavoláme, získáme buď novou parciální funkci (nemáme-li ještě dost argumentů), nebo nakonec výsledek.

```smart header="Jen pro funkce s pevnou délkou"
Currying vyžaduje, aby funkce měla pevný počet argumentů.

Funkci, která používá zbytkové parametry, např. `f(...args)`, nelze tímto způsobem curryovat.
```

```smart header="Víc než jen currying"
Podle definice by currying měl převést `součet(a, b, c)` na `součet(a)(b)(c)`.

Většina implementací curryingu v JavaScriptu je však pokročilá, jak bylo popsáno: udržují funkci volatelnou i ve víceargumentové variantě.
```

## Shrnutí

*Currying* je transformace, která umožní volat `f(a,b,c)` jako `f(a)(b)(c)`. Implementace v JavaScriptu obvykle současně ponechají funkci volatelnou normálně a vrátí parciální funkci, není-li poskytnuto dost argumentů.

Currying nám umožní snadno získat parciální funkci. Jak jsme viděli v příkladu s logováním, univerzální tříargumentová funkce `log(datum, důležitost, zpráva)` nám po curryingu vydá parciální funkci, když je volána s jedním argumentem (např. `log(datum)`) nebo se dvěma argumenty (např. `log(datum, důležitost)`).  
