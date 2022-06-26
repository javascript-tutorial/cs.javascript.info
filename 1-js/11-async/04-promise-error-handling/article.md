
# Ošetřování chyb pomocí příslibů

Řetězy příslibů jsou vynikající při ošetřování chyb. Když je příslib zamítnut, řízení skočí do nejbližšího handleru pro zamítnutí. To je v praxi velice užitečné.

Například v níže uvedeném kódu je URL předané funkci `fetch` vadné (taková stránka neexistuje) a `.catch` ošetří chybu:

```js run
*!*
fetch('https://takovy-server-neni.blabla') // zamítne
*/!*
  .then(response => response.json())
  .catch(chyba => alert(chyba)) // TypeError: failed to fetch (text se může lišit)
```

Jak vidíte, `.catch` nemusí být uvedeno okamžitě. Může se objevit až za jednou nebo i několika funkcemi `.then`.

Nebo možná je se stránkou všechno v pořádku, ale odpověď není platný JSON. Nejjednodušší způsob, jak zachytit všechny chyby, je přidat `.catch` na konec řetězu:

```js run
fetch('/article/promise-chaining/user.json')
  .then(odpověď => odpověď.json())
  .then(uživatel => fetch(`https://api.github.com/users/${uživatel.name}`))
  .then(odpověď => odpověď.json())
  .then(uživatelGitHubu => new Promise((resolve, reject) => {
    let obrázek = document.createElement('img');
    obrázek.src = uživatelGitHubu.avatar_url;
    obrázek.className = "promise-avatar-example";
    document.body.append(obrázek);

    setTimeout(() => {
      obrázek.remove();
      resolve(uživatelGitHubu);
    }, 3000);
  }))
*!*
  .catch(chyba => alert(chyba.message));
*/!*
```

Za normálních okolností se takové `.catch` vůbec nespustí. Jestliže však je kterýkoli z výše uvedených příslibů zamítnut (ať už kvůli síťové chybě, vadnému JSONu nebo čemukoli jinému), pak jej zachytí.

## Implicitní try..catch

Kód příslibového exekutoru a příslibových handlerů v sobě má „neviditelné `try..catch`“. Jestliže nastane výjimka, bude zachycena a bude s ní zacházeno jako se zamítnutím.

Například tento kód:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Ouha!");
*/!*
}).catch(alert); // Error: Ouha!
```

...Funguje stejně jako tento kód:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Ouha!"));
*/!*
}).catch(alert); // Error: Ouha!
```

„Neviditelné `try..catch`“ okolo exekutoru automaticky zachytí chybu a promění ji v zamítnutý příslib.

Děje se to nejen ve funkci exekutoru, ale i v jejích handlerech. Jestliže zavoláme `throw` uvnitř handleru `.then`, znamená to zamítnutý příslib, takže řízení skočí do nejbližšího chybového handleru.

Zde je příklad:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((výsledek) => {
*!*
  throw new Error("Ouha!"); // zamítne příslib
*/!*
}).catch(alert); // Error: Ouha!
```

