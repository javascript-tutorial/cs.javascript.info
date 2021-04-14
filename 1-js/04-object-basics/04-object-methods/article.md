# Objektové metody, „this“

Objekty se obvykle vytvářejí tak, aby představovaly entity ze skutečného světa, například uživatele, objednávky a podobně:

```js
let uživatel = {
  jméno: "Jan",
  věk: 30
};
```

Ve skutečném světě může uživatel *konat* nějakou akci: vybrat si něco z nákupního vozíku, přihlásit se, odhlásit se atd.

V JavaScriptu jsou tyto akce reprezentovány funkcemi ve vlastnostech.

## Příklady metod

Pro začátek naučme objekt `uživatel` říci ahoj:

```js run
let uživatel = {
  jméno: "Jan",
  věk: 30
};

*!*
uživatel.řekniAhoj = function() {
  alert("Ahoj!");
};
*/!*

uživatel.řekniAhoj(); // Ahoj!
```

Právě jsme použili funkční výraz, kterým jsme vytvořili funkci a přiřadili ji do vlastnosti objektu `uživatel.řekniAhoj`.

Pak ji můžeme volat pomocí `uživatel.řekniAhoj()`. Uživatel nyní umí mluvit!

Funkce, která je vlastností objektu, se nazývá jeho *metoda*.

Zde tedy máme metodu `řekniAhoj` objektu `uživatel`.

Samozřejmě můžeme použít jako metodu předem deklarovanou funkci, například takto:

```js run
let uživatel = {
  // ...
};

*!*
// nejprve ji deklarujeme
function řekniAhoj() {
  alert("Ahoj!");
};

// pak přidáme jako metodu
uživatel.řekniAhoj = řekniAhoj;
*/!*

uživatel.řekniAhoj(); // Ahoj!
```

```smart header="Objektově orientované programování"
Programování, při kterém píšeme kód, který používá objekty představující entity, se nazývá [objektově orientované programování](https://cs.wikipedia.org/wiki/Objektově_orientované_programování), zkráceně „OOP“.

OOP je velká věc a samo o sobě je zajímavou vědou. Jak zvolit správné entity? Jak zorganizovat interakci mezi nimi? To je architektura a o tomto tématu existují skvělé knihy, např. „Design Patterns: Elements of Reusable Object-Oriented Software“ od E. Gammy, R. Helma, R. Johnsona a J. Vissidese, nebo „Object-Oriented Analysis and Design with Applications“ od G. Booche a další.
```
### Zkratky metod

V objektovém literálu existuje i kratší syntaxe metod:

```js
// tyto objekty dělají totéž

uživatel = {
  řekniAhoj: function() {
    alert("Ahoj");
  }
};

// zkratka metody vypadá lépe, že?
uživatel = {
*!*
  řekniAhoj() { // totéž jako „řekniAhoj: function()“
*/!*
    alert("Ahoj");
  }
};
```

Jak vidíme, můžeme vypustit slovo `"function"` a napsat jen `řekniAhoj()`.

Upřímně řečeno, tyto notace nejsou zcela identické. Jsou v nich drobné rozdíly vztahující se k objektové dědičnosti (která bude vysvětlena později), ale na nich nám prozatím nezáleží. Téměř ve všech případech se dává přednost kratší syntaxi.

## „this“ v metodách

Běžně se stává, že objektová metoda potřebuje přístup k informaci uložené v objektu, aby mohla vykonat svou práci.

Například kód uvnitř `uživatel.řekniAhoj()` může potřebovat jméno objektu `uživatel`.

**K přístupu do objektu může metoda používat klíčové slovo `this`.**

Hodnota `this` je objekt „před tečkou“, tedy ten, který byl použit k volání metody.

Například:

```js run
let uživatel = {
  jméno: "Jan",
  věk: 30,

  řekniAhoj() {
*!*
    // „this“ je „aktuální objekt“
    alert(this.jméno);
*/!*
  }

};

uživatel.řekniAhoj(); // Jan
```

Zde během výkonu `uživatel.řekniAhoj()` hodnota `this` bude `uživatel`.

Technicky je možné přistupovat k objektu i bez `this` tak, že se na něj odkážeme přes vnější proměnnou:

```js
let uživatel = {
  jméno: "Jan",
  věk: 30,

  řekniAhoj() {
*!*
    alert(uživatel.jméno); // „uživatel“ namísto „this“
*/!*
  }

};
```

...Takový kód je však nespolehlivý. Pokud se rozhodneme zkopírovat objekt `uživatel` do jiné proměnné, např. `admin = uživatel`, a přepsat proměnnou `uživatel` něčím jiným, pak budeme přistupovat k nesprávnému objektu.

To je ukázáno níže:

