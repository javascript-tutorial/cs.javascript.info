importance: 5

---

# Klauzule finally nebo jen kód?

Porovnejte si tyto dva fragmenty kódu.

1. První používá `finally` ke spuštění kódu po `try...catch`:

    ```js
    try {
      pracuj pracuj
    } catch (chyba) {
      ošetření chyb
    } finally {
    *!*
      úklid pracovního prostoru
    */!*
    }
    ```
2. Druhý fragment umisťuje úklid hned za `try...catch`:

    ```js
    try {
      pracuj pracuj
    } catch (chyba) {
      ošetření chyb
    }

    *!*
    úklid pracovního prostoru
    */!*
    ```

Úklid po práci potřebujeme provést v každém případě, ať už nastala chyba nebo ne.

Je zde nějaká výhoda v použití `finally`, nebo jsou oba fragmenty kódu rovnocenné? Pokud je nějaká výhoda, vymyslete příklad, v němž se projeví.
