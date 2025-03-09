Ano, určitě to vypadá podivně.

Ale `instanceof` se nezajímá o funkci, nýbrž jen o její `prototype`, který porovnává s prototypovým řetězcem.

A zde je `a.__proto__ == B.prototype`, takže `instanceof` vrátí `true`.

Podle logiky `instanceof` je tedy typ ve skutečnosti definován vlastností `prototype`, ne samotným konstruktorem.
