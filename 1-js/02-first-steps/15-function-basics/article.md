# Funkce

Poměrně často potřebujeme vykonat podobnou akci na mnoha místech skriptu. Například chceme zobrazit pěkně vypadající zprávu, když se návštěvník přihlásí, odhlásí a možná i někde jinde.

Funkce jsou hlavní „stavební kameny“ programu. Umožňují volat kód mnohokrát, aniž by bylo nutné ho opakovat.

Už jsme viděli příklady vestavěných funkcí, např. `alert(zpráva)`, `prompt(zpráva, default)` a `confirm(otázka)`. Můžeme si však vytvořit i své vlastní funkce.

## Deklarace funkcí

Funkce vytváříme pomocí *deklarace funkce*.

Vypadá takto:

```js
function zobrazZprávu() {
  alert( 'Ahoj všichni!' );
}
```

Napřed je uvedeno klíčové slovo `function`, pak *název funkce*, pak v závorkách seznam *parametrů* (jsou odděleny čárkami, v uvedeném příkladu je seznam prázdný) a nakonec ve složených závorkách kód funkce, nazývaný také „tělo funkce“.

```js
function název(parametry) {
  ...tělo...
}
```

Naši novou funkci pak můžeme volat pomocí jejího názvu: `zobrazZprávu()`.

Například:

```js run
function zobrazZprávu() {
  alert( 'Ahoj všichni!' );
}

*!*
zobrazZprávu();
zobrazZprávu();
*/!*
```

Volání `zobrazZprávu()` vykoná kód funkce. Zde tedy uvidíme tuto zprávu dvakrát.

Tento příklad jasně demonstruje jeden z hlavních účelů funkcí: zdržet se duplikace kódu.

Jestliže někdy budeme potřebovat změnit text zprávy nebo způsob, jakým je zobrazována, bude nám stačit modifikovat kód na jediném místě: ve funkci, která zprávu vypisuje.

## Lokální proměnné

Proměnná deklarovaná uvnitř funkce je viditelná pouze v této funkci.

Příklad:

```js run
function zobrazZprávu() {
*!*
  let zpráva = "Ahoj, já jsem JavaScript!"; // lokální proměnná
*/!*

  alert( zpráva );
}

zobrazZprávu(); // Ahoj, já jsem JavaScript!

alert( zpráva ); // <-- Chyba! Proměnná je lokální uvnitř funkce
```

## Vnější proměnné

Funkce může přistupovat i k vnějším proměnným, například:

```js run no-beautify
let *!*uživatelskéJméno*/!* = 'Jan';

function zobrazZprávu() {
  let zpráva = 'Ahoj, ' + *!*uživatelskéJméno*/!*;
  alert(zpráva);
}

zobrazZprávu(); // Ahoj, Jan
```

Funkce má plný přístup k vnější proměnné a může ji také modifikovat.

Příklad:

```js run
let *!*uživatelskéJméno*/!* = 'Jan';

function zobrazZprávu() {
  *!*uživatelskéJméno*/!* = "Bob"; // (1) změna vnější proměnné

  let zpráva = 'Ahoj, ' + *!*uživatelskéJméno*/!*;
  alert(zpráva);
}

alert( uživatelskéJméno ); // *!*Jan*/!* před voláním funkce

zobrazZprávu();

alert( uživatelskéJméno ); // *!*Bob*/!*, funkce změnila hodnotu proměnné
```

Vnější proměnná se použije jen tehdy, neexistuje-li stejnojmenná lokální. Pokud je uvnitř funkce deklarována proměnná se stejným názvem, *zastíní* tu vnější. Například v níže uvedeném kódu funkce používá lokální `uživatelskéJméno` a vnější ignoruje:

```js run
let uživatelskéJméno = 'Jan';

function zobrazZprávu() {
*!*
  let uživatelskéJméno = "Bob"; // deklarace lokální proměnné
*/!*

  let zpráva = 'Ahoj, ' + uživatelskéJméno; // *!*Bob*/!*
  alert(zpráva);
}

// funkce vytvoří a použije své vlastní uživatelskéJméno
zobrazZprávu();

alert( uživatelskéJméno ); // *!*Jan*/!*, beze změny, funkce nepřistupovala k vnější proměnné
```

```smart header="Globální proměnné"
Proměnné deklarované mimo jakoukoli funkci, například `uživatelskéJméno` ve výše uvedeném kódu, se nazývají *globální*.

Globální proměnné jsou viditelné z každé funkce (pokud nejsou zastíněny lokálními).

Je dobrým zvykem minimalizovat používání globálních proměnných. Moderní kód obsahuje jen málo globálních proměnných nebo vůbec žádné. Většina proměnných spočívá ve svých funkcích. Někdy ovšem mohou být globální proměnné užitečné k ukládání dat na úrovni projektu.
```

