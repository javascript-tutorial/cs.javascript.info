# Útok clickjackingem

„Clickjacking“ je útok, který umožňuje zlé stránce, aby kliknula na „stránku oběti“ *jménem návštěvníka*.

Tímto způsobem již bylo napadeno mnoho stránek, mezi nimi Twitter, Facebook, Paypal a jiné. Všechny už byly samozřejmě opraveny.

## Myšlenka

Myšlenka je velmi jednoduchá.

Clickjacking na Facebook byl proveden tímto způsobem:

1. Návštěvník je nalákán na zlou stránku. Nezáleží na tom, jak.
2. Stránka obsahuje neškodně vypadající odkaz (např. „zbohatněte hned teď“ nebo „klikněte sem, obrovská legrace“).
3. Přes tento odkaz zlá stránka umístí průhledný `<iframe>` se `src` z facebook.com takovým způsobem, že přímo na tomto odkazu je tlačítko „To se mi líbí“. To je obvykle provedeno použitím `z-index`.
4. Když se návštěvník pokusí kliknout na tento odkaz, ve skutečnosti klikne na tlačítko.

## Demo

Zlá stránka vypadá následovně. Aby to bylo vidět, je `<iframe>` poloprůhledný (na skutečných zlých stránkách je zcela průhledný):

```html run height=120 no-beautify
<style>
iframe { /* iframe ze stránky oběti */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* v realitě opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Klikněte pro okamžité zbohatnutí:</div>

<!-- URL ze stránky oběti -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Klikněte sem!</button>
*/!*

<div>...A jste cool (ve skutečnosti jsem já cool hacker)!</div>
```

Celé demo útoku:

[codetabs src="clickjacking-visible" height=160]

Zde máme poloprůhledný `<iframe src="facebook.html">` a v příkladu vidíme, jak se vznáší nad tlačítkem. Kliknutím na tlačítko uživatel ve skutečnosti klikne na vnitřní rám, ale to nevidí, protože vnitřní rám je průhledný.

Důsledkem je, že pokud je návštěvník přihlášen na Facebook („Pamatuj si mě“ je obvykle zapnuto), pak přidá „To se mi líbí“. Na Twitteru by to bylo tlačítko „Follow“.

Následuje stejný příklad, ale bližší realitě, pro `<iframe>` má `opacity:0`:

[codetabs src="clickjacking" height=160]

Všechno, co k útoku potřebujeme, je umístit `<iframe>` na zlou stránku tak, aby tlačítko bylo umístěno přesně přes odkaz. Když tedy uživatel klikne na odkaz, klikne ve skutečnosti na tlačítko. To lze obvykle provést pomocí CSS.

```smart header="Clickjacking reaguje na kliknutí, ne na klávesnici"
Útok má vliv jen na akce myši (nebo podobné, např. doteky na mobilu).

Přesměrovat vstup z klávesnice je mnohem obtížnější. Technicky jestliže chceme nabourat textové pole, můžeme umístit vnitřní rám tak, aby se textová pole navzájem překrývala. Když se tedy návštěvník pokusí vstoupit na textové pole, které vidí na stránce, vstoupí ve skutečnosti na pole uvnitř rámu.

Pak ale nastává problém. Všechno, co návštěvník napíše, bude ukryté, protože rám není vidět.

Když lidé neuvidí své napsané znaky na obrazovce, obvykle přestanou psát.
```

## Obrany ze staré školy (slabé)

Nejstarší obranou je krátký kód v JavaScriptu, který zakáže otevření stránky v rámu (tzv. „framebusting“).

Vypadá následovně:

```js
if (top != window) {
  top.location = window.location;
}
```

To znamená: jestliže okno zjistí, že není vrchní, automaticky se nastaví jako vrchní.

Tato obrana není spolehlivá, protože existuje mnoho způsobů, jak ji obejít. Podívejme se na některé z nich.

### Blokování navigace ve vrchním okně

Můžeme zablokovat přesun způsobený změnou `top.location` v handleru události [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload).

Vrchní stránka (uzavírající, patřící hackerovi) nastaví handler, který tomu zabrání, například:

```js
window.onbeforeunload = function() {
  return false;
};
```

Když se `iframe` pokusí změnit `top.location`, návštěvník dostane otázku, zda opravdu chce odejít.

Ve většině případů návštěvník odpoví záporně, neboť o vnitřním rámu neví -- nevidí nic jiného než vrchní stránku, a tak nemá důvod odejít. Proto se `top.location` nezmění!

V akci:

[codetabs src="top-location"]

### Atribut sandbox

Jednou z věcí, které atribut `sandbox` omezuje, je navigace. Vnitřní rám obsahující `sandbox` nemůže změnit `top.location`.

