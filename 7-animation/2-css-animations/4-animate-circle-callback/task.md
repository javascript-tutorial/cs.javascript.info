
# Animovaný kruh s callbackem

V úloze <info:task/animate-circle> je zobrazen animovaný zvětšující se kruh.

Nyní řekněme, že potřebujeme nejen kruh, ale také zobrazit v něm zprávu. Tato zpráva by se měla objevit až *po* skončení animace (když má kruh plnou velikost), jinak by vypadala ošklivě.

V řešení předchozí úlohy funkce `zobrazKruh(cx, cy, poloměr)` zobrazila kruh, ale neumožnila nijak zjistit, zda je kruh připraven.

Přidejte argument s callbackem: `zobrazKruh(cx, cy, poloměr, callback)`, který se bude volat, až bude animace dokončena. Tento `callback` by měl jako argument přijímat `<div>` s kruhem.

Příklad:

```js
zobrazKruh(150, 150, 100, div => {
  div.classList.add('zpráva-kruh');
  div.append("Ahoj, světe!");
});
```

Ukázka:

[iframe src="solution" height=260]

Vyjděte z řešení úlohy <info:task/animate-circle>.
