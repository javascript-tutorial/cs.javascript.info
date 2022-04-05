Stručná odpověď zní: **ne, nejsou ekvivalentní**:

Rozdíl je v tom, že pokud ve `f1` nastane chyba, je zde ošetřena funkcí `.catch`:

```js run
příslib
  .then(f1)
  .catch(f2);
```

...Ale zde ne:

```js run
příslib
  .then(f1, f2);
```

Je to proto, že chyba je předána skrz řetěz, ale ve druhém uvedeném kódu není za `f1` žádný řetěz.

Jinými slovy, `.then` předá výsledky/chyby dalšímu `.then/catch`. V prvním příkladu je tedy níže `catch`, ale ve druhém není, takže chyba zůstane neošetřena.
