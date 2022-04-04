
# Soukromé a chráněné vlastnosti a metody

Jeden z nejdůležitějších principů objektově orientovaného programování je oddělení interního rozhraní od externího.

Je to „nezbytná“ praxe při vývoji čehokoli složitějšího než aplikace „ahoj světe“.

Abychom to pochopili, odtrhněme se od programování a upřeme oči na skutečný svět.

Zařízení, která používáme, jsou obvykle docela složitá. Ale oddělení interního rozhraní od externího nám umožňuje používat je bez problémů.

## Příklad z reálného života

Například kávovar. Zvenčí vypadá jednoduše: tlačítko, displej, několik otvorů... A samozřejmě -- výsledkem je výtečná káva! :)

![](coffee.jpg)

Ale zevnitř... (obrázek z manuálu pro opraváře)

![](coffee-inside.jpg)

Spousta detailů. My ho však můžeme používat, aniž bychom cokoli z nich znali.

Kávovary jsou docela spolehlivé, ne? Můžeme je používat léta, a teprve až se něco pokazí, zaneseme je do opravy.

Tajemství spolehlivosti a jednoduchosti kávovaru -- veškeré detaily jsou dobře vyladěny a *ukryty* uvnitř.

Jestliže z kávovaru odstraníme ochranný kryt, bude jeho používání mnohem složitější (kde to máme zmáčknout?) a nebezpečnější (může nás zasáhnout elektřina).

Jak uvidíme, objekty jsou v programování jako kávovary.

Abychom však ukryli vnitřní detaily, nebudeme používat ochranný kryt, ale speciální syntaxi jazyka a konvence.

## Interní a externí rozhraní

V objektově orientovaném programování jsou vlastnosti a metody rozděleny do dvou skupin:

- *Interní rozhraní* -- metody a vlastnosti dostupné z jiných metod stejné třídy, ale ne zvnějšku.
- *Externí rozhraní* -- metody a vlastnosti dostupné i zvnějšku třídy.

Budeme-li pokračovat v analogii s kávovarem -- co je skryto uvnitř: nádoba na vodu, ohřívací těleso a tak dále -- to je jeho interní rozhraní.

Interní rozhraní se používá k tomu, aby objekt fungoval, a jeho detaily se používají navzájem mezi sebou. Například nádoba na vodu je připojena k ohřívacímu tělesu.

Zvenčí je však kávovar uzavřen ochranným krytem, takže na ně nikdo nemůže sahat. Detaily jsou skryté a nepřístupné. Můžeme používat jejich vlastnosti pomocí externího rozhraní.

Vše, co potřebujeme znát, abychom mohli objekt používat, je tedy jeho externí rozhraní. Vůbec nás nemusí zajímat, jak to funguje uvnitř, a to je skvělé.

To byl obecný úvod.

V JavaScriptu existují dva druhy objektových polí (vlastností a metod):

- Veřejná: dostupná odkudkoli. Ta utvářejí externí rozhraní. Doposud jsme používali výhradně veřejné vlastnosti a metody.
- Soukromá: dostupná jedině zevnitř třídy. Ta jsou určena pro interní rozhraní.

V mnoha jiných jazycích existují také „chráněná“ pole: dostupná jedině zevnitř třídy a tříd, které ji rozšiřují (obdobně jako soukromá, ale navíc s přístupem ze zděděných tříd). I ta jsou užitečná pro interní rozhraní. V určitém smyslu jsou širší než soukromá, protože obvykle chceme, aby k nim měly přístup zděděné třídy.

V JavaScriptu nejsou chráněná pole implementována na úrovni jazyka, ale v praxi jsou velice užitečná, takže se emulují.

Nyní vytvořme kávovar v JavaScriptu se všemi těmito druhy vlastností. Kávovar má spoustu detailů, které pro jednoduchost nebudeme modelovat (ačkoli bychom mohli).

## Ochrana „množstvíVody“

Nejprve si vytvořme jednoduchou třídu pro kávovar:

```js run
class Kávovar {
  množstvíVody = 0; // množství vody uvnitř

  constructor(výkon) {
    this.výkon = výkon;
    alert( `Kávovar vytvořen, výkon: ${výkon}` );
  }

}

// vytvoříme kávovar
let kávovar = new Kávovar(100);

// přidáme vodu
kávovar.množstvíVody = 200;
```

Nyní jsou vlastnosti `množstvíVody` a `výkon` veřejné. Snadno je můžeme zvenčí číst a nastavit do nich jakoukoli hodnotu.

Změňme vlastnost `množstvíVody` na chráněnou, abychom nad ní měli větší kontrolu. Například nechceme, aby ji někdo nastavil na menší než 0.

