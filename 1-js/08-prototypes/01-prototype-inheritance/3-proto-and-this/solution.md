**Odpověď zní: `králík`.**

Je to proto, že `this` je objekt před tečkou, takže `králík.žer()` změní objekt `králík`.

Hledání vlastnosti a spouštění metody jsou dvě různé věci.

Metoda `králík.žer` je nejprve nalezena v prototypu a pak je spuštěna s `this=králík`.
