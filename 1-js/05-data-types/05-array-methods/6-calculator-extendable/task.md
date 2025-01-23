importance: 5

---

# Vytvořte rozšiřitelný kalkulátor

Vytvořte konstruktor `Kalkulátor`, který bude vytvářet „rozšiřitelné“ objekty kalkulátoru.

Úloha se skládá ze dvou částí.


1. Nejprve implementujte metodu `vypočítej(řetězec)`, která obdrží řetězec, např. `"1 + 2"`, ve formátu „ČÍSLO operátor ČÍSLO“ (oddělené mezerou) a vrátí výsledek. Měla by rozumět plusu `+` a minusu `-`.

    Příklad použití:

    ```js
    let kalkulátor = new Kalkulátor;

    alert( kalkulátor.vypočítej("3 + 7") ); // 10
    ```
2. Pak přidejte metodu `přidejMetodu(název, funkce)`, která naučí kalkulátor nové operaci. Obdrží operátor `název` a funkci o dvou argumentech `funkce(a, b)`, která jej implementuje.

    Například přidáme násobení`*`, dělení `/` a umocňování `**`:

    ```js
    let silnýKalkulátor = new Kalkulátor;
    silnýKalkulátor.přidejMetodu("*", (a, b) => a * b);
    silnýKalkulátor.přidejMetodu("/", (a, b) => a / b);
    silnýKalkulátor.přidejMetodu("**", (a, b) => a ** b);

    let výsledek = silnýKalkulátor.vypočítej("2 ** 3");
    alert( výsledek ); // 8
    ```

- V této úloze nejsou závorky ani složité výrazy.
- Čísla a operátor jsou oddělena právě jednou mezerou.
- Pokud chcete přidat ošetřování chyb, můžete.
