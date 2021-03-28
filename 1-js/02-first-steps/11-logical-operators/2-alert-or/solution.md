Odpověď zní: nejprve `1`, pak `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Volání `alert` nevrátí žádnou hodnotu, jinými slovy vrátí `undefined`.

1. První OR `||` vyhodnotí svůj levý operand `alert(1)`. Ten zobrazí první zprávu obsahující `1`.
2. Tento `alert` vrátí `undefined`, takže OR ve svém hledání pravdivé hodnoty přejde ke druhému operandu.
3. Druhý operand `2` je pravdivý, takže vyhodnocení operátoru se zastaví, vrátí `2` a to je pak zobrazeno vnějším `alert`em.

Nezobrazí se `3`, protože vyhodnocení se k `alert(3)` nedostane.
