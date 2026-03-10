importance: 5

---

# Kalkulátor vkladů

Vytvořte rozhraní, které umožní vložit výši bankovního vkladu a procentuální úrok. Pak vypočítá, kolik budeme mít po zadaném časovém období.

Zde je demo:

[iframe src="solution" height="350" border="1"]

Každá změna ve vstupu by měla být okamžitě zpracována.

Vzorec je následující:
```js
// počátek: počáteční peněžní suma
// úrok: např. 0.05 znamená 5% ročně
// roky: kolik let chceme čekat
let výsledek = Math.round(počátek * (1 + úrok) ** roky);
```
