# Řešení pomocí cyklu

Varianta řešení pomocí cyklu:

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

function vypišSeznam(seznam) {
  let tmp = seznam;

  while (tmp) {
    alert(tmp.hodnota);
    tmp = tmp.další;
  }

}

vypišSeznam(seznam);
```

Prosíme všimněte si, že k procházení seznamem používáme dočasnou proměnnou `tmp`. Technicky bychom místo ní mohli použít parametr funkce `seznam`:

```js
function vypišSeznam(seznam) {

  while(*!*seznam*/!*) {
    alert(seznam.hodnota);
    seznam = seznam.další;
  }

}
```

...To by však nebylo moudré. V budoucnosti možná budeme potřebovat funkci rozšířit a provádět se seznamem i něco jiného. Pokud změníme `seznam`, o tuto možnost přijdeme.

Když mluvíme o dobrých názvech proměnných, `seznam` zde je samotný seznam. Jeho první prvek. A tak by to mělo zůstat. Je to čisté a zodpovědné.

Na druhou stranu role `tmp` je výhradně procházení seznamu, podobně jako `i` v cyklu `for`.

# Rekurzívní řešení

Rekurzívní varianta `vypišSeznam(seznam)` sleduje jednoduchou logiku: pro vypsání seznamu bychom měli vypsat aktuální prvek `seznam`, pak učinit totéž pro `seznam.další`:

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

function vypišSeznam(seznam) {

  alert(seznam.hodnota); // vypíše aktuální řádek

  if (seznam.další) {
    vypišSeznam(seznam.další); // učiní totéž pro zbytek seznamu
  }

}

vypišSeznam(seznam);
```

Které řešení je nyní lepší?

Technicky je cyklus efektivnější. Obě varianty dělají totéž, ale cyklus nespotřebovává zdroje pro vnořená volání funkce.

Na druhou stranu je rekurzívní varianta kratší a někdy je snadnější jí porozumět.
