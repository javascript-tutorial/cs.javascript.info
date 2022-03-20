# Příslibové API

Třída `Promise` obsahuje 6 statických metod. Zde rychle probereme jejich případy použití.

## Promise.all

Řekněme, že chceme spustit mnoho příslibů paralelně a počkat, než budou všechny připraveny.

Například stáhnout současně několik URL a zpracovat jejich obsah až tehdy, když budou všechny staženy.

Právě k tomu slouží `Promise.all`.

Jeho syntaxe je:

```js
let příslib = Promise.all(iterovatelnýObjekt);
```

`Promise.all` vezme iterovatelný objekt (obvykle pole příslibů) a vrátí nový příslib.

Nový příslib se splní, až budou splněny všechny vyjmenované přísliby, a jeho výsledkem se stane pole jejich výsledků.

Například níže uvedené `Promise.all` se usadí za 3 sekundy a jeho výsledkem bude pole `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3, až budou přísliby připraveny: každý příslib přispěje jedním prvkem pole
```

Prosíme všimněte si, že pořadí výsledných prvků pole je stejné jako pořadí zdrojových příslibů. I když prvnímu příslibu trvalo vyhodnocení déle, bude v poli výsledků stále první.

Běžným trikem je namapovat pole pracovních dat do pole příslibů a to pak zabalit do `Promise.all`.

Například máme-li pole URL, můžeme je všechny stáhnout tímto způsobem:

```js run
let poleURL = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// zmapujeme každý URL na příslib metody fetch
let požadavky = poleURL.map(url => fetch(url));

// Promise.all počká, dokud nebudou všechny úkoly splněny
Promise.all(požadavky)
  .then(odpovědi => odpovědi.forEach(
    odpověď => alert(`${odpověď.url}: ${odpověď.status}`)
  ));
```

Větší příklad s načítáním informací o uživatelích pro pole uživatelů GitHubu podle jejich jmen (zrovna tak můžeme stáhnout pole zboží podle jejich identifikačních čísel, logika je stejná):

```js run
let jména = ['iliakan', 'remy', 'jeresig'];

let požadavky = jména.map(jméno => fetch(`https://api.github.com/users/${jméno}`));

Promise.all(požadavky)
  .then(odpovědi => {
    // všechny odpovědi se vyhodnotily úspěšně
    for(let odpověď of odpovědi) {
      alert(`${odpověď.url}: ${odpověď.status}`); // zobrazí 200 pro každý URL
    }

    return odpovědi;
  })
  // namapuje pole odpovědí do pole odpověď.json(), aby načetl jejich obsah
  .then(odpovědi => Promise.all(odpovědi.map(r => r.json())))
  // všechny odpovědi JSON jsou parsovány: „uživatelé“ je jejich pole
  .then(uživatelé => uživatelé.forEach(uživatel => alert(uživatel.name)));
```

**Bude-li některý příslib zamítnut, příslib vrácený metodou `Promise.all` se okamžitě zamítne s příslušnou chybou.**

Například:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouha!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Ouha!
```

Zde je druhý příslib zamítnut za dvě sekundy. To povede k okamžitému zamítnutí `Promise.all`, takže se spustí `.catch`: chyba zamítnutí se stane výstupem celé metody `Promise.all`.

```warn header="V případě chyby jsou ostatní přísliby ignorovány"
Jestliže je jeden příslib zamítnut, `Promise.all` je okamžitě zamítnut a ostatní přísliby v seznamu jsou okamžitě zapomenuty. Jejich výsledky jsou ignorovány.

Například jestliže je zde několik volání `fetch`, podobně jako ve výše uvedeném příkladu, a jedno z nich selže, ostatní se budou stále vykonávat dál, ale `Promise.all` je už nebude sledovat. Pravděpodobně se usadí, ale jejich výsledky budou ignorovány.

`Promise.all` neudělá nic, aby je zrušil, protože přísliby nemají žádný koncept „zrušení“. V [jiné kapitole](info:fetch-abort) probereme `AbortController`, který s tím může pomoci, ale ten není součástí příslibového API.
```