## Parametry

Do funkcí můžeme předávat jakákoli data pomocí parametrů (ty se také nazývají *argumenty funkce*).

V níže uvedeném příkladu má funkce dva parametry: `odKoho` a `text`.

```js run
function zobrazZprávu(*!*odKoho, text*/!*) { // argumenty: odKoho, text
  alert(odKoho + ': ' + text);
}

*!*
zobrazZprávu('Anna', 'Ahoj!'); // Anna: Ahoj! (*)
zobrazZprávu('Anna', "Co se děje?"); // Anna: Co se děje? (**)
*/!*
```

Když se na řádcích `(*)` a `(**)` volá funkce, zadané hodnoty se zkopírují do lokálních proměnných `odKoho` a `text`. Pak je funkce použije.

Další příklad: máme proměnnou `odKoho` a předáme ji funkci. Všimněte si, že funkce změní hodnotu `odKoho`, ale tato změna není vidět zvnějšku, jelikož funkce obdrží vždy kopii hodnoty:


```js run
function zobrazZprávu(odKoho, text) {

*!*
  odKoho = '*' + odKoho + '*'; // aby „odKoho“ vypadalo lépe
*/!*

  alert( odKoho + ': ' + text );
}

let odKoho = "Anna";

zobrazZprávu(odKoho, "Ahoj"); // *Anna*: Ahoj

// hodnota „odKoho“ je stejná, funkce změnila lokální kopii
alert( odKoho ); // Anna
```

## Defaultní hodnoty

Jestliže parametr není poskytnut, jeho hodnota bude `undefined`.

Například výše uvedenou funkci `zobrazZprávu(odKoho, text)` lze volat jen s jediným argumentem:

```js
zobrazZprávu("Anna");
```

To není chyba. Takové volání vypíše `"Anna: undefined"`. Není zadán žádný `text`, takže se předpokládá, že `text === undefined`.

Pokud v takovém případě chceme použít nějaký „defaultní“ `text`, můžeme jej specifikovat za znakem `=`:

```js run
function zobrazZprávu(odKoho, *!*text = "text není zadán"*/!*) {
  alert( odKoho + ": " + text );
}

zobrazZprávu("Anna"); // Anna: text není zadán
```

Jestliže nyní parametr `text` nebude předán, bude mít hodnotu `"text není zadán"`.

Zde `"text není zadán"` je řetězec, ale může to být složitější výraz, který se vyhodnotí a přiřadí jen tehdy, jestliže parametr chybí. Je tedy možné i toto:

```js run
function zobrazZprávu(odKoho, text = jináFunkce()) {
  // jináFunkce() se vykoná jen tehdy, když text není předán
  // její výsledek pak bude hodnotou parametru text
}
```

```smart header="Vyhodnocení defaultních parametrů"
V JavaScriptu bude defaultní parametr vyhodnocen pokaždé, když bude funkce volána bez příslušného parametru.

Ve výše uvedeném příkladu bude `jináFunkce()` volána pokaždé, když bude volána funkce `zobrazZprávu()` bez parametru `text`.
```

### Alternativní defaultní parametry

Někdy má smysl nenastavovat defaultní hodnoty parametrů v deklaraci funkce, ale až později během jejího vykonávání.

Abychom ověřili, zda parametr nebyl uveden, můžeme jej porovnat s `undefined`:

```js run
function zobrazZprávu(text) {
*!*
  if (text === undefined) {
    text = 'prázdná zpráva';
  }
*/!*

  alert(text);
}

zobrazZprávu(); // prázdná zpráva
```

...Nebo můžeme použít operátor `||`:

```js
// je-li parametr text neuveden nebo je předáno "", nastaví se na 'prázdný'
function zobrazZprávu(text) {
  text = text || 'prázdný';
  ...
}
```

Moderní enginy JavaScriptu podporují [operátor koalescence](info:nullish-coalescing-operator) `??`, který je lepší použít, když chceme mít možnost zadat nepravdivé hodnoty, například `0`:

```js run
// není-li předán parametr "počet", zobrazíme "neznámý"
function zobrazPočet(počet) {
  alert(počet ?? "neznámý");
}

zobrazPočet(0); // 0
zobrazPočet(null); // neznámý
zobrazPočet(); // neznámý
```

## Návratová hodnota