Můžeme tedy přidat vnitřní rám obsahující `sandbox="allow-scripts allow-forms"`. Tím se omezení zmírní a budou povoleny skripty a formuláře. Neuvedeme však `allow-top-navigation`, takže změna `top.location` bude zakázána.

Kód je následující:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Existují i jiné způsoby, jak tuto jednoduchou ochranu překonat.

## X-Frame-Options

Hlavička `X-Frame-Options` ze strany serveru může povolit nebo zakázat zobrazení stránky v rámu.

Musí být poslána jako skutečná HTTP hlavička: pokud ji prohlížeč nalezne v HTML značce `<meta>`, bude ji ignorovat, takže `<meta http-equiv="X-Frame-Options"...>` nic neudělá.

Hlavička může mít tři hodnoty:

`DENY`
: Vůbec nikdy nelze zobrazit tuto stránku v rámu.

`SAMEORIGIN`
: Umožní zobrazení v rámu, jestliže rodičovský dokument pochází ze stejného původu.

`ALLOW-FROM doména`
: Umožní zobrazení v rámu, jestliže rodičovský dokument pochází z uvedené domény.

Například Twitter používá `X-Frame-Options: SAMEORIGIN`.

````online
Výsledek je následující:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome bez hlavičky se na tomto iframe zasekne a vyprší mu čas -->
<iframe src="https://twitter.com"></iframe>

V závislosti na vašem prohlížeči bude uvedený `iframe` buď prázdný, nebo vám oznámí, že prohlížeč nedovolil navigovat na stránku tímto způsobem.
````

## Zobrazení s potlačenou funkcionalitou

Hlavička `X-Frame-Options` má vedlejší efekt. Jiné stránky nebudou moci zobrazit naši stránku v rámu, ani když pro to mají dobrý důvod.

Existují tedy i jiná řešení... Můžeme například stránku „zakrýt“ značkou `<div>` se styly `height: 100%; width: 100%;` tak, aby zachytila všechna kliknutí. Tato `<div>` bude odstraněna, pokud `window == top` nebo pokud zjistíme, že tuto ochranu nepotřebujeme.

Něco takového:

```html
<style>
  #ochránce {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="ochránce">
  <a href="/" target="_blank">Přejděte na stránku</a>
</div>

<script>
  // pokud je vrchní okno z jiného původu, nastane chyba
  // ale to je tady v pořádku
  if (top.document.domain == document.domain) {
    ochránce.remove();
  }
</script>
```

Ukázka:

[codetabs src="protector"]

## Cookie atribut samesite

Clickjackingům může předejít i cookie atribut `samesite`.

Cookie s takovým atributem je poslán na webovou stránku jen tehdy, když je otevřena přímo, ne v rámu nebo jinak. Více informací najdete v kapitole <info:cookie#samesite>.

Jestliže nějaká stránka, např. Facebook, má ve své autentifikační cookie atribut `samesite`, například takto:

```
Set-Cookie: authorization=secret; samesite
```

...Pak taková cookie nebude poslána, když je Facebook otevřen ve vnitřním rámu z jiné stránky. Útok tedy neuspěje.

Atribut `samesite` nebude mít žádný efekt, když nebudou používány cookies. To může jiným stránkám umožnit snadno zobrazit naše veřejné, neautentifikované stránky ve vnitřních rámech.

Nicméně to může také v některých případech umožnit, aby clickjacking fungoval. Například anonymní hlasovací stránka, která brání dvojímu hlasování ověřením IP adresy, bude clickjackingem stále zranitelná, protože neautentifikuje uživatele pomocí cookies.

## Shrnutí

Clickjacking je způsob, jak „přimět“ uživatele kliknout na stránku oběti, aniž by vůbec věděl, co se děje. Pokud tam jsou důležité akce aktivované kliknutím, je to nebezpečné.

Hacker může umístit odkaz na svou zlou stránku do zprávy nebo nalákat návštěvníky na svou stránku jinými způsoby. Možností je mnoho.

Z jednoho pohledu není tento útok „hluboký“: všechno, co hacker udělá, je zachycení jediného kliknutí. Avšak z jiného pohledu, jestliže hacker ví, že po kliknutí se objeví další ovládací prvky, může lstivými zprávami nalákat uživatele, aby kliknul i na ně.

Tento útok je poměrně nebezpečný, neboť když navrhujeme uživatelské rozhraní, obvykle nepředpokládáme, že na ně může kliknout hacker jménem uživatele. Zranitelnosti tedy lze najít na zcela nečekaných místech.

- Doporučuje se používat na stránkách (nebo celých webových sídlech), které nejsou určeny k zobrazení v rámech, `X-Frame-Options: SAMEORIGIN`.
- Pokud chcete, aby se vaše stránky mohly zobrazovat ve vnitřních rámech, ale stále zůstaly bezpečné, použijte překryvný `<div>`.