**Názvy chráněných vlastností obvykle začínají podtržítkem `_`.**

To není vyžadováno na úrovni jazyka, ale mezi programátory existuje dobře známá konvence, že k takovým vlastnostem a metodám by se nemělo přistupovat zvenčí.

Naše vlastnost se tedy bude nazývat `_množstvíVody`:

```js run
class Kávovar {
  _množstvíVody = 0;

  set množstvíVody(hodnota) {
    if (hodnota < 0) {
      hodnota = 0;
    }
    this._množstvíVody = hodnota;
  }

  get množstvíVody() {
    return this._množstvíVody;
  }

  constructor(výkon) {
    this._výkon = výkon;
  }

}

// vytvoříme kávovar
let kávovar = new Kávovar(100);

// přidáme vodu
kávovar.množstvíVody = -10; // _množstvíVody bude 0, ne -10
```

Nyní máme přístup pod kontrolou, takže nebude možné nastavit množství vody nižší než 0.

## „výkon“ pouze pro čtení

Co se týče vlastnosti `výkon`, učiňme ji dostupnou pouze pro čtení. Někdy se stává, že vlastnost musí být nastavena pouze v okamžiku vytvoření objektu a pak už nikdy nesmí být změněna.

To je přesně případ kávovaru: výkon se nikdy nemění.

Abychom toho dosáhli, musíme vytvořit pouze getter, ale ne setter:

```js run
class Kávovar {
  // ...

  constructor(výkon) {
    this._výkon = výkon;
  }

  get výkon() {
    return this._výkon;
  }

}

// vytvoříme kávovar
let kávovar = new Kávovar(100);

alert(`Výkon je: ${kávovar.výkon} W`); // Výkon je: 100 W

kávovar.výkon = 25; // Chyba (není setter)
```

````smart header="Funkce getterů/setterů"
Zde jsme použili syntaxi getterů/setterů.

Většinou se však dává přednost funkcím `vrať.../nastav...` *(v angličtině `get.../set...` -- pozn. překl.)*, např. takto:

```js
class Kávovar {
  _množstvíVody = 0;

  *!*nastavMnožstvíVody(hodnota)*/!* {
    if (hodnota < 0) hodnota = 0;
    this._množstvíVody = hodnota;
  }

  *!*vraťMnožstvíVody()*/!* {
    return this._množstvíVody;
  }
}

new Kávovar().nastavMnožstvíVody(100);
```

Vypadá to trochu delší, ale funkce jsou flexibilnější. Mohou přijímat více argumentů (i když je zrovna teď nepotřebujeme).

Na druhou stranu syntaxe get/set je kratší, takže žádné pevné pravidlo neexistuje, rozhodnutí je na vás.
````

```smart header="Chráněná pole se dědí"
Jestliže zdědíme `class Megastroj extends Kávovar`, pak nám nic nebrání přistupovat k `this._množstvíVody` nebo `this._výkon` z metod nové třídy.

Chráněná pole jsou tedy přirozeně dědičná. Na rozdíl od soukromých, jak uvidíme níže.
```

## Soukromý „#limitVody“

[recent browser=none]

V JavaScriptu existuje dokončený návrh, je již téměř ve standardu, který poskytuje podporu soukromých vlastností a metod na úrovni jazyka.

Názvy soukromých vlastností a metod by měly začínat na `#`. Pak budou dostupné jen zevnitř třídy.

Například zde je soukromá vlastnost `#maximumVody` a soukromá metoda `#opravMnožstvíVody`, která zkontroluje množství vody:

```js run
class Kávovar {
*!*
  #maximumVody = 200;
*/!*

*!*
  #opravMnožstvíVody(hodnota) {
    if (hodnota < 0) return 0;
    if (hodnota > this.#maximumVody) return this.#maximumVody;
  }
*/!*

  nastavMnožstvíVody(hodnota) {
    this.#maximumVody = this.#opravMnožstvíVody(hodnota);
  }

}

let kávovar = new Kávovar();

*!*
// nelze přistupovat k soukromým polím zvnějšku třídy
kávovar.#opravMnožstvíVody(123); // Chyba
kávovar.#maximumVody = 1000; // Chyba
*/!*
```

Na úrovni jazyka je `#` speciální znak, který znamená, že pole je soukromé. Nemůžeme k němu přistupovat zvenčí ani ze zděděných tříd.

Soukromá pole nejsou v konfliktu s veřejnými. Můžeme mít současně soukromé pole `#množstvíVody` a veřejné `množstvíVody`.

