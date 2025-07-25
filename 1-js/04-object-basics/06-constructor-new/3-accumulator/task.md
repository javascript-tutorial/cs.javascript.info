importance: 5

---

# Vytvořte nový Akumulátor

Vytvořte konstruktor `Akumulátor(počátečníHodnota)`.

Objekt, který je tímto konstruktorem vytvořen, by měl:

- Ukládat „aktuální hodnotu“ do vlastnosti `hodnota`. Počáteční hodnota se nastaví na argument konstruktoru `počátečníHodnota`.
- Metoda `načti()` by se měla pomocí `prompt` zeptat na nové číslo a přičíst je k vlastnosti `hodnota`.

Jinými slovy, vlastnost `hodnota` bude součet všech uživatelem zadaných hodnot a úvodní hodnoty `počátečníHodnota`.

Zde je ukázka kódu:

```js
let akumulátor = new Akumulátor(1); // počáteční hodnota 1

akumulátor.načti(); // přičte uživatelem zadanou hodnotu
akumulátor.načti(); // přičte uživatelem zadanou hodnotu

alert(akumulátor.hodnota); // zobrazí součet těchto hodnot
```

[demo]
