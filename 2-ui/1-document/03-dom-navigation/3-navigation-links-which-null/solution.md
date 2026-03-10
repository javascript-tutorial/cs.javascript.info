1. Ano, to je pravda. Element `elem.lastChild` je vždy poslední a nemá žádného dalšího sourozence `nextSibling`.
2. Ne, to není pravda, protože `elem.children[0]` je prvním dítětem *mezi elementy*. Před ním však mohou existovat uzly, které nejsou elementy, takže `previousSibling` může být textový uzel.

Prosíme všimněte si, že v obou případech nastane chyba, jestliže element nemá žádné děti.

Pokud nemá žádné děti, `elem.lastChild` je `null`, takže nemůžeme přistupovat k `elem.lastChild.nextSibling`. A kolekce `elem.children` je prázdná (podobná prázdnému poli `[]`).
