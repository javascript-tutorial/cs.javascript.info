
# Referenční typ

```warn header="Hlubší vlastnost jazyka"
Tento článek se zabývá pokročilým tématem, abychom lépe porozuměli určitým okrajovým případům.

Toto téma není důležité. Mnoho zkušených vývojářů žije šťastně i bez jeho znalosti. Článek si přečtěte, pokud chcete vědět, jak fungují věci „pod kapotou“.
```

Dynamicky vyhodnocované volání metody může ztratit `this`.

Například:

```js run
let uživatel = {
  jméno: "Jan",
  ahoj() { alert(this.jméno); },
  nashle() { alert("Nashle"); }
};

uživatel.ahoj(); // funguje

// nyní podle jména zavolejme uživatel.ahoj nebo uživatel.nashle
*!*
(uživatel.jméno == "Jan" ? uživatel.ahoj : uživatel.nashle)(); // Chyba!
*/!*
```

Na posledním řádku je podmíněný operátor, který vybere buď `uživatel.ahoj`, nebo `uživatel.nashle`. V tomto případě je výsledek `uživatel.ahoj`.

Pak je tato metoda okamžitě volána pomocí závorek `()`. Ale nefunguje to správně!

Jak vidíte, výsledkem volání je chyba, protože hodnota `"this"` uvnitř volání se stala `undefined`.

Tohle funguje (objekt tečka metoda):
```js
uživatel.ahoj();
```

Tohle ne (vyhodnocená metoda):
```js
(uživatel.jméno == "Jan" ? uživatel.ahoj : uživatel.nashle)(); // Chyba!
```

Proč? Chceme-li porozumět, proč se to děje, podívejme se na zoubek tomu, jak funguje volání `obj.metoda()`.

## Vysvětlení referenčního typu

Když se podíváme pozorněji, můžeme si v příkazu `obj.metoda()` všimnout dvou operací:

1. Nejprve tečka `'.'` získá vlastnost `obj.metoda`.
2. Pak ji závorky `()` spustí.

Jak se tedy informace o `this` předá z první části do druhé?

Umístíme-li tyto operace na samostatné řádky, pak bude `this` zcela jistě ztraceno:

```js run
let uživatel = {
  jméno: "Jan",
  ahoj() { alert(this.jméno); }
}

*!*
// rozdělíme získání a volání metody na dva řádky
let ahoj = uživatel.ahoj;
ahoj(); // Chyba, protože this je undefined
*/!*
```

Zde `ahoj = uživatel.ahoj` vloží funkci do proměnné a ta je pak na posledním řádku zcela samostatná, takže tam není žádné `this`.

**Aby volání `uživatel.ahoj()` fungovalo, JavaScript používá trik -- tečka `'.'` nevrací funkci, ale hodnotu speciálního [referenčního typu](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

Referenční typ je „specifikační typ“. Nemůžeme jej explicitně používat, ale je používán vnitřně jazykem.

Hodnotou referenčního typu je tříhodnotová kombinace `(base, name, strict)`, kde:

- `base` (základ) je objekt.
- `name` (název) je název vlastnosti.
- `strict` (striktní) je true, pokud je použito `use strict`.

Výsledkem přístupu k vlastnosti `uživatel.ahoj` není funkce, ale hodnota referenčního typu. Pro `uživatel.ahoj` ve striktním režimu to je:

```js
// hodnota referenčního typu
(uživatel, "ahoj", true)
```

Když se na referenčním typu zavolají závorky `()`, obdrží úplnou informaci o objektu a jeho metodě a mohou tedy nastavit správné `this` (v tomto případě `uživatel`).

Referenční typ je speciální „zprostředkovatelský“ interní typ, jehož účelem je předat informaci z tečky `.` volajícím závorkám `()`.

Jakákoli jiná operace, např. přiřazení `ahoj = uživatel.ahoj`, celý referenční typ zahodí, vezme hodnotu `uživatel.ahoj` (funkci) a předá ji dál. Jakákoli další operace tedy „ztratí“ `this`.

Výsledkem tedy je, že hodnota `this` se předá správně jen tehdy, je-li funkce volána přímo pomocí syntaxe tečky `obj.metoda()` nebo hranatých závorek `obj['metoda']()` (obojí zde provádí totéž). Existují různé způsoby, jak tento problém vyřešit, např. [funkce.bind()](/bind#solution-2-bind).

## Shrnutí

Referenční typ je interní jazykový typ.

Načtení vlastnosti, např. pomocí tečky `.` v `obj.metoda()`, nevrací přesně hodnotu vlastnosti, ale speciální hodnotu „referenčního typu“, v níž je uložena jak hodnota vlastnosti, tak objekt, z něhož byla převzata.

To je proto, aby následné volání metody `()` mohlo získat objekt a nastavit jej jako `this`.

Při všech ostatních operacích se z referenčního typu automaticky stává hodnota vlastnosti (v našem případě funkce).

Celá tato mechanika je před našima očima ukryta. Záleží na ní jen v krajních případech, například když je metoda získána z objektu dynamicky použitím výrazu.
