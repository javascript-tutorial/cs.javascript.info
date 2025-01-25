importance: 4

---

# Filtrace anagramů

[Anagramy](https://cs.wikipedia.org/wiki/Anagram) neboli přesmyčky jsou slova, která obsahují stejné počty stejných písmen, ale v jiném pořadí.

Příklad:

```
rak - kra
kostel - stolek
reklama - makrela - karamel
```

Napište funkci `odstraňAnagramy(pole)`, která vrátí pole zbavené anagramů.

Příklad:

```js
let pole = ["rak", "reklama", "makrela", "KRA", "kostel", "stolek", "karamel"];

alert( odstraňAnagramy(pole) ); // "rak,karamel,kostel" nebo "KRA,makrela,stolek"
```

Z každé skupiny přesmyček by mělo zbýt pouze jedno slovo. Nezáleží na tom, které.
