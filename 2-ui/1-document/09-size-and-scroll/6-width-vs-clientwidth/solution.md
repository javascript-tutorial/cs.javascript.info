Rozdíly:

1. `clientWidth` je číslo, zatímco `getComputedStyle(elem).width` vrátí řetězec obsahující `px` na konci.
2. `getComputedStyle` může u elementu uvedeného přímo v HTML vrátit nečíselnou šířku, např. `"auto"`.
3. `clientWidth` je vnitřní plocha obsahu elementu plus vnitřní okraje, zatímco CSS šířka (při standardním `box-sizing`) je vnitřní plocha obsahu *bez vnitřních okrajů*.
4. Jestliže v elementu je posuvník a prohlížeč si pro něj vyhradí místo, některé prohlížeče toto místo odečítají od CSS šířky (protože už není k dispozici pro obsah) a jiné ne. Vlastnost `clientWidth` je však vždy stejná: pokud je místo rezervováno, velikost posuvníku je odečtena.
