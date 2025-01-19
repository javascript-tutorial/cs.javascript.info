# Vlastní chyby, rozšíření třídy Error

Když něco vyvíjíme, často potřebujeme, aby naše vlastní chybové třídy odrážely specifické věci, které se v našich úlohách mohou pokazit. Pro chyby v síťových operacích můžeme potřebovat třídu `ChybaHttp`, pro databázové operace `ChybaDb`, pro operace hledání `ChybaNenalezeno` a tak dále.

Naše chyby by měly podporovat základní vlastnosti chyb jako `message`, `name` a pokud možno `stack`. Mohou však mít i jiné, své vlastní vlastnosti, např. objekty třídy `ChybaHttp` mohou mít vlastnost `stavovýKód` s hodnotami jako `404` nebo `403` nebo `500`.

JavaScript nám umožňuje používat `throw` s libovolným argumentem, takže technicky naše vlastní chybové třídy nemusejí dědit ze třídy `Error`. Pokud z ní však dědíme, bude možné k identifikaci chybových objektů používat `obj instanceof Error`. Je tedy lepší z ní dědit.

Když aplikace poroste, naše vlastní chyby budou přirozeně tvořit hierarchii. Například `ChybaHttpTimeout` může dědit z `ChybaHttp` a tak dále.

## Rozšiřování třídy Error

Jako příklad uvažujme funkci `načtiUživatele(json)`, která by měla načíst JSON s uživatelskými daty.

Zde je příklad, jak může vypadat platný `json`:
```js
let json = `{ "jméno": "Jan", "věk": 30 }`;
```

Interně použijeme `JSON.parse`. Jestliže obdrží poškozený `json`, vyvolá `SyntaxError`. Ale i když je `json` syntakticky správně, neznamená to, že obsahuje platného uživatele, že? Mohou v něm chybět nezbytná data. Například nemusí obsahovat vlastnosti `jméno` a `věk`, které jsou pro naše uživatele nezbytné.

Naše funkce `načtiUživatele(json)` tedy nebude jenom načítat JSON, ale také ověřovat („validovat“) data. Pokud v nich nebudou požadovaná pole nebo formát nebude správný, nastane chyba. A nebude to `SyntaxError`, protože data jsou syntakticky správně, ale chyba jiného druhu. Nazveme ji `ChybaValidace` a vytvoříme pro ni třídu. Chyba tohoto druhu by měla obsahovat také informaci o vadném poli.

Naše třída `ChybaValidace` by měla být zděděna ze třídy `Error`.

Třída `Error` je vestavěná, ale zde je její přibližný kód, abychom porozuměli tomu, co rozšiřujeme:

```js
// „Pseudokód“ pro vestavěnou třídu Error definovanou samotným JavaScriptem
class Error {
  constructor(zpráva) {
    this.message = zpráva;
    this.name = "Error"; // (různé názvy pro různé vestavěné chybové třídy)
    this.stack = <zásobník volání>; // nestandardní, ale většina prostředí jej podporuje
  }
}
```

Nyní z ní zděďme třídu `ChybaValidace` a vyzkoušejme ji v akci:

```js run
*!*
class ChybaValidace extends Error {
*/!*
  constructor(zpráva) {
    super(zpráva); // (1)
    this.name = "ChybaValidace"; // (2)
  }
}

function test() {
  throw new ChybaValidace("Ouha!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Ouha!
  alert(err.name); // ChybaValidace
  alert(err.stack); // seznam vnořených volání s číslem řádku u každého
}
```

Prosíme všimněte si: na řádku `(1)` zavoláme rodičovský konstruktor. JavaScript vyžaduje, abychom v konstruktoru potomka volali `super`, takže to je povinné. Rodičovský konstruktor nastaví vlastnost `message`.

Rodičovský konstruktor také nastaví vlastnost `name` na `"Error"`, takže ji na řádku `(2)` přenastavíme na správnou hodnotu.

Použijme chybu v metodě `načtiUživatele(json)`:

```js run
class ChybaValidace extends Error {
  constructor(zpráva) {
    super(zpráva);
    this.name = "ChybaValidace";
  }
}

// Použití
function načtiUživatele(json) {
  let uživatel = JSON.parse(json);

  if (!uživatel.věk) {
    throw new ChybaValidace("Chybí pole: věk");
  }
  if (!uživatel.name) {
    throw new ChybaValidace("Chybí pole: jméno");
  }

  return uživatel;
}

// Příklad fungování s try..catch

try {
  let uživatel = načtiUživatele('{ "věk": 25 }');
} catch (chyba) {
  if (chyba instanceof ChybaValidace) {
*!*
    alert("Vadná data: " + chyba.message); // Vadná data: Chybí pole: jméno
*/!*
  } else if (chyba instanceof SyntaxError) { // (*)
    alert("Syntaktická chyba JSONu: " + chyba.message);
  } else {
    throw chyba; // neznámá chyba, vyvoláme ji znovu (**)
  }
}
```

Ve výše uvedeném kódu blok `try..catch` ošetřuje jak naši chybu `ChybaValidace`, tak vestavěnou chybu `SyntaxError` z `JSON.parse`.

