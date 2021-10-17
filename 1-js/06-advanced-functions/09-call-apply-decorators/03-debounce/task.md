importance: 5

---

# Debouncový dekorátor

Výsledkem dekorátoru `debounce(f, ms)` je wrapper, který pozastaví volání `f`, dokud neuplyne `ms` milisekund neaktivity (žádná volání, „doba vychladnutí“), a pak zavolá `f` jednou s posledními argumenty.

<<<<<<< Updated upstream
For instance, we had a function `f` and replaced it with `f = debounce(f, 1000)`.
=======
Jinými slovy, `debounce` je jako sekretářka, která přijímá „telefonní hovory“ a čeká, až uplyne `ms` milisekund klidu. Teprve pak předá „šéfovi“ informaci z posledního volání (volá skutečnou funkci `f`).

Například máme funkci `f` a nahradíme ji za `f = debounce(f, 1000)`.
>>>>>>> Stashed changes

Jestliže je pak obalená funkce volána za 0 ms, 200 ms a 500 ms a pak žádná volání nenastanou, bude skutečná funkce `f` volána jen jednou, a to za 1500 ms. Tedy: po době vychladnutí 1000 ms od posledního volání.

![](debounce.svg)

...A obdrží argumenty z posledního volání, ostatní volání jsou ignorována.

<<<<<<< Updated upstream
Here's the code for it (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce):
=======
Zde je kód pro něj (používá debouncový dekorátor z [knihovny Lodash](https://lodash.com/docs/4.17.15#debounce)):
>>>>>>> Stashed changes

```js
let f = _.debounce(alert, 1000);

f("a"); 
setTimeout( () => f("b"), 200);
<<<<<<< Updated upstream
setTimeout( () => f("c"), 500); 
// debounced function waits 1000ms after the last call and then runs: alert("c")
```


Now a practical example. Let's say, the user types something, and we'd like to send a request to the server when the input is finished.
=======
setTimeout( () => f("c"), 500);
// debouncovaná funkce čeká 1000 ms po posledním volání a pak spustí: alert("c")
```

Nyní praktický příklad. Řekněme, že uživatel něco napíše a my bychom chtěli poslat požadavek na server, až bude vstup dokončen.
>>>>>>> Stashed changes

Nemá smysl posílat požadavek po každém napsaném znaku. Místo toho bychom chtěli počkat a pak zpracovat až celý výsledek.

Ve webovém prohlížeči můžeme nastavit handler události -- funkci, která je volána po každé změně vstupního pole. Normálně je handler události volán velmi často, po každé stisknuté klávese. Když na něj však použijeme `debounce` na 1000 ms, pak bude volán jen jednou, a to 1000 ms po posledním vstupu.

```online

V tomto živém příkladu handler umisťuje výsledek do boxu níže, zkuste si to:

[iframe border=1 src="debounce" height=200]

Vidíte? Druhý vstup volá debouncovanou funkci, takže jeho obsah je zpracován až 1000 ms po posledním vstupu.
```

`debounce` je tedy skvělý způsob, jak zpracovat posloupnost událostí: ať už je to posloupnost stisků kláves, pohybů myši nebo cokoli jiného.

<<<<<<< Updated upstream

It waits the given time after the last call, and then runs its function, that can process the result.
=======
Po posledním volání napřed čeká zadanou dobu a poté spustí svou funkci, která může zpracovat výsledek.
>>>>>>> Stashed changes

Úkolem je implementovat dekorátor `debounce`.

<<<<<<< Updated upstream
Hint: that's just a few lines if you think about it :)
=======
Rada: když se nad tím zamyslíte, je to pouhých několik řádků :)
>>>>>>> Stashed changes
