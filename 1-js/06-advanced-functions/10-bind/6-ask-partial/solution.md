1.  Buď použijeme obalovou funkci, pro stručnost šipkovou:

    ```js 
    zeptejSeNaHeslo(() => uživatel.přihlaš(true), () => uživatel.přihlaš(false)); 
    ```

    Nyní načte proměnnou `uživatel` z vnějších proměnných a funguje běžným způsobem.

2.  Nebo vytvoříme částečnou funkci z `uživatel.přihlaš`, která používá `uživatel` jako kontext a má příslušný první argument:


    ```js 
    zeptejSeNaHeslo(uživatel.přihlaš.bind(uživatel, true), uživatel.přihlaš.bind(uživatel, false)); 
    ```