Funkce může vrátit volajícímu kódu jako výsledek nějakou hodnotu.

Nejjednodušším příkladem je funkce, která sečte dvě hodnoty:

```js run no-beautify
function součet(a, b) {
  *!*return*/!* a + b;
}

let výsledek = součet(1, 2);
alert( výsledek ); // 3
```

Direktiva `return` může být ve funkci umístěna kdekoli. Když na ni výkon funkce narazí, ukončí se a vrátí zadanou hodnotu volajícímu kódu (v uvedeném příkladu se přiřadí do proměnné `výsledek`).

V jedné funkci se může `return` vyskytovat mnohokrát. Příklad:

```js run
function ověřVěk(věk) {
  if (věk >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Máš povolení od rodičů?');
*/!*
  }
}

let věk = prompt('Kolik je ti let?', 18);

if ( ověřVěk(věk) ) {
  alert( 'Přístup povolen' );
} else {
  alert( 'Přístup zakázán' );
}
```

Je možné použít `return` bez hodnoty. To způsobí okamžité ukončení funkce.

Příklad:

```js
function zobrazFilm(věk) {
  if ( !ověřVěk(věk) ) {
*!*
    return;
*/!*
  }

  alert( "Zobrazím vám film" ); // (*)
  // ...
}
```

Pokud v uvedeném kódu `ověřVěk(věk)` vrátí `false`, pak `zobrazFilm` nebude pokračovat k `alert`.

````smart header="Funkce s prázdným `return` nebo bez něj vrátí `undefined`"
Jestliže funkce nevrátí žádnou hodnotu, je to stejné, jako by vrátila `undefined`:

```js run
function nedělejNic() { /* prázdná funkce */ }

alert( nedělejNic() === undefined ); // true
```

Rovněž prázdný `return` je totéž jako `return undefined`:

```js run
function nedělejNic() {
  return;
}

alert( nedělejNic() === undefined ); // true
```
````

````warn header="Nevkládejte konec řádku mezi `return` a hodnotu"
Je-li za `return` dlouhý výraz, může to svádět k jeho umístění na samostatný řádek, například:

```js
return
 (nějaký + dlouhý + výraz + nebo + co * f(a) + f(b))
```
To však nebude fungovat, neboť JavaScript za `return` vloží středník. Bude to tedy stejné jako:

```js
return*!*;*/!*
 (nějaký + dlouhý + výraz + nebo + co * f(a) + f(b))
```

Z příkazu se tedy stane prázdný `return`.

Jestliže chceme rozdělit vracený výraz na více řádků, měli bychom jej zahájit na stejném řádku jako `return`, nebo aspoň tam umístit levou závorku následovně:

```js
return (
  nějaký + dlouhý + výraz
  + nebo +
  co * f(a) + f(b)
  )
```
Teď to bude fungovat tak, jak očekáváme.
````

## Pojmenování funkcí [#function-naming]

Funkce jsou akce, takže jejich názvem bývá obvykle sloveso. Mělo by být krátké a mělo by co nejpřesněji popisovat, co funkce dělá, aby ten, kdo čte kód, nabyl tušení, co přesně funkce provádí.

Je široce rozšířenou praktikou zahájit název funkce slovesným prefixem (předponou), který přibližně popisuje akci. Na významu prefixů se celý tým musí dohodnout.

Například funkce, jejichž název začíná `"zobraz"` (v angličtině `"show"`), obvykle něco zobrazují.

Funkce, které začínají...

- `"vrať…"` (`"get…"`) -- vracejí nějakou hodnotu,
- `"vypočítej…"` (`"calc…"`) -- něco vypočítávají,
- `"vytvoř…"` (`"create…"`) -- něco vytvářejí,
- `"ověř…"` (`"check…"`) -- něco ověřují a vracejí typ boolean, atd.

Příklady takových názvů:

```js no-beautify
zobrazZprávu(..)    // zobrazí zprávu
vraťVěk(..)         // vrátí věk (nějak jej zjistí)
vypočítejSoučet(..) // vypočítá součet a vrátí výsledek
vytvořFormulář(..)  // vytvoří formulář (a obvykle jej vrátí)
ověřPrávo(..)       // ověří právo, vrátí true nebo false
```

Když jsou použity prefixy, pohled na název funkce nám umožňuje lépe porozumět, jaký druh činnosti funkce provádí a jaký druh hodnoty vrací.

