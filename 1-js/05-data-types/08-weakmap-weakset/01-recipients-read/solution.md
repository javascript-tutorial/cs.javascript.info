Uložme přečtené zprávy do `WeakSet`:

```js run
let zprávy = [
  {text: "Ahoj", od: "Jan"},
  {text: "Jak se máš?", od: "Jan"},
  {text: "Brzy se uvidíme", od: "Alice"}
];

let přečtenéZprávy = new WeakSet();

// dvě zprávy byly přečteny
přečtenéZprávy.add(zprávy[0]);
přečtenéZprávy.add(zprávy[1]);
// přečtenéZprávy obsahuje 2 prvky

// ...znovu přečteme první zprávu!
přečtenéZprávy.add(zprávy[0]);
// přečtenéZprávy stále obsahuje 2 unikátní prvky

// odpověď: byla zpráva s indexem 0 přečtena?
alert("Zpráva 0 přečtena: " + přečtenéZprávy.has(zprávy[0])); // true

zprávy.shift();
// nyní přečtenéZprávy obsahuje 1 prvek (technicky může být paměť vyčištěna později)
```

`WeakSet` nám umožňuje uložit množinu zpráv a snadno ověřovat přítomnost zprávy v ní.

Automaticky se vyčistí. Nevýhodou je, že nad ní nemůžeme iterovat, nemůžeme získat „všechny přečtené zprávy“ přímo z ní. Můžeme to však udělat iterací nad všemi zprávami a filtrováním těch, které nejsou v této množině.

Jiným řešením by bylo přidání vlastnosti, např. `zpráva.jePřečtena=true`, do zprávy poté, co bude přečtena. Protože objekty zpráv spravuje jiný kód, obecně se to nedoporučuje, ale můžeme se vyhnout konfliktům použitím symbolické vlastnosti.

Třeba takto:
```js
// symbolickou vlastnost zná pouze náš kód
let jePřečtena = Symbol("jePřečtena");
zprávy[0][jePřečtena] = true;
```

Nyní kód třetí strany naši přidanou vlastnost neuvidí.

Přestože symboly mohou snížit pravděpodobnost problémů, z architektonického hlediska je lepší použít `WeakSet`.