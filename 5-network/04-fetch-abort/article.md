
# Fetch: zrušení stahování

Jak víme, metoda `fetch` vrací příslib. A JavaScript obecně nemá žádný koncept „odvolání“ příslibu. Jak tedy můžeme zastavit probíhající `fetch`? Například pokud uživatelské akce na naší stránce naznačují, že tento `fetch` již nebude zapotřebí.

K tomuto účelu slouží speciální zabudovaný objekt: `AbortController`. Můžeme jej použít nejen k zastavení `fetch`, ale i jiných asynchronních úloh.

Jeho použití je velmi přímočaré:

## Objekt AbortController

Vytvoříme controller:

```js
let controller = new AbortController();
```

Controller je extrémně jednoduchý objekt.

- Obsahuje jedinou metodu `abort()`
- a jedinou vlastnost `signal`, která umožňuje na něm nastavovat posluchače událostí.

Když je `abort()` volána:
- `controller.signal` vyvolá událost `"abort"`.
- Vlastnost `controller.signal.aborted` se nastaví na `true`.

Obecně máme v tomto procesu dvě části:
1. Ta, která provádí zrušitelnou operaci, nastaví posluchače událostí na `controller.signal`.
2. Ta, která ruší: když je potřeba, volá `controller.abort()`.

Následuje úplný příklad (zatím bez `fetch`):

```js run
let controller = new AbortController();
let signal = controller.signal;

// Strana, která provádí zrušitelnou operaci,
// obdrží objekt „signal“
// a nastaví posluchače, který se spustí, když bude volána controller.abort()
signal.addEventListener('abort', () => alert("zastaveno!"));

// Druhá strana, která provede zastavení (kdykoli později):
controller.abort(); // zastaveno!

// Událost se spustí a signal.aborted se nastaví na true
alert(signal.aborted); // true
```

Jak vidíme, `AbortController` je jen způsob, jak předávat událost `abort`, když je na něm volán `abort()`.

Stejný způsob naslouchání událostem si můžeme v našem kódu implementovat i sami, bez objektu `AbortController`.

Na něm však je cenné to, že metoda `fetch` umí s objektem `AbortController` pracovat. Je do ní integrován.

## Použití s metodou fetch

Abychom mohli zastavit `fetch`, předáme vlastnost `signal` objektu `AbortController` do voleb metody `fetch`:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

Metoda `fetch` umí s objektem `AbortController` pracovat. Naslouchá událostem `abort` na `signal`.

Když ji nyní chceme zastavit, zavoláme `controller.abort()`:

```js
controller.abort();
```

Jsme hotovi: `fetch` obdrží událost od `signal` a požadavek zastaví.

Když je stahování zastaveno, příslib bude zamítnut s chybou `AbortError`. Měli bychom ji tedy zpracovat, např. v bloku `try..catch`.

V následujícím příkladu se `fetch` zastaví po 1 sekundě:

```js run async
// zastavení po 1 sekundě
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let odpověď = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // ošetříme abort()
    alert("Zastaveno!");
  } else {
    throw err;
  }
}
```

## AbortController je rozšiřitelný

`AbortController` je rozšiřitelný. Umožňuje zastavit více stahování najednou.

Následující nástin kódu stahuje z mnoha adres v poli `poleURL` současně a používá jediný controller, který všechna stahování zastaví:

```js
let poleURL = [...]; // seznam URL, z nichž se má paralelně stahovat

let controller = new AbortController();

// pole příslibů fetch
let poleStahování = poleURL.map(url => fetch(url, {
  signal: controller.signal
}));

let výsledky = await Promise.all(poleStahování);

// pokud je odkudkoli volána controller.abort(),
// všechna stahování se zastaví
```

Jestliže máme naše vlastní asynchronní úlohy, jiné než `fetch`, můžeme je všechny zastavit jediným objektem `AbortController` společně s metodami `fetch`.

Jen musíme v našich úlohách naslouchat jeho události `abort`:

```js
let poleURL = [...];
let controller = new AbortController();

let našeČinnost = new Promise((splň, zamítni) => { // naše úloha
  ...
  controller.signal.addEventListener('abort', zamítni);
});

let poleStahování = poleURL.map(url => fetch(url, { // stahování
  signal: controller.signal
}));

// Čekáme na stahování a naši úlohu současně
let výsledky = await Promise.all([...poleStahování, našeČinnost]);

// pokud je odkudkoli volána controller.abort(),
// zastaví se všechna stahování i našeČinnost
```

## Shrnutí

- `AbortController` je jednoduchý objekt, který generuje událost `abort` na své vlastnosti `signal`, když je volána metoda `abort()` (a také nastaví `signal.aborted` na `true`).
- Metoda `fetch` je s ním integrována: předáme jí vlastnost `signal` jako její volbu a pak mu `fetch` naslouchá, je tedy možné `fetch` zastavit.
- Můžeme použít `AbortController` v našem kódu. Interakce „volání `abort()`“ -> „nasloucháme události `abort`“ je jednoduchá a univerzální. Můžeme ji použít i bez `fetch`.