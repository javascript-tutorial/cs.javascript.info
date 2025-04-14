importance: 4

---

# Filtrace podle rozsahu

Napište funkci `filtrujPodleRozsahu(pole, a, b)`, která obdrží pole `pole`, najde prvky, jejichž hodnoty jsou vyšší nebo rovny `a` a nižší nebo rovny `b` a vrátí výsledek jako pole.

Funkce by neměla pole modifikovat. Měla by vrátit nové pole.

Příklad:

```js
let pole = [5, 3, 8, 1];

let filtrovanéPole = filtrujPodleRozsahu(pole, 1, 4); 

alert( filtrovanéPole ); // 3,1 (odpovídající hodnoty)

alert( pole ); // 5,3,8,1 (nezměněno)
```

