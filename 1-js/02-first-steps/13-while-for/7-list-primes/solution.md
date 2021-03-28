Pro tuto úlohu existuje mnoho algoritmů.

Použijeme vnořený cyklus:

```js
pro každé i v intervalu {
  ověř, zda i má dělitele mezi 1..i
  pokud ano => i není prvočíslo
  pokud ne => i je prvočíslo, zobraz ho
}
```

Kód s použitím návěští:

```js run
let n = 10;

dalšíPrvočíslo:
for (let i = 2; i <= n; i++) { // pro každé i...

  for (let j = 2; j < i; j++) { // hledáme dělitele...
    if (i % j == 0) continue dalšíPrvočíslo; // není to prvočíslo, přejdeme k dalšímu i
  }

  alert( i ); // je to prvočíslo
}
```

Je zde mnoho prostoru k optimalizaci. Můžeme se například dívat jen na dělitele od `2` do odmocniny `i`. Kdybychom však chtěli být opravdu efektivní i pro velké intervaly, museli bychom změnit přístup a zaměřit se na vysokou matematiku a složité algoritmy, např. [kvadratické síto](https://en.wikipedia.org/wiki/Quadratic_sieve), [Obecné číselné teoretické síto (GNFS)](https://en.wikipedia.org/wiki/General_number_field_sieve) atd.
