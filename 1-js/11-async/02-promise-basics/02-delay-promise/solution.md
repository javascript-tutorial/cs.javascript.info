```js run
function čekej(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

čekej(3000).then(() => alert('spustí se za 3 sekundy'));
```

Prosíme všimněte si, že v této úloze je `resolve` voláno bez argumentů. Z funkce `čekej` nevracíme žádnou hodnotu, jen zajistíme čekání.
