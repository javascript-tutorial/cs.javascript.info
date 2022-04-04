Jednoduché řešení by mohlo být:

```js run
*!*
function zamíchej(pole) {
  pole.sort(() => Math.random() - 0.5);
}
*/!*

let pole = [1, 2, 3];
zamíchej(pole);
alert(pole);
```

To jakžtakž funguje, protože `Math.random() - 0.5` je náhodné číslo, které může být kladné nebo záporné, takže řadicí funkce přehází prvky náhodně.

Protože však řadicí funkce není určena k takovému použití, nebudou mít všechny permutace stejnou pravděpodobnost.

Například uvažujte níže uvedený kód. Spustí `zamíchej` 1000000krát a spočítá výskyty všech možných výsledků:

```js run
function zamíchej(pole) {
  pole.sort(() => Math.random() - 0.5);
}

// spočítáme výskyty všech možných permutací
let počty = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let pole = [1, 2, 3];
  zamíchej(pole);
  počty[pole.join('')]++;
}

// zobrazíme počty všech možných permutací
for (let klíč in počty) {
  alert(`${klíč}: ${počty[klíč]}`);
}
```

Příklad výsledku (závisí na enginu JS):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Jasně vidíme odchylku: `123` a `213` se objevují mnohem častěji než ostatní.

Výsledek kódu se může u jednotlivých JavaScriptových enginů lišit, ale už vidíme, že tento přístup je nespolehlivý.

Proč to nefunguje? Zhruba řečeno, `sort` je „černá skříňka“: vhodíme do ní pole a porovnávací funkci a očekáváme, že pole bude seřazeno. Kvůli naprosté náhodnosti řazení se však černá skříňka zblázní. To, jak přesně se zblázní, závisí na konkrétní implementaci, která se mezi jednotlivými enginy liší.

Existují jiné dobré způsoby, jak tuto úlohu vyřešit. Například existuje skvělý algoritmus nazvaný [Fisher-Yatesovo míchání](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Myšlenkou je procházet pole v obráceném pořadí a vyměnit každý prvek s jiným prvkem před ním, náhodně vybraným:

```js
function zamíchej(pole) {
  for (let i = pole.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // náhodný index od 0 do i

    // vyměníme prvky pole[i] a pole[j]
    // k dosažení tohoto použijeme syntaxi „destrukturačního přiřazení“
    // podrobnosti o této syntaxi najdete v dalších kapitolách
    // totéž lze zapsat jako:
    // let t = pole[i]; pole[i] = pole[j]; pole[j] = t
    [pole[i], pole[j]] = [pole[j], pole[i]];
  }
}
```

Otestujme to stejným způsobem:

```js run
function zamíchej(pole) {
  for (let i = pole.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [pole[i], pole[j]] = [pole[j], pole[i]];
  }
}

// spočítáme výskyty všech možných permutací
let počty = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let pole = [1, 2, 3];
  zamíchej(pole);
  počty[pole.join('')]++;
}

// zobrazíme počty všech možných permutací
for (let klíč in počty) {
  alert(`${klíč}: ${počty[klíč]}`);
}
```

Příklad výstupu:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Nyní to vypadá dobře: všechny permutace se objevují se stejnou pravděpodobností.

Navíc je Fisher-Yatesův algoritmus mnohem méně náročný na výkon, jelikož v něm není žádné „řazení“.