Prosíme podívejte se, jak na řádku `(*)` používáme `instanceof` k ověřování specifického typu chyby.

Můžeme se podívat i do `chyba.name`, například:

```js
// ...
// místo (chyba instanceof SyntaxError)
} else if (chyba.name == "SyntaxError") { // (*)
// ...
```

Verze s `instanceof` je mnohem lepší, protože v budoucnu se chystáme třídu `ChybaValidace` rozšiřovat, vytvářet její podtypy, např. `ChybaPožadovanéVlastnosti`. A ověření pomocí `instanceof` bude fungovat i pro nově zděděné třídy. Je tedy dopředně kompatibilní.

Je také důležité, že pokud `catch` zachytí neznámou chybu, na řádku `(**)` ji opětovně vyvolá. Blok `catch` umí ošetřit jen validační a syntaktické chyby, ostatní druhy chyb (způsobené překlepem v kódu nebo jinými neznámými příčinami) by měly vypadnout dál.

## Budoucí dědičnost

Třída `ChybaValidace` je velmi obecná. Pokazit se může spousta věcí. Vlastnost může chybět nebo může být v nesprávném formátu (například řetězcová hodnota místo čísla u vlastnosti `věk`). Vytvořme tedy konkrétnější třídu `ChybaPožadovanéVlastnosti` sloužící výhradně pro případy absence vlastnosti. Bude obsahovat další informace o vlastnosti, která schází.

```js run
class ChybaValidace extends Error {
  constructor(zpráva) {
    super(zpráva);
    this.name = "ChybaValidace";
  }
}

*!*
class ChybaPožadovanéVlastnosti extends ChybaValidace {
  constructor(vlastnost) {
    super("Chybí vlastnost: " + vlastnost);
    this.name = "ChybaPožadovanéVlastnosti";
    this.vlastnost = vlastnost;
  }
}
*/!*

// Použití
function načtiUživatele(json) {
  let uživatel = JSON.parse(json);

  if (!uživatel.věk) {
    throw new ChybaPožadovanéVlastnosti("věk");
  }
  if (!uživatel.jméno) {
    throw new ChybaPožadovanéVlastnosti("jméno");
  }

  return uživatel;
}

// Příklad fungování s try..catch

try {
  let uživatel = načtiUživatele('{ "věk": 25 }');
} catch (chyba) {
  if (chyba instanceof ChybaValidace) {
*!*
    alert("Vadná data: " + chyba.message); // Vadná data: Chybí vlastnost: jméno
    alert(chyba.name); // ChybaPožadovanéVlastnosti
    alert(chyba.vlastnost); // jméno
*/!*
  } else if (chyba instanceof SyntaxError) {
    alert("Syntaktická chyba JSONu: " + chyba.message);
  } else {
    throw chyba; // neznámá chyba, vyvoláme ji znovu
  }
}
```

Používání nové třídy `ChybaPožadovanéVlastnosti` je snadné: postačí předat název vlastnosti: `new ChybaPožadovanéVlastnosti(vlastnost)`. Konstruktor vygeneruje člověkem čitelnou zprávu `message`.

Prosíme všimněte si, že `this.name` v konstruktoru `ChybaPožadovanéVlastnosti` se opět přiřazuje ručně. To může být poněkud úmorné -- přiřazovat `this.name = <název třídy>` v každé vlastní chybové třídě. Můžeme se tomu vyhnout, když si vytvoříme vlastní „základní chybovou“ třídu, která bude přiřazovat `this.name = this.constructor.name`, a pak budeme všechny naše chyby dědit z ní.

Nazvěme ji `MojeChyba`.

Zde je kód s třídou `MojeChyba` a dalšími vlastními chybovými třídami, zjednodušeně:

```js run
class MojeChyba extends Error {
  constructor(zpráva) {
    super(zpráva);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ChybaValidace extends MojeChyba { }

class ChybaPožadovanéVlastnosti extends ChybaValidace {
  constructor(vlastnost) {
    super("Chybí vlastnost: " + vlastnost);
    this.vlastnost = vlastnost;
  }
}

// název je správně
alert( new ChybaPožadovanéVlastnosti("pole").name ); // ChybaPožadovanéVlastnosti
```

Nyní jsou naše chyby, konkrétně `ChybaValidace`, mnohem kratší, jelikož jsme se zbavili řádku `"this.name = ..."` v konstruktoru.

## Wrapování výjimek

Účelem funkce `načtiUživatele` ve výše uvedeném kódu je „načíst uživatelská data“. V procesu mohou nastat chyby různých druhů. Momentálně máme `SyntaxError` a `ChybaValidace`, ale v budoucnu se funkce `načtiUživatele` může rozrůst a pravděpodobně bude generovat chyby dalších druhů.

Tyto chyby by měl ošetřovat kód, který funkci `načtiUživatele` volá. Momentálně používá v bloku `catch` několik příkazů `if`, které prozkoumají třídu, ošetří známé chyby a opětovně vyvolají neznámé.