To se děje pro všechny chyby, nejen pro ty, které vyvolal příkaz `throw`. Například pro programátorskou chybu:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((výsledek) => {
*!*
  blabla(); // taková funkce není
*/!*
}).catch(alert); // ReferenceError: blabla není definována
```

Poslední `.catch` zachytává nejen explicitní zamítnutí, ale také neúmyslné chyby ve výše uvedených handlerech.

## Opětovné vyvolání

Jak jsme se již zmínili, `.catch` na konci řetězu se podobá `try..catch`. Můžeme mít tolik handlerů `.then`, kolik chceme, a pak na konci použít jediný `.catch`, aby ošetřil chyby v nich všech.

V běžném `try..catch` můžeme chybu analyzovat a případně ji opětovně vyvolat, pokud ji nemůžeme ošetřit. Totéž je možné i u příslibů.

Jestliže zavoláme `throw` uvnitř `.catch`, pak řízení přejde do nejbližšího dalšího chybového handleru. A jestliže ošetříme chybu a normálně skončíme, pak bude pokračovat do nejbližšího dalšího úspěšného handleru `.then`.

V níže uvedeném příkladu `.catch` úspěšně ošetří chybu:

```js run
// výkon: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Ouha!");

}).catch(function(chyba) {

  alert("Chyba je ošetřena, pokračuje se dál");

}).then(() => alert("Další úspěšný handler se spustil"));
```

Zde blok `.catch` normálně skončí. Je tedy vyvolán další úspěšný handler `.then`.

V níže uvedeném příkladu vidíme opačnou situaci s `.catch`. Handler `(*)` zachytí chybu a nemůže ji ošetřit (např. proto, že umí ošetřit jenom `URIError`), takže ji opětovně vyvolá:

```js run
// výkon: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Ouha!");

}).catch(function(chyba) { // (*)

  if (chyba instanceof URIError) {
    // ošetří ji
  } else {
    alert("Tuto chybu nemohu ošetřit");

*!*
    throw chyba; // vyvolání této nebo jiné chyby skočí do dalšího catch
*/!*
  }

}).then(function() {
  /* toto se nespustí */
}).catch(chyba => { // (**)

  alert(`Nastala neznámá chyba: ${chyba}`);
  // nic nevrací => výkon pokračuje běžným způsobem

});
```

Výkon skočí z prvního `.catch` `(*)` do dalšího `(**)` podél řetězu.

## Neošetřená zamítnutí

Co se stane, když chyba není ošetřena? Například když zapomeneme přidat `.catch` na konec řetězu, například zde:

```js untrusted run refresh
new Promise(function() {
  takováFunkceNení(); // zde je chyba (taková funkce není)
})
  .then(() => {
    // úspěšné příslibové handlery, jeden nebo více
  }); // bez .catch na konci!
```

V případě chyby bude příslib zamítnut a řízení by mělo skočit do nejbližšího zamítacího handleru. Tady však žádný není. Chyba tedy zůstane „viset“. Není zde žádný kód, který by ji ošetřil.

V praxi, stejně jako u běžných neošetřených chyb v kódu, to znamená, že se něco ošklivě pokazilo.

Co se stane, když nastane běžná chyba a není ošetřena pomocí `try..catch`? Skript spadne se zprávou na konzoli. Něco podobného se stane u neošetřených zamítnutí příslibů.

Engine JavaScriptu tato zamítnutí sleduje a v takovém případě vygeneruje globální chybu. Můžete ji vidět na konzoli, pokud si spustíte výše uvedený příklad.

V prohlížeči můžeme takové chyby zachytávat pomocí události `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(událost) {
  // objekt událost má dvě speciální vlastnosti:
  alert(událost.promise); // [object Promise] - příslib, který vygeneroval tuto chybu
  alert(událost.reason); // Error: Ouha! - neošetřený chybový objekt
});
*/!*

new Promise(function() {
  throw new Error("Ouha!");
}); // není zde žádné catch, které by tuto chybu ošetřilo
```

Tato událost je součástí [standardu HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Jestliže dojde k chybě a není zde žádné `.catch`, spustí se handler `unhandledrejection` a obdrží objekt `událost` s informacemi o chybě, takže můžeme něco udělat.

Z takových chyb se obvykle nelze zotavit, takže naše nejlepší cesta ven je informovat uživatele o problému a pravděpodobně hlásit tento incident serveru.

V neprohlížečových prostředích jako Node.js jsou jiné způsoby, jak vystopovat neošetřené chyby.

## Shrnutí

- `.catch` ošetřuje chyby všech druhů v příslibech: ať je to volání `reject()` nebo chyba vyvolaná v handleru.
- `.then` také zachytává chyby stejným způsobem, je-li zadán druhý argument (kterým je chybový handler).
- Měli bychom `.catch` umisťovat přesně na místa, kde chceme ošetřovat chyby a víme, jak je ošetřit. Handler by měl analyzovat chyby (v tom nám pomáhají vlastní chybové třídy) a opětovně vyvolat ty neznámé (možná jde o programátorské chyby).
- Vůbec nepoužít `.catch` je v pořádku, jestliže neexistuje způsob, jak se z chyby zotavit.
- V každém případě bychom měli mít handler události `unhandledrejection` (pro prohlížeče, v jiných prostředích bývá analogický handler), abychom vystopovali neošetřené chyby a informovali o nich uživatele (a pravděpodobně náš server), aby naše aplikace nikdy „jen tak nespadla“.
