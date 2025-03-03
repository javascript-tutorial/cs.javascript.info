
# Generátor pseudonáhodných čísel

Je mnoho oblastí, v nichž potřebujeme náhodná data.

Jedna z nich je testování. Můžeme potřebovat náhodná data: texty, čísla atd., abychom vše pečlivě otestovali.

V JavaScriptu můžeme použít `Math.random()`. Pokud se však něco pokazí, rádi bychom měli možnost tento test zopakovat s přesně stejnými daty.

K tomu se používají tzv. „generátory pseudonáhodných čísel se semínkem". Vezmou „semínko“, první hodnotu, a pak generují další hodnoty podle nějakého vzorce tak, že stejné semínko vydá stejnou posloupnost, takže celý běh je snadno reprodukovatelný. Abychom jej zopakovali, stačí nám pamatovat si semínko.

Příklad takového vzorce, který generuje zhruba rovnoměrně rozložené hodnoty:

```
další = předchozí * 16807 % 2147483647
```

Pokud jako semínko použijeme `1`, hodnoty budou:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...a tak dále...

Úkolem je vytvořit generátorovou funkci `pseudonáhodné(semínko)`, která vezme `semínko` a vytvoří generátor s tímto vzorcem.

Příklad použití:

```js
let generátor = pseudonáhodné(1);

alert(generátor.next().value); // 16807
alert(generátor.next().value); // 282475249
alert(generátor.next().value); // 1622650073
```