Například učiňme z `množstvíVody` přístupovou vlastnost pro `#množstvíVody`:

```js run
class Kávovar {

  #množstvíVody = 0;

  get množstvíVody() {
    return this.#množstvíVody;
  }

  set množstvíVody(hodnota) {
    if (hodnota < 0) hodnota = 0;
    this.#množstvíVody = hodnota;
  }
}

let stroj = new Kávovar();

stroj.množstvíVody = 100;
alert(stroj.#množstvíVody); // Chyba
```

Na rozdíl od chráněných polí jsou soukromá pole vynucována samotným jazykem. To je dobrá věc.

Pokud však zdědíme třídu z `Kávovar`, nebudeme mít k `#množstvíVody` přímý přístup. Budeme se muset spolehnout na getter/setter `množstvíVody`:

```js
class MegaKávovar extends Kávovar {
  metoda() {
*!*
    alert( this.#množstvíVody ); // Chyba: přístup může být jen ze třídy Kávovar
*/!*
  }
}
```

V mnoha scénářích je takové omezení příliš přísné. Jestliže rozšíříme `Kávovar`, můžeme mít legitimní důvody pro přístup k jeho interním polím. Proto se častěji používají chráněná pole, i když je syntaxe jazyka nepodporuje.

````warn header="Soukromá pole nejsou dostupná jako this[název]"
Soukromá pole jsou speciální.

Jak víme, obvykle můžeme přistupovat k polím pomocí `this[název]`:

```js
class Uživatel {
  ...
  řekniAhoj() {
    let názevPole = "název";
    alert(`Ahoj, ${*!*this[názevPole]*/!*}`);
  }
}
```

U soukromých polí to není možné: `this['#název']` nefunguje. To je syntaktické omezení, jehož účelem je zajistit soukromí.
````

## Shrnutí

V pojmech OOP se oddělení interního rozhraní od externího nazývá [zapouzdření](https://cs.wikipedia.org/wiki/Zapouzdření_(programování)).

Poskytuje nám následující výhody:

Ochranu pro uživatele, aby se nemohli střelit do nohy
: Představme si tým vývojářů, který používá kávovar. Vyrobila jej firma „Nejlepší kávovary s.r.o.“ a funguje dobře, ale někdo odstranil ochranný kryt. Interní rozhraní je tedy odhaleno.

    Všichni vývojáři jsou civilizovaní -- používají kávovar tak, jak se má. Ale jeden z nich, Jan, se rozhodl, že je ten nejchytřejší, a udělal ve vnitřnostech kávovaru nějaká vylepšení. O dva dny později se kávovar kvůli tomu pokazil.

    Není to určitě vina Jana, ale spíše člověka, který odstranil ochranný kryt a umožnil Janovi s kávovarem manipulovat.

    V programování platí totéž. Jestliže uživatel třídy změní věci, které neměly být měněny zvenčí -- důsledky jsou nepředvídatelné.

Podporovatelnost
: Situace v programování je složitější než kávovar z reálného života, protože kávovar jen koupíme a konec. Zato kód je neustále vyvíjen a vylepšován.

    **Jestliže striktně oddělíme interní rozhraní, pak vývojář třídy bude moci svobodně měnit její interní vlastnosti a metody, dokonce aniž by informoval uživatele.**

    Jste-li vývojářem takové třídy, je pro vás skvělé vědět, že soukromé metody mohou být bezpečně přejmenovány, jejich parametry mohou být měněny a dokonce odstraňovány, protože na nich nezávisí žádný externí kód.

    Pro uživatele, když vyjde nová verze, může být uvnitř totálně přepracována, ale upgrade bude stále jednoduchý, jestliže bude externí rozhraní stejné.

Ukrytí složitosti
: Lidé rádi používají věci, které jsou jednoduché. Aspoň zvnějšku. Co je uvnitř, to je druhá věc.

    Programátoři nejsou výjimkou.

    **Vždy se hodí, když jsou implementační detaily skryté a k dispozici je jednoduché, dobře zdokumentované externí rozhraní.**

Pro skrytí interního rozhraní používáme chráněné nebo soukromé vlastnosti:

- Názvy chráněných polí začínají na `_`. To je dobře známá konvence, nevyžadovaná na úrovni jazyka. Programátoři by měli k polím, jejichž název začíná na `_`, přistupovat jen z jejich třídy a tříd, které jsou z ní zděděny.
- Názvy soukromých polí začínají na `#`. JavaScript zajišťuje, že k nim můžeme přistupovat jedině zevnitř třídy.

Soukromá pole nejsou ještě v současnosti mezi prohlížeči dobře podporována, ale to může být opraveno polyfillem.
