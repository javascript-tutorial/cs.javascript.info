
Zde je vysvětlení.

1. Toto je běžné volání metody objektu.

2. Totéž, závorky tady nezmění pořadí operací, tečka je i tak první.

3. Zde máme složitější volání `(výraz)()`. Toto volání funguje tak, jako by bylo rozděleno na dva řádky:

    ```js no-beautify
    f = obj.jdi; // vypočítáme výraz
    f();         // zavoláme to, co máme
    ```

    Zde se `f()` spustí jako funkce bez `this`.

4. Podobně jako `(3)`, nalevo od závorek `()` máme výraz.

Abychom vysvětlili chování `(3)` a `(4)`, musíme si vzpomenout, že operátory přístupu k vlastnostem (tečka nebo hranaté závorky) vracejí hodnotu referenčního typu.

Jakákoli operace na ní kromě volání metody (např. přiřazení `=`, nebo `||`) ji změní na obyčejnou hodnotu, která neobsahuje informaci umožňující nastavit `this`.

