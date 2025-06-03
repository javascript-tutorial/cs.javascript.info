importance: 4

---

# Relativní formátování data

Napište funkci `formátujDatum(datum)`, která by měla formátovat `datum` následovně:

- Jestliže od okamžiku `datum` uplynula méně než 1 sekunda, pak `"právě teď"`.
- Jinak jestliže od `datum` uplynula méně než 1 minuta, pak `"před n s"`.
- Jinak jestliže uplynula méně než hodina, pak `"před m min."`.
- Jinak úplné datum ve formátu `"DD.MM.RR HH:mm"`, tedy: `"den.měsíc.rok hodiny:minuty"`, vše v 2-číslicovém formátu, např. `31.12.16 10:00`.

Příklad:

```js
alert( formátujDatum(new Date(new Date - 1)) ); // "právě teď"

alert( formátujDatum(new Date(new Date - 30 * 1000)) ); // "před 30 s"

alert( formátujDatum(new Date(new Date - 5 * 60 * 1000)) ); // "před 5 min."

// včerejší datum ve formátu 31.12.16 20:00
alert( formátujDatum(new Date(new Date - 86400 * 1000)) );
```
