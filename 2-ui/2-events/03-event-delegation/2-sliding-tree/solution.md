Řešení se skládá ze dvou částí.

1. Zabalíme titulek každého uzlu stromu do `<span>`. Pak na nich můžeme nastavit CSS styl na `:hover` a zpracovávat kliknutí přímo na text, protože šířka `<span>` je přesně šířka textu (na rozdíl od značky bez něj).
2. Nastavíme handler kořenovému uzlu `strom` a budeme zpracovávat kliknutí na tyto titulky `<span>`.