````smart header="`Promise.all(iterovatelný)` umožňuje v objektu `iterovatelný` nepříslibové „obyčejné“ hodnoty"
`Promise.all(...)` běžně přijímá iterovatelný objekt (ve většině případů pole) příslibů. Jestliže však kterýkoli z těchto objektů není příslib, je předán do výsledného pole „tak, jak je“.

Například zde jsou výsledky `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Můžeme tedy do `Promise.all` předat již připravené hodnoty, když se nám to hodí.
````

## Promise.allSettled

[recent browser="new"]

Jestliže je některý příslib zamítnut, je zamítnut i `Promise.all` jako celek. To je dobré v případech typu „všechno nebo nic“, kdy potřebujeme mít *všechny* výsledky úspěšné, abychom mohli pokračovat:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // metoda render potřebuje výsledky všech stahování
```

`Promise.allSettled` jednoduše počká, než se usadí všechny přísliby, bez ohledu na výsledek. Výsledné pole obsahuje:

- `{status:"fulfilled", value:výsledek}` pro úspěšné odpovědi,
- `{status:"rejected", reason:chyba}` pro chyby.

Například bychom rádi načetli informace o více uživatelích. I kdyby jeden požadavek neuspěl, ty ostatní nás stále zajímají.

Použijme `Promise.allSettled`:

```js run
let poleURL = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://takovy-url-neni'
];

Promise.allSettled(poleURL.map(url => fetch(url)))
  .then(výsledky => { // (*)
    výsledky.forEach((výsledek, číslo) => {
      if (výsledek.status == "fulfilled") {
        alert(`${poleURL[číslo]}: ${výsledek.value.status}`);
      }
      if (výsledek.status == "rejected") {
        alert(`${poleURL[číslo]}: ${výsledek.reason}`);
      }
    });
  });
```

Pole `výsledky` na řádku `(*)` bude následující:
```js
[
  {status: 'fulfilled', value: ...odpověď...},
  {status: 'fulfilled', value: ...odpověď...},
  {status: 'rejected', reason: ...chybový objekt...}
]
```

Pro každý příslib tedy získáme jeho stav a `value/error`.

### Polyfill

Jestliže prohlížeč nepodporuje `Promise.allSettled`, snadno vytvoříme polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (přísliby) {
    const převedenéPřísliby = přísliby.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(převedenéPřísliby);
  };
}
```

V tomto kódu metoda `přísliby.map` vezme vstupní hodnoty, přemění je na přísliby (jen v případě, že byla předána jiná hodnota než příslib) pomocí `p => Promise.resolve(p)` a pak ke každému přidá handler `.then`.

Handler přemění úspěšný výsledek `value` na `{status:'fulfilled', value}` a chybu `reason` na `{status:'rejected', reason}`. To je přesně formát metody `Promise.allSettled`.

Nyní můžeme používat `Promise.allSettled` k získání výsledků *všech* zadaných příslibů, i když byly některé z nich zamítnuty.

## Promise.race

Podobá se `Promise.all`, ale čeká jen na první příslib, který se usadí, a vezme jeho výsledek (nebo chybu).

Syntaxe je:

```js
let příslib = Promise.race(iterovatelnýObjekt);
```

Například zde bude výsledek `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouha!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Zde byl nejrychlejší první příslib, takže ten se stane výsledkem. Poté, co první usazený příslib „vyhraje závod“ *(„race“ = angl. „závod“ -- pozn. překl.)*, budou všechny ostatní výsledky/chyby ignorovány.


## Promise.any

Podobá se `Promise.race`, ale čeká jen na první příslib, který bude splněn, a vezme jeho výsledek. Budou-li všechny zadané přísliby zamítnuty, pak bude vrácený příslib zamítnut s chybou [`AggregateError`](mdn:js/AggregateError) -- speciálním chybovým objektem, který uloží chyby všech příslibů do své vlastnosti `errors`.

