importance: 5

---

# Najděte okenní souřadnice hřiště

V následujícím rámu vidíte dokument obsahující zelené „hřiště“.

Pomocí JavaScriptu najděte okenní souřadnice rohů, na které ukazují šipky.

V dokumentu je pro usnadnění implementován drobný prvek. Po kliknutí na kterékoli místo se zobrazí jeho souřadnice.

[iframe border=1 height=360 src="source" link edit]

Váš kód by měl pomocí DOMu zjistit okenní souřadnice:

1. Vnějšího levého horního rohu (to je jednoduché).
2. Vnějšího pravého dolního rohu (i to je jednoduché).
3. Vnitřního levého horního rohu (trochu těžší).
4. Vnitřního pravého dolního rohu (je několik způsobů, vyberte si jeden).

Souřadnice, které vypočítáte, by měly být stejné jako ty, které se vrátí po kliknutí myší.

P.S. Kód by měl fungovat i pro element, který má jinou velikost nebo ohraničení, neměl by být vázán na pevné hodnoty.
