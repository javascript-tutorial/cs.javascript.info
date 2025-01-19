
# Čekání s příslibem

Vestavěná funkce `setTimeout` používá callbacky. Vytvořte alternativu založenou na příslibech.

Funkce `čekej(ms)` by měla vrátit příslib. Tento příslib by se měl splnit za `ms` milisekund, takže do něj můžeme přidat `.then`, například:

```js
function čekej(ms) {
  // váš kód
}

čekej(3000).then(() => alert('spustí se za 3 sekundy'));
```
