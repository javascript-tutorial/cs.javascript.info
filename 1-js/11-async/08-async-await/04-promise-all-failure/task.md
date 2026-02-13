
# Nebezpečný Promise.all

`Promise.all` je skvělý způsob, jak paralelizovat vícenásobné operace. Obzvláště se hodí, když potřebujeme vytvořit paralelní požadavky na více služeb.

Skrývá se v něm však nebezpečí. V této úloze uvidíme jeho příklad a prozkoumáme, jak se mu vyhnout.

Dejme tomu, že máme připojení ke vzdálené službě, například k databázi.

Máme pro něj dvě funkce: `připoj()` a `odpoj()`.

Když se připojíme, můžeme posílat požadavky voláním `databáze.dotaz(...)` -- asynchronní funkce, která obvykle vrátí výsledek, ale může také vygenerovat chybu.

Jednoduchá implementace:

```js
let databáze;

function připoj() {
  databáze = {
    async dotaz(jeOk) {
      if (!jeOk) throw new Error('Dotaz selhal');
    }
  };
}

function odpoj() {
  databáze = null;
}

// zamýšlené použití:
// připoj()
// ...
// databáze.dotaz(true) pro emulaci úspěšného volání
// databáze.dotaz(false) pro emulaci neúspěšného volání
// ...
// odpoj()
```

Nyní zde máme problém.

Napíšeme kód pro připojení a pošleme paralelně 3 dotazy (každý z nich trvá jinou dobu, např. 100, 200 a 300 ms), pak se odpojíme:

```js
// pomocná funkce pro volání asynchronní funkce `fn` za `ms` milisekund
function čekej(fn, ms) {
  return new Promise((splň, zamítni) => {
    setTimeout(() => fn().then(splň, zamítni), ms);
  });
}

async function spusť() {
  připoj();

  try {
    await Promise.all([
      // tyto 3 paralelní úkoly trvají každý jinou dobu: 100, 200 a 300 ms
      // k dosažení tohoto efektu použijeme pomocnou funkci `čekej`
*!*
      čekej(() => databáze.dotaz(true), 100),
      čekej(() => databáze.dotaz(false), 200),
      čekej(() => databáze.dotaz(false), 300)
*/!*
    ]);
  } catch(chyba) {
    console.log('Chyba zpracována (opravdu?)');
  }

  odpoj();
}

spusť();
```

Dva z těchto dotazů byly neúspěšné, ale my jsme natolik chytří, že jsme volání `Promise.all` umístili do bloku `try..catch`.

Ale to nepomůže! Tento skript ve skutečnosti vyvolá nezachycenou chybu v konzoli!

Proč? Jak se tomu vyhnout?