Odpověď zní: **Petr**.

Funkce `pracuj()` uvedená v následujícím kódu načte `jméno` z místa svého vzniku odkazem na vnější lexikální prostředí:

![](lexenv-nested-work.svg)

Výsledkem zde je tedy `"Petr"`.

Kdyby však ve funkci `vytvořPracovníka()` nebylo `let jméno`, pak by hledání pokračovalo dál ven a převzalo globální proměnnou, jak vidíme v uvedeném řetězci. V tom případě by výsledek byl `"Jan"`.
