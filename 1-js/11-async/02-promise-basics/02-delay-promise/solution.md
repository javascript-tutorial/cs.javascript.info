```js run
function čekej(ms) {
  return new Promise(splň => setTimeout(splň, ms));
}

čekej(3000).then(() => alert('spustí se za 3 sekundy'));
```

Prosíme všimněte si, že v této úloze je `splň` voláno bez argumentů. Z funkce `čekej` nevracíme žádnou hodnotu, jen zajistíme čekání.
