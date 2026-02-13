
Jádro problému spočívá v tom, že `Promise.all` se okamžitě zamítne, když bude zamítnut jeden z jeho příslibů, ale neudělá nic, aby zrušilo ostatní přísliby.

V našem případě selže druhý dotaz, takže `Promise.all` se zamítne a blok `try...catch` tuto chybu zachytí. Mezitím však ostatní přísliby *nejsou ovlivněny* -- jejich vykonávání nezávisle pokračuje. V našem případě třetí příslib za nějakou dobu vygeneruje chybu sám o sobě. A tato chyba není ničím zachycena a my ji uvidíme v konzoli.

Tento problém je obzvláště nebezpečný v prostředích na straně serveru, například Node.js, kde nezachycená chyba může vést k havárii procesu.

Jak to opravit?

Ideální řešení by bylo zrušit všechny nedokončené dotazy ve chvíli, kdy jeden z nich selže. Tímto způsobem se vyhneme všem potenciálním chybám.

Špatná zpráva však je, že volání služeb (např. `databáze.dotaz`) je často implementováno knihovnou třetí strany, která nepodporuje rušení. Pak neexistuje žádný způsob, jak volání zrušit.

Jako alternativu si můžeme napsat vlastní obalovou funkci kolem `Promise.all`, která přidá ke každému příslibu vlastní handler `then/catch`, který je bude sledovat: výsledky se shromáždí, a pokud dojde k chybě, všechny ostatní přísliby jsou ignorovány.

```js
function vlastníPromiseAll(přísliby) {
  return new Promise((splň, zamítni) => {
    const výsledky = [];
    let početVýsledků = 0;
    let mámeChybu = false; // po první chybě to nastavíme na true

    přísliby.forEach((příslib, index) => {
      příslib
        .then(výsledek => {
          if (mámeChybu) return; // pokud už máme chybu, příslib ignorujeme
          výsledky[index] = výsledek;
          početVýsledků++;
          if (početVýsledků === přísliby.length) {
            splň(výsledky); // když jsou všechny výsledky připraveny - úspěch
          }
        })
        .catch(chyba => {
          if (mámeChybu) return; // pokud už máme chybu, příslib ignorujeme
          mámeChybu = true; // ouha, chyba!
          zamítni(chyba); // zamítnutí při selhání
        });
    });
  });
}
```

Tento přístup má sám o sobě problém -- často není žádoucí volat `odpoj()`, když jsou dotazy ještě zpracovávány.

Může být důležité, aby se všechny dotazy zpracovaly, zvláště když některé z nich provádějí důležité zápisy do databáze.

Než tedy budeme pokračovat v provádění a nakonec se odpojíme, měli bychom počkat, než budou všechny přísliby usazeny.

Zde je jiná implementace. Chová se podobně jako `Promise.all` -- také se vyhodnotí při první chybě, ale počká, dokud nebudou všechny přísliby usazeny.

```js
function vlastníPromiseAllSČekáním(přísliby) {
  return new Promise((splň, zamítni) => {
    const výsledky = new Array(přísliby.length);
    let početUsazených = 0;
    let prvníChyba = null;

    přísliby.forEach((příslib, index) => {
      Promise.splň(příslib)
        .then(výsledek => {
          výsledky[index] = výsledek;
        })
        .catch(chyba => {
          if (prvníChyba === null) {
            prvníChyba = chyba;
          }
        })
        .finally(() => {
          početUsazených++;
          if (početUsazených === přísliby.length) {
            if (prvníChyba !== null) {
              zamítni(prvníChyba);
            } else {
              splň(výsledky);
            }
          }
        });
    });
  });
}
```

Nyní `await vlastníPromiseAllSČekáním(...)` pozastaví provádění, dokud nebudou všechny dotazy zpracovány.

Tento přístup je spolehlivější, neboť zaručuje předvídatelný průběh provádění.

Nakonec, kdybychom chtěli zpracovat všechny chyby, můžeme buď použít `Promise.allSettled`, nebo kolem něj napsat obal, který shromáždí všechny chyby do jediného objektu [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) a zamítne se s ním.

```js
// počkáme na usazení všech příslibů
// pokud nebyla žádná chyba, vrátíme výsledky
// pokud byly chyby, vygenerujeme AggregateError se všemi chybami
function všechnoNeboAggregateError(přísliby) {
  return Promise.allSettled(přísliby).then(výsledky => {
    const chyby = [];
    const hodnoty = [];

    výsledky.forEach((výsl, i) => {
      if (výsl.status === 'fulfilled') {
        hodnoty[i] = výsl.value;
      } else {
        chyby.push(výsl.reason);
      }
    });

    if (chyby.length > 0) {
      throw new AggregateError(chyby, 'Jeden nebo více příslibů selhalo');
    }

    return hodnoty;
  });
}
```
