Tato úloha ukazuje, jak může prefixová a postfixová notace vést k rozdílným výsledkům, když je použijeme v porovnání.

1. **Od 1 do 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    První hodnota je `i = 1`, jelikož `++i` nejprve zvýší `i` a pak vrátí novou hodnotu. První porovnání je tedy `1 < 5` a `alert` zobrazí `1`.

    Následují `2, 3, 4…` -- hodnoty se zobrazí jedna po druhé. Porovnání se vždy dívá na zvýšenou hodnotu, protože `++` je před proměnnou.

    Nakonec `i = 4` se zvýší na `5`, porovnání `while(5 < 5)` neuspěje a cyklus skončí. Takže `5` se nezobrazí.
    
2. **Od 1 do 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    První hodnota je opět `i = 1`. Postfixová notace `i++` zvýší `i` a pak vrátí *starou* hodnotu, takže porovnání `i++ < 5` se dívá na `i = 0` (na rozdíl od `++i < 5`).

    Avšak `alert` se volá odděleně. Je to další příkaz, který se spustí až po zvýšení a porovnání. Proto obdrží aktuální `i = 1`.

    Následují `2, 3, 4…`

    Zastavme se u `i = 4`. Prefixová forma `++i` by je zvýšila a v porovnání by použila `5`. Tady však máme postfixovou formu `i++`. Ta zvýší `i` na `5`, ale vrátí starou hodnotu. Proto se provede porovnání `while(4 < 5)` -- pravda, tudíž řízení přejde k `alert`.

    Hodnota `i = 5` je poslední, jelikož další krok `while(5 < 5)` dává nepravdu.
