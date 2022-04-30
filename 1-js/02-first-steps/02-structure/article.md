# Struktura kódu

První, co si prostudujeme, jsou stavební bloky kódu.

## Příkazy

Příkazy (anglicky statement) jsou syntaktické konstrukce a povely, které provádějí akce.

Už jsme viděli příkaz `alert('Ahoj, světe!')`, který zobrazuje zprávu „Ahoj, světe!“.

V kódu můžeme mít tolik příkazů, kolik chceme. Příkazy mohou být odděleny středníkem.

Například zde rozdělíme „Ahoj světe“ na dvě zprávy:

```js run no-beautify
alert('Ahoj'); alert('Světe');
```

Každý příkaz obvykle píšeme na nový řádek, aby kód byl čitelnější:

```js run no-beautify
alert('Ahoj');
alert('Světe');
```

## Středníky [#semicolon]

Ve většině případů, kdy je uveden konec řádku, můžeme středník vynechat.

Toto by také fungovalo:

```js run no-beautify
alert('Ahoj')
alert('Světe')
```

Zde JavaScript interpretuje konec řádku jako „implicitní“ středník. Takové chování se nazývá [automatické vkládání středníku](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**Ve většině případů nový řádek znamená středník, ale „ve většině případů“ neznamená „vždy“!**

Existují případy, v nichž nový řádek neznamená středník. Například:

```js run no-beautify
alert(3 +
1
+ 2);
```

Tento kód vypíše `6`, protože JavaScript sem středník nevloží. Je zřejmé, že jestliže řádek končí znaménkem plus `"+"`, je to „neúplný výraz“, takže středník by byl nesprávný. V tomto případě to bude fungovat tak, jak očekáváme.

**Existují však situace, v nichž JavaScript „nedokáže“ vložit středník tam, kde je opravdu zapotřebí.**

V takových případech nastanou chyby, které je poměrně těžké najít a opravit.

````smart header="Příklad chyby"
Pokud jste zvědaví na konkrétní příklad takové chyby, zkuste si tento kód:

```js run
alert("Hello");

[1, 2].forEach(alert);
```

O významu hranatých závorek `[]` a klíčového slova `forEach` zatím nemusíte přemýšlet. To probereme později. Nyní si jen zapamatujte výsledek kódu: zobrazí `Ahoj`, pak `1`, pak `2`.

Nyní odstraníme středník před `alert`:

```js run no-beautify
alert("Ahoj")

[1, 2].forEach(alert);
```

Rozdíl oproti výše uvedenému kódu je pouze v jednom znaku: středník na konci prvního řádku chybí.

Když tento kód spustíme, zobrazí se jen první `Ahoj` (a pak nastane chyba, možná si budete muset otevřít konzoli, abyste ji viděli). Žádná čísla se už nezobrazí.

Je to proto, že JavaScript nepředpokládá středník před hranatými závorkami `[...]`. S kódem v prvním příkladu se tedy zachází jako s jediným příkazem.

Takto jej vidí motor (angl. engine):

```js run no-beautify
alert("Ahoj")[1, 2].forEach(alert);
```

Vypadá to divně, že? Sloučení řádků v tomto případě je prostě špatně. Za `alert` musíme vložit středník, aby kód správně fungoval.

To se může stát i v jiných situacích.
````

Doporučujeme vám psát středníky mezi příkazy i tehdy, když je odděluje konec řádku. Toto pravidlo je v komunitě všeobecně přijímáno. Zmíníme to ještě jednou -- ve většině případů *je možné* středník vypustit. Je však bezpečnější -- zejména pro začátečníky -- jej používat.

## Komentáře [#code-comments]

S postupem času se programy stávají stále složitějšími a složitějšími, a proto je nutné do nich vkládat *komentáře*, které popisují, co kód dělá a proč.

Komentáře můžeme vkládat na kterékoli místo ve skriptu. Nemají vliv na jeho výkon, protože je engine jednoduše ignoruje.

**Jednořádkové komentáře jsou uvozeny dvěma lomítky `//`.**

Celý zbytek řádku je komentář. Může být umístěn na samostatném řádku nebo za příkazem.

Například zde:
```js run
// Tento komentář je umístěn na samostatném řádku
alert('Ahoj');

alert('světe'); // Tento komentář následuje za příkazem
```

**Víceřádkové komentáře začínají lomítkem a hvězdičkou <code>/&#42;</code> a končí hvězdičkou a lomítkem <code>&#42;/</code>.**

Například takto:

```js run
/* Příklad se dvěma zprávami.
Toto je víceřádkový komentář.
*/
alert('Ahoj');
alert('světe');
```

Obsah komentáře se ignoruje, proto jestliže mezi <code>/&#42; ... &#42;/</code> vložíme kód, neprovede se.

Někdy může přijít vhod dočasně zneplatnit část kódu:

```js run
/* Zakomentovaný kód
alert('Ahoj');
*/
alert('světe');
```

```smart header="Používejte horké klávesy!"
Ve většině editorů se dá řádek kódu zakomentovat stisknutím klávesy `key:Ctrl+/` pro jednořádkový komentář a `key:Ctrl+Shift+/` nebo podobné kombinace pro víceřádkový komentář (označte část kódu jako blok a stiskněte uvedené klávesy). Na Macu zkuste `key:Cmd` místo `key:Ctrl` a `key:Option` místo `key:Shift`.
```

````warn header="Vnořené komentáře nejsou povoleny!"
Uvnitř `/*...*/` nesmí být další `/*...*/`. Takový kód skončí s chybou:

```js run no-beautify
/*
  /* vnořený komentář ?!? */
*/
alert( 'světe' );
```
````

Neváhejte do svého kódu vkládat komentáře. Sice zvětšují velikost kódu, ale to není vůbec žádný problém. Existuje mnoho nástrojů, které kód před publikací na produkčním serveru minimalizují a odstraní z něj komentáře, takže ty se v prováděných skriptech neobjeví. Komentáře tedy nemají vůbec žádný negativní efekt na výkon.

Později v tomto tutoriálu budeme mít kapitolu <info:code-quality>, která nám vysvětlí, jak psát komentáře co nejlépe.
