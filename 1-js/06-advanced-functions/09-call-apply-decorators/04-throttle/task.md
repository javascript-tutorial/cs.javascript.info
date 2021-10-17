importance: 5

---

# Tlumící dekorátor

Vytvořte „tlumící“ dekorátor `tlumič(f, ms)` -- který bude vracet wrapper.

<<<<<<< Updated upstream
When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds. 
=======
Když je zavolán vícekrát, předá volání funkci `f` nejvýše jednou za `ms` milisekund.
>>>>>>> Stashed changes

Rozdíl oproti debounce je v tom, že je to zcela odlišný dekorátor:
- `debounce` spustí funkci jednou po „době vychladnutí“. To je dobré pro zpracování konečného výsledku.
- `tlumič` spustí funkci nejvýše jednou za čas `ms`. To je dobré pro pravidelné aktualizace, které by se neměly dít příliš často.

<<<<<<< Updated upstream
Let's check the real-life application to better understand that requirement and to see where it comes from.
=======
Jinými slovy, `tlumič` je jako sekretářka, která přijímá telefonní hovory, ale neobtěžuje šéfa (nevolá skutečnou funkci `f`) častěji než jednou za `ms` milisekund.

Podívejme se na aplikaci z reálného života, abychom tomuto požadavku lépe porozuměli a viděli, odkud přichází.
>>>>>>> Stashed changes

**Například chceme trasovat pohyby myši.**

V prohlížeči můžeme nastavit funkci, která se spustí při každém pohybu myši a vrátí polohu kurzoru při jeho pohybu. Při aktivním používání myši se tato funkce spouští obvykle velmi často, může to být třeba 100krát za sekundu (každých 10 ms).

**Když se kurzor pohybuje, chtěli bychom aktualizovat určitou informaci na webové stránce.**

...Ale aktualizační funkce `aktualizace()` je příliš náročná, než abychom ji prováděli při každém drobném pohybu. Navíc nemá smysl aktualizovat častěji než jednou za 100 ms.

Zabalíme ji tedy do dekorátoru: použijeme na ni `tlumič(aktualizace, 100)`, aby se spustil při každém pohybu myši místo původní `aktualizace()`. Dekorátor bude volán často, ale předá volání funkci `aktualizace()` nanejvýše jednou za 100 ms.

Vizuálně to bude vypadat následovně:

1. Při prvním pohybu myši dekorovaná varianta okamžitě předá volání funkci `aktualizace`. To je důležité, jelikož uživatel okamžitě uvidí naši reakci na jeho pohyb.
2. Když se pak myš bude pohybovat, před uplynutím `100 ms` se nic nestane. Dekorovaná varianta bude volání ignorovat.
3. Po uplynutí `100 ms` se jedenkrát zavolá `aktualizace` s posledními souřadnicemi.
4. Nakonec se pak myš někde zastaví. Dekorovaná varianta počká, než uplyne `100 ms`, a pak spustí funkci `aktualizace` s posledními souřadnicemi. Takže, což je poměrně důležité, budou zpracovány konečné souřadnice myši.

Příklad kódu:

```js
function f(a) {
  console.log(a);
}

// f1000 předá volání funkci f nejvýše jednou za 1000 ms
let f1000 = tlumič(f, 1000);

f1000(1); // zobrazí 1
f1000(2); // (tlumeno, 1000 ms ještě neuplynulo)
f1000(3); // (tlumeno, 1000 ms ještě neuplynulo)

// až 1000 ms uběhne...
// ...vypíše 3, mezilehlá hodnota 2 byla ignorována
```

P.S. Původní funkci `f` by měly být předány argumenty a kontext `this` předané do `f1000`.
