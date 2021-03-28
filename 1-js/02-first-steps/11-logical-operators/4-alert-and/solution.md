Odpověď zní: nejprve `1`, pak `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Volání `alert` vrátí `undefined` (funkce jen zobrazí zprávu, takže její návratová hodnota nemá žádný význam).

Proto `&&` vyhodnotí první operand (vypíše `1`) a okamžitě se zastaví, protože `undefined` je nepravdivá hodnota. Operátor `&&` hledá první nepravdivou hodnotu a vrátí ji, takže je hotov.
