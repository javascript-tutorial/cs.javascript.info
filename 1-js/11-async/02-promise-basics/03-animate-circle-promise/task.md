
# Animovaný kruh s příslibem

Přepište funkci `zobrazKruh` v řešení úlohy <info:task/animate-circle-callback> tak, aby místo přijímání callbacku vracela příslib.

Nové použití:

```js
zobrazKruh(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Ahoj, světe!");
});
```

Jako základ vezměte řešení úlohy <info:task/animate-circle-callback>.