```js run
let uživatel = {
  jméno: "Jan",
  věk: 30,

  řekniAhoj() {
*!*
    alert( uživatel.jméno ); // povede k chybě
*/!*
  }

};


let admin = uživatel;
uživatel = null; // přepíšeme, aby to bylo zřejmé

*!*
admin.řekniAhoj(); // TypeError: Cannot read property 'jméno' of null
*/!*
```

Kdybychom uvnitř `alert` použili `this.jméno` namísto `uživatel.jméno`, kód by fungoval.

## „this“ není vázané

V JavaScriptu se klíčové slovo `this` chová jinak než ve většině ostatních programovacích jazyků. Může být použito v libovolné funkci, i když to není metoda objektu.

V následujícím příkladu není žádná syntaktická chyba:

```js
function řekniAhoj() {
  alert( *!*this*/!*.jméno );
}
```

Hodnota `this` se vyhodnocuje za běhu skriptu v závislosti na kontextu.

Například zde bude stejná funkce přiřazena dvěma různým objektům a ve voláních bude mít různá „this“:

```js run
let uživatel = { jméno: "Jan" };
let admin = { jméno: "Admin" };

function řekniAhoj() {
  alert( this.jméno );
}

*!*
// použijeme stejnou funkci ve dvou objektech
uživatel.f = řekniAhoj;
admin.f = řekniAhoj;
*/!*

// tato volání mají různá this
// „this“ uvnitř funkce je objekt „před tečkou“
uživatel.f(); // Jan  (this == uživatel)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (k metodě přistupuje tečka nebo hranaté závorky - na tom nezáleží)
```

Platí jednoduché pravidlo: je-li volána `obj.f()`, pak `this` během volání `f` je `obj`. Ve výše uvedeném příkladu je to tedy `uživatel` anebo `admin`.

````smart header="Volání bez objektu: `this == undefined`"
Můžeme tuto funkci volat dokonce zcela bez objektu:

```js run
function řekniAhoj() {
  alert(this);
}

řekniAhoj(); // undefined
```

Ve striktním režimu je `this` v tomto případě `undefined`. Pokud se pokusíme přistoupit k `this.jméno`, nastane chyba.

V nestriktním režimu bude hodnota `this` v takovém případě *globální objekt* (v prohlížeči `window`, dostaneme se k tomu později v kapitole [](info:global-object)). To je historické chování, které `"use strict"` opravuje.

Takové volání je obvykle programovací chyba. Jestliže je `this` uvnitř funkce, očekává se, že funkce bude volána v kontextu objektu.
````

```smart header="Důsledky nevázaného `this`"
Pokud přicházíte z jiného programovacího jazyka, pak jste pravděpodobně zvyklí na myšlenku „vázaného `this`“, kdy v metodách definovaných v nějakém objektu `this` vždy odkazuje na tento objekt.

V JavaScriptu je `this` „volné“, jeho hodnota se vypočítává až při volání a není závislá na tom, kde byla metoda deklarována, ale jen na tom, jaký objekt je „před tečkou“.

Koncept vyhodnocování `this` za běhu má své výhody i nevýhody. Na jednu stranu můžeme funkci znovu použít pro různé objekty. Na druhou stranu větší flexibilita vytváří více prostoru pro chyby.

Zde nám nepřísluší soudit, zda je toto rozhodnutí návrhářů jazyka dobré nebo špatné. Porozumíme tomu, jak s ním pracovat, jak využít jeho výhody a vyhnout se problémům.
```

## Šipkové funkce nemají „this“

Šipkové funkce jsou zvláštní: nemají „své vlastní“ `this`. Pokud se v takové funkci odkážeme na `this`, bude převzato z vnější „normální“ funkce.

Například zde `šipka()` používá `this` z vnější metody `uživatel.řekniAhoj()`:

```js run
let uživatel = {
  křestníJméno: "Ilja",
  řekniAhoj() {
    let šipka = () => alert(this.křestníJméno);
    šipka();
  }
};

uživatel.řekniAhoj(); // Ilja
```

To je speciální vlastnost šipkových funkcí. Je užitečná, když ve skutečnosti nechceme mít oddělené `this`, ale chceme je převzít z vnějšího kontextu. Šipkové funkce hlouběji prozkoumáme později v kapitole <info:arrow-functions>.


## Shrnutí

- Funkce uložené ve vlastnostech objektu se nazývají „metody“.
- Metody umožňují objektům „konat akce“, např. `objekt.dělejNěco()`.
- Metody se na tento objekt mohou odkazovat klíčovým slovem `this`.

Hodnota `this` je definována za běhu skriptu.
- Když je funkce deklarována, může používat `this`, ale toto `this` nemá žádnou hodnotu, dokud není funkce volána.
- Funkce může být kopírována mezi různými objekty.
- Když je funkce volána „metodovou“ syntaxí `objekt.metoda()`, hodnota `this` během tohoto volání je `objekt`.

Všimněte si, že šipkové funkce jsou zvláštní: nemají `this`. Když uvnitř šipkové funkce přistoupíme k `this`, převezme se zvnějšku.
