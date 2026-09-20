
# Lepkavý příznak „y“, hledání na stanovené pozici

Příznak `pattern:y` nám umožňuje provést hledání na zadané pozici zdrojového řetězce.

Abychom pochopili využití příznaku `pattern:y` a lépe porozuměli fungování regulárních výrazů, podívejme se na praktický příklad.

Jedna z běžných úloh pro regulární výrazy je „lexikální analýza“: máme text, např. v programovacím jazyce, a potřebujeme najít jeho strukturální prvky. Například HTML obsahuje značky a atributy, kód v JavaScriptu má funkce, proměnné a podobně.

Psaní lexikálních analyzátorů je samostatný obor s vlastními nástroji a algoritmy, proto zde nepůjdeme do hloubky, ale jedna úloha je společná: načíst něco na zadané pozici.

Například máme řetězec s kódem `subject:let promenna = "hodnota"` a potřebujeme z něj načíst název proměnné, který začíná na pozici `4`.

Název proměnné hledáme regulárním výrazem `pattern:\w+`. Ve skutečnosti správné hledání názvů proměnných v JavaScriptu vyžaduje trochu složitější RV, ale tady na tom nezáleží.

- Volání `řetězec.match(/\w+/)` najde jen první slovo na řádku (`let`). To není ono.
- Můžeme přidat příznak `pattern:g`, ale pak volání `řetězec.match(/\w+/g)` najde všechna slova v textu, zatímco my potřebujeme jen jedno slovo na pozici `4`. Opět to není to, co potřebujeme.

**Jak tedy regulárním výrazem hledat přesně na zadané pozici?**

Zkusme použít metodu `rv.exec(řetězec)`.

Pro `rv` bez příznaků `pattern:g` a `pattern:y` tato metoda hledá jen první shodu, funguje tedy přesně stejně jako `řetězec.match(rv)`.

...Pokud je však uveden příznak `pattern:g`, pak provede hledání v řetězci `řetězec` od pozice uložené ve vlastnosti `rv.lastIndex`. A pokud najde shodu, pak nastaví `rv.lastIndex` na index pozice bezprostředně za shodou.

Jinými slovy, `rv.lastIndex` slouží jako počáteční bod pro hledání a pak ji každé volání `rv.exec(řetězec)` nastaví na novou hodnotu („za poslední shodou“). To platí samozřejmě jen tehdy, je-li uveden příznak `pattern:g`.

Volání `rv.exec(řetězec)` za sebou tedy vracejí jednu shodu za druhou.

Příklad takových volání:

```js run
let řetězec = 'let promenna'; // Najděme v tomto řetězci všechna slova
let rv = /\w+/g;

alert(rv.lastIndex); // 0 (na začátku lastIndex=0)

let slovo1 = rv.exec(řetězec);
alert(slovo1[0]); // let (1. slovo)
alert(rv.lastIndex); // 3 (pozice za shodou)

let slovo2 = rv.exec(řetězec);
alert(slovo2[0]); // promenna (2. slovo)
alert(rv.lastIndex); // 12 (pozice za shodou)

let slovo3 = rv.exec(řetězec);
alert(slovo3); // null (další shody nejsou)
alert(rv.lastIndex); // 0 (na konci hledání se resetuje)
```

Můžeme získat všechny shody v cyklu:

```js run
let řetězec = 'let promenna';
let rv = /\w+/g;

let výsledek;

while (výsledek = rv.exec(řetězec)) {
  alert( `Nalezeno ${výsledek[0]} na pozici ${výsledek.index}` );
  // Nalezeno let na pozici 0, pak
  // Nalezeno promenna na pozici 4
}
```

Toto použití `rv.exec` je alternativou k metodě `řetězec.matchAll`, která nám poskytuje trochu více kontroly nad procesem.

Vraťme se k naší úloze.

Můžeme ručně nastavit `lastIndex` na `4`, abychom zahájili hledání na zadané pozici!

Například:

```js run
let řetězec = 'let promenna = "hodnota"';

let rv = /\w+/g; // bez příznaku "g" je vlastnost lastIndex ignorována

*!*
rv.lastIndex = 4;
*/!*

let slovo = rv.exec(řetězec);
alert(slovo); // promenna
```

Hurá! Problém je vyřešen!

Provedli jsme hledání `pattern:\w+` počínajíce pozicí `rv.lastIndex = 4`.

Výsledek je správný.

...Ale počkat, ne tak rychle.

Prosíme všimněte si: volání `rv.exec` zahájí hledání na pozici `lastIndex` a pak pokračuje dál. Jestliže na pozici `lastIndex` slovo není, ale je někde za ní, pak bude nalezeno:

```js run
let řetězec = 'let promenna = "hodnota"';

let rv = /\w+/g;

*!*
// začneme hledání od pozice 3
rv.lastIndex = 3;
*/!*

let slovo = rv.exec(řetězec); 
// najdeme shodu na pozici 4
alert(slovo[0]); // promenna
alert(slovo.index); // 4
```

Pro některé úlohy, včetně lexikální analýzy, je to špatně. Potřebujeme najít shodu přesně na zadané pozici v textu, ne někde za ní. A právě k tomu slouží příznak `y`.

**Příznak `pattern:y` způsobí, že `rv.exec` bude hledat výhradně na pozici `lastIndex`, nebude od ní „začínat“.**

Zde je stejné hledání s příznakem `pattern:y`:

```js run
let řetězec = 'let promenna = "hodnota"';

let rv = /\w+/y;

rv.lastIndex = 3;
alert( rv.exec(řetězec) ); // null (na pozici 3 je mezera, ne slovo)

rv.lastIndex = 4;
alert( rv.exec(řetězec) ); // promenna (slovo na pozici 4)
```

Jak vidíme, regulární výraz `pattern:/\w+/y` nenajde shodu na pozici `3` (na rozdíl od příznaku `pattern:g`), ale najde ji na pozici `4`.

Nejenom že přesně tohle potřebujeme, ale použitím příznaku `pattern:y` získáme významné zlepšení výkonu.

Představte si, že máme dlouhý text a v něm nejsou vůbec žádné shody. Pak hledání s příznakem `pattern:g` bude pokračovat až na konec textu a nic nenajde, což bude trvat výrazně delší dobu než hledání s příznakem `pattern:y`, které prověří jen danou pozici.

V úlohách jako lexikální analýza se obvykle provádí mnoho hledání na stanovené pozici, abychom zjistili, co tam máme. Používání příznaku `pattern:y` je klíčem ke správným implementacím a dobrému výkonu.
