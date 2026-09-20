
Výsledek je: `match:123 4`.

Nejprve se liknavý `pattern:\d+?` snaží vzít co nejméně číslic, ale musí dorazit k mezeře, takže vezme `match:123`.

Pak druhý `\d+?` vezme pouze jednu číslici, protože to stačí.