```smart header="Jedna funkce -- jedna akce"
Funkce by měla provádět přesně to, co naznačuje její název, a nic víc.

Dvě nezávislé akce si zpravidla zasluhují dvě funkce, i když jsou obvykle volány společně (v takovém případě můžeme vytvořit třetí funkci, která bude volat ty dvě).

Několik příkladů porušení tohoto pravidla:

- `vraťVěk` -- bylo by špatně, kdyby zobrazovala `alert` s věkem (měla by ho jen vrátit).
- `vytvořFormulář` -- bylo by špatně, kdyby modifikovala dokument a formulář do něj přidávala (měla by ho jen vytvořit a vrátit).
- `ověřPrávo` -- bylo by špatně, kdyby zobrazovala zprávu `přístup povolen/zamítnut` (měla by jen ověřit právo přístupu a vrátit výsledek).

Tyto příklady předpokládají běžný význam prefixů. Se svým týmem se můžete dohodnout na jiném významu, ale obvykle se příliš neliší. V každém případě byste měli jasně rozumět tomu, co prefix znamená a co funkce s tímto prefixem v názvu může a nemůže dělat. Tato pravidla by měly dodržovat všechny funkce se stejným prefixem a celý tým by je měl znát.
```

```smart header="Ultrakrátké názvy funkcí"
Funkce, které se používají *velmi často*, mají někdy ultrakrátké názvy.

Například rozhraní [jQuery](http://jquery.com) definuje funkci s názvem `$`. Knihovna [Lodash](http://lodash.com/) má svou ústřední funkci pojmenovanou `_`.

To jsou však výjimky. Obecně by názvy funkcí měly být výstižné a popisné.
```

## Funkce == komentáře

Funkce by měly být krátké a provádět právě jednu věc. Je-li ta věc velká, může se vyplatit rozdělit funkci na několik menších funkcí. Dodržovat toto pravidlo nemusí být vždy snadné, ale bezpochyby se to vyplatí.

Oddělená funkce se nejenom snadněji testuje a ladí -- samotná její existence je skvělým komentářem!

Například srovnejte dvě níže uvedené funkce `zobrazPrvočísla(n)`. Každá z nich vypíše [prvočísla](https://cs.wikipedia.org/wiki/Prvočíslo) menší nebo rovná `n`.

První varianta používá návěští:

```js
function zobrazPrvočísla(n) {
  dalšíPrvočíslo: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue dalšíPrvočíslo;
    }

    alert( i ); // prvočíslo
  }
}
```

Druhá varianta používá další funkci `jePrvočíslo(n)`, která otestuje, zda zadané číslo je prvočíslo:

```js
function zobrazPrvočísla(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!jePrvočíslo(i)) continue;*/!*

    alert(i);  // prvočíslo
  }
}

function jePrvočíslo(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

Druhou variantu je snadnější pochopit, že? Namísto části kódu vidíme název akce (`jePrvočíslo`). Takovému kódu lidé někdy říkají *sebepopisující*.

Funkce tedy můžeme vytvořit, i když nemáme v úmyslu je používat opakovaně. Strukturují kód a činí jej čitelnějším.

## Shrnutí

Deklarace funkce vypadá takto:

```js
function název(parametry, oddělené, čárkami) {
  /* kód */
}
```

- Hodnoty předané funkci jako parametry se zkopírují do jejích lokálních proměnných.
- Funkce může přistupovat k vnějším proměnným, ale opačně to nefunguje -- kód mimo funkci nevidí její lokální proměnné.
- Funkce může vracet hodnotu. Pokud žádnou nevrátí, její výsledek je `undefined`.

Aby kód byl čistší a srozumitelnější, doporučuje se ve funkcích používat zejména lokální proměnné a parametry, ne vnější proměnné.

Je vždy jednodušší pochopit funkci, která obdrží parametry, něco s nimi udělá a vrátí výsledek, než funkci, která neobdrží žádné parametry, ale jako vedlejší efekt modifikuje vnější proměnné.

Pojmenování funkcí:

- Název by měl jasně popisovat, co funkce dělá. Když v kódu vidíme volání funkce, dobrý název nám umožňuje okamžitě pochopit, co funkce dělá a co vrací.
- Funkce je akce, takže názvy funkcí jsou obvykle slovesa.
- Existuje mnoho dobře známých prefixů funkcí, např. `vytvoř…`, `zobraz…`, `vrať…`, `ověř…` atd. Používají se, aby bylo naznačeno, co funkce dělá.

Funkce jsou hlavními stavebními kameny skriptů. Když jsme nyní vysvětlili jejich základy, můžeme je začít vytvářet a používat. To je však teprve začátek. Ještě mnohokrát se k nim vrátíme a pronikneme hlouběji do jejich složitějších vlastností.