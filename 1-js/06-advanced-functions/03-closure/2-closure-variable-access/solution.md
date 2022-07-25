Odpověď zní: **Petr**.

Funkce `pracuj()` uvedená v kódu níže načte `jméno` z místa svého vzniku skrz odkaz na vnější lexikální prostředí:

![](lexenv-nested-work.svg)

Výsledkem zde je tedy `"Petr"`.

Kdyby však ve funkci `vytvořPracovníka()` nebylo `let jméno`, pak by hledání pokračovalo dál ven a převzalo globální proměnnou, jak vidíme z výše uvedeného řetězce. V tom případě by výsledek byl `"Jan"`.
