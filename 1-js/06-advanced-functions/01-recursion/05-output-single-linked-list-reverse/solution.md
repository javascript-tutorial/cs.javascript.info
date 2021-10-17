# Pomocí rekurze

Logika rekurze je tady trochu ošidná.

Nejprve potřebujeme vypsat zbytek seznamu a až *potom* vypíšeme aktuální prvek:

```js run
let seznam = {
  hodnota: 1,
  další: {
    hodnota: 2,
    další: {
      hodnota: 3,
      další: {
        hodnota: 4,
        další: null
      }
    }
  }
};

function vypišSeznamObráceně(seznam) {

  if (seznam.další) {
    vypišSeznamObráceně(seznam.další);
  }

  alert(seznam.hodnota);
}

vypišSeznamObráceně(seznam);
```

# Pomocí cyklu

Také cyklová varianta je trochu složitější než přímý výpis.

Není žádný způsob, jak získat poslední hodnotu našeho `seznamu`. Nemůžeme se také „vracet“.

To, co můžeme udělat jako první, je tedy projít všechny prvky v přímém pořadí, zapamatovat si je v poli a pak vypsat to, co jsme si zapamatovali, v obráceném pořadí:

```js run
let seznam = {
  hodnota: 1,
  další: {
    hodnota: 2,
    další: {
      hodnota: 3,
      další: {
        hodnota: 4,
        další: null
      }
    }
  }
};

function vypišSeznamObráceně(seznam) {
  let pole = [];
  let tmp = seznam;

  while (tmp) {
    pole.push(tmp.hodnota);
    tmp = tmp.další;
  }

  for (let i = pole.length - 1; i >= 0; i--) {
    alert( pole[i] );
  }
}

vypišSeznamObráceně(seznam);
```

Prosíme všimněte si, že rekurzívní řešení dělá ve skutečnosti přesně totéž: prochází seznam, pamatuje si prvky v řetězci vnořených volání (v zásobníku prováděcích kontextů) a pak je vypisuje.