Syntaxe je:

```js
let příslib = Promise.any(iterovatelný);
```

Například zde bude výsledek `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouha!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Zde byl nejrychlejší první příslib, ale ten byl zamítnut, takže výsledkem se stane druhý příslib.  Poté, co první splněný příslib „vyhraje závod“, budou všechny ostatní výsledky ignorovány.

Zde je příklad, v němž všechny přísliby selžou:

```js run
Promise.any([
<<<<<<< HEAD
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Au!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Chyba!")), 2000))
]).catch(chyba => {
  console.log(chyba.constructor.name); // AggregateError
  console.log(chyba.errors[0]); // Error: Au!
  console.log(chyba.errors[1]); // Error: Chyba
=======
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4
});
```

Jak vidíte, chybové objekty pro neúspěšné přísliby jsou k dispozici ve vlastnosti `errors` objektu `AggregateError`.

## Promise.resolve/reject

Metody `Promise.resolve` a `Promise.reject` jsou v moderním kódu zapotřebí jen málokdy, protože syntaxe `async/await` (probereme ji [o něco později](info:async-await)) je činí poněkud zbytečnými.

Probereme je zde pro úplnost a pro ty, kteří z nějakého důvodu nemohou `async/await` používat.

### Promise.resolve

`Promise.resolve(hodnota)` vytvoří splněný příslib s výsledkem `hodnota`.

Je to totéž jako:

```js
let příslib = new Promise(resolve => resolve(hodnota));
```

Tato metoda se používá kvůli kompatibilitě, když se od nějaké funkce očekává, že vrátí příslib.

Například níže uvedená funkce `načtiUložené` stáhne obsah z URL a zapamatuje si ho (uloží do cache). Při dalších voláních se stejným URL okamžitě načte z cache předchozí obsah, ale pomocí `Promise.resolve` z něj vyrobí příslib, takže návratová hodnota bude vždy příslib:

```js
let cache = new Map();

function načtiUložené(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(odpověď => odpověď.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Můžeme zapsat `načtiUložené(url).then(…)`, protože tato funkce zaručeně vrátí příslib. Za `načtiUložené` můžeme vždy použít `.then`. To je smyslem `Promise.resolve` na řádku `(*)`.

### Promise.reject

`Promise.reject(chyba)` vytvoří zamítnutý příslib s chybou `chyba`.

Je to totéž jako:

```js
let příslib = new Promise((resolve, reject) => reject(chyba));
```

V praxi se tato metoda téměř nikdy nepoužívá.

## Shrnutí

Třída `Promise` obsahuje 6 statických metod:

1. `Promise.all(přísliby)` -- počká, až se všechny přísliby splní, a vrátí pole jejich výsledků. Pokud je kterýkoli ze zadaných příslibů zamítnut, jeho chyba se stane chybou `Promise.all` a všechny ostatní výsledky se ignorují.
2. `Promise.allSettled(přísliby)` (nedávno přidaná metoda) -- počká, až se všechny přísliby usadí, a vrátí jejich výsledky jako pole objektů obsahujících:
    - `status`: `"fulfilled"` nebo `"rejected"`
    - `value` (je-li splněn) nebo `reason` (je-li zamítnut).
3. `Promise.race(přísliby)` -- počká na první příslib, který se usadí, a výstupem se stane jeho výsledek/chyba.
4. `Promise.any(přísliby)` (nedávno přidaná metoda) -- počká na první příslib, který se splní, a výstupem se stane jeho výsledek. Budou-li všechny zadané přísliby zamítnuty, chybou `Promise.any` se stane [`AggregateError`](mdn:js/AggregateError).
5. `Promise.resolve(hodnota)` -- vytvoří splněný příslib se zadanou hodnotou.
6. `Promise.reject(chyba)` -- vytvoří zamítnutý příslib se zadanou chybou.

Ze všech těchto metod se v praxi asi nejčastěji používá `Promise.all`.