Schéma je následující:

```js
try {
  ...
  načtiUživatele()  // potenciální zdroj chyb
  ...
} catch (chyba) {
  if (chyba instanceof ChybaValidace) {
    // ošetření validačních chyb
  } else if (chyba instanceof SyntaxError) {
    // ošetření syntaktických chyb
  } else {
    throw chyba; // neznámá chyba, vyvoláme ji znovu
  }
}
```

Ve výše uvedeném kódu vidíme dva typy chyb, ale může jich tam být víc.

Jestliže funkce `načtiUživatele` generuje chyby několika druhů, měli bychom se zeptat sami sebe: opravdu chceme pokaždé ověřovat všechny typy chyb jeden po druhém?

Často zní odpověď „ne“: chtěli bychom být „o úroveň výš nad tím vším“. Chceme vědět jen to, zda to byla „chyba načítání dat“ -- proč přesně se stala, je často nepodstatné (popisuje to chybová zpráva). Nebo, ještě lépe, bychom rádi měli způsob, jak získat podrobnosti o chybě, ale jen když je budeme potřebovat.

Technika, kterou tady popisujeme, se nazývá „wrapování výjimek“.

1. Vytvoříme novou třídu `ChybaČtení`, která bude představovat obecnou chybu „čtení dat“.
2. Funkce `načtiUživatele` bude zachytávat chyby načítání dat, které nastanou uvnitř ní, např. `ChybaValidace` a `SyntaxError`, a místo nich generovat chybu `ChybaČtení`.
3. Objekt `ChybaČtení` si ve své vlastnosti `příčina` bude udržovat odkaz na původní chybu.

Pak kód, který volá funkci `načtiUživatele`, bude muset ověřovat jen chybu `ChybaČtení`, ne každý druh chyby načítání dat. A pokud bude potřebovat podrobnosti o chybě, může se podívat na vlastnost `příčina`.

Zde je kód, který definuje `ChybaČtení` a demonstruje její použití ve funkci `načtiUživatele` a `try..catch`:

```js run
class ChybaČtení extends Error {
  constructor(zpráva, příčina) {
    super(zpráva);
    this.příčina = příčina;
    this.name = 'ChybaČtení';
  }
}

class ChybaValidace extends Error { /*...*/ }
class ChybaPožadovanéVlastnosti extends ChybaValidace { /* ... */ }

function validujUživatele(uživatel) {
  if (!uživatel.věk) {
    throw new ChybaPožadovanéVlastnosti("věk");
  }

  if (!uživatel.jméno) {
    throw new ChybaPožadovanéVlastnosti("jméno");
  }
}

function načtiUživatele(json) {
  let uživatel;

  try {
    uživatel = JSON.parse(json);
  } catch (chyba) {
*!*
    if (chyba instanceof SyntaxError) {
      throw new ChybaČtení("Syntaktická chyba", chyba);
    } else {
      throw chyba;
    }
*/!*
  }

  try {
    validujUživatele(uživatel);
  } catch (chyba) {
*!*
    if (chyba instanceof ChybaValidace) {
      throw new ChybaČtení("Chyba validace", chyba);
    } else {
      throw chyba;
    }
*/!*
  }

}

try {
  načtiUživatele('{špatný json}');
} catch (e) {
  if (e instanceof ChybaČtení) {
*!*
    alert(e);
    // Původní chyba: SyntaxError: Unexpected token š in JSON at position 1
    alert("Původní chyba: " + e.příčina);
*/!*
  } else {
    throw e;
  }
}
```

Ve výše uvedeném kódu `načtiUživatele` funguje přesně tak, jak je popsáno -- zachytává syntaktické a validační chyby a místo nich vyvolává chyby `ChybaČtení` (neznámé chyby se vyvolávají znovu jako obvykle).

Vnější kód si tedy ověří `instanceof ChybaČtení` a to je vše. Není třeba vyjmenovávat všechny možné typy chyb.

Tento přístup se nazývá „wrapování (obalování) výjimek“, protože přejímáme výjimky „nižší úrovně“ a obalujeme *(anglicky „wrap“)* je do výjimky `ChybaČtení`, která je abstraktnější. V objektově orientovaném programování se zeširoka používá.

## Shrnutí

- Ze třídy `Error` a jiných vestavěných tříd můžeme běžně dědit. Jen se musíme postarat o vlastnost `name` a nesmíme zapomenout volat `super`.
- K ověření chyb určitého druhu můžeme použít `instanceof`. Ten funguje i s dědičností. Někdy však máme chybový objekt pocházející z knihovny třetí strany a neexistuje žádný snadný způsob, jak získat jeho třídu. Pak můžeme pro taková ověření použít vlastnost `name`.
- Široce používaná technika je wrapování výjimek: funkce ošetří výjimky nižší úrovně a namísto různých chyb nižší úrovně vyvolá chybu vyšší úrovně. Jejími vlastnostmi se někdy stávají výjimky nižší úrovně, například `chyba.příčina` ve výše uvedených příkladech, ale to není striktně vyžadováno.