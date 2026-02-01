# Události ukazatele

Události ukazatele jsou moderním způsobem, jak zpracovat vstup z různorodých ukazovacích zařízení, například myš, pero/stylus, doteková obrazovka a podobně.

## Krátká historie

Udělejme si malý přehled, abyste porozuměli obecnému obrazu a místu událostí ukazatele mezi ostatními druhy událostí.

- Před dlouhou dobou v minulosti existovaly jen události myši.

    Pak se rozšířila doteková zařízení, zvláště mobilní telefony a tablety. Aby na nich fungovaly již existující skripty, generovala (a stále generují) události myši, například dotek na dotekové obrazovce vyvolá `mousedown`. Doteková zařízení tedy s webovými stránkami fungovala dobře.

    Jenže doteková zařízení mají více možností než myš. Je například možné dotknout se více bodů najednou („multidotek“). Události myši však nemají nezbytné vlastnosti k tomu, aby takové multidoteky zpracovaly.

- Byly tedy zavedeny dotekové události, např. `touchstart`, `touchend`, `touchmove`, které obsahují vlastnosti specifické pro dotek (nebudeme je tady podrobně probírat, jelikož vlastnosti ukazatele jsou ještě lepší).

    Stále to však nestačilo, protože existuje mnoho dalších zařízení, např. pera, která mají své vlastní schopnosti. Kromě toho bylo nepohodlné psát kód, který naslouchá jak dotekovým událostem, tak událostem myši.

- K vyřešení těchto problémů byl zaveden nový standard událostí ukazatele, který poskytuje jedinou sadu událostí pro všechny druhy ukazovacích zařízení.

V současnosti je ve všech významných prohlížečích podporována specifikace [událostí ukazatele 2. úrovně](https://www.w3.org/TR/pointerevents2/), zatímco novější specifikace [událostí ukazatele 3. úrovně](https://w3c.github.io/pointerevents/) je ve vývoji a je s událostmi ukazatele 2. úrovně převážně kompatibilní.

Pokud nevyvíjíte pro staré prohlížeče, např. Internet Explorer 10, Safari 12 nebo starší, není již nadále důvod používat události myši nebo dotekové události -- můžeme přejít na události ukazatele.

Váš kód pak bude správně fungovat s dotekovými zařízeními i s myší.

Při tom všem však existují důležité zvláštnosti, které byste měli znát, abyste používali události ukazatele správně a vyhnuli se překvapením. Zmíníme se o nich v tomto článku.

## Typy událostí ukazatele

Události ukazatele se nazývají podobně jako události myši:

| Událost ukazatele | Podobná událost myši |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

Jak vidíme, pro každou `mouse<událost>` existuje `pointer<událost>`, která hraje podobnou roli. Navíc existují tři další události ukazatele, které nemají odpovídající protějšek `mouse...`. Brzy je vysvětlíme.

```smart header="Náhrada `mouse<událost>` za `pointer<událost>` v našem kódu"
V našem kódu můžeme nahradit události `mouse<událost>` událostmi `pointer<událost>` a očekávat, že vše bude s myší fungovat správně.

Rovněž se „magicky“ zlepší podpora dotekových zařízení, ačkoli na některých místech v CSS budeme asi muset přidat `touch-action: none`. Probereme to dále v podkapitole o `pointercancel`.
```

## Vlastnosti událostí ukazatele

Události ukazatele mají tytéž vlastnosti jako události myši, např. `clientX/Y`, `target` atd., plus některé další:

- `pointerId` - unikátní identifikátor ukazatele, který vyvolal událost.

    Generováno prohlížečem. Umožňuje nám zpracovat více ukazatelů, například dotekovou obrazovku se stylusem a multidotek (příklady budou následovat).
- `pointerType` - typ ukazovacího zařízení. Musí to být řetězec, a to jeden z následujících: `"mouse"`, `"pen"` nebo `"touch"`.

    Tuto vlastnost můžeme použít k tomu, abychom na různé druhy ukazatelů reagovali různě.
- `isPrimary` - je `true` pro primární ukazatel (první prst při multidoteku).

Některá ukazovací zařízení měří plochu a tlak doteku, např. prstu na dotekové obrazovce. Pro ně existují následující vlastnosti:

- `width` - šířka plochy, kde se ukazatel (např. prst) dotýká zařízení. Když není podporována, např. u myši, je vždy `1`.
- `height` - výška plochy, kde se ukazatel dotýká zařízení. Když není podporována, je vždy `1`.
- `pressure` - tlak doteku ukazatele v rozsahu od 0 do 1. U zařízení, která tlak nepodporují, musí být buď `0.5` (stisknuto), nebo `0`.
- `tangentialPressure` - normalizovaný tangenciální tlak.
- `tiltX`, `tiltY`, `twist` - vlastnosti specifické pro pero, které popisují, jak je pero umístěno vzhledem k povrchu.

Většina zařízení tyto vlastnosti nepodporuje, takže se používají jen vzácně. Budete-li je potřebovat, podrobnosti o nich naleznete ve [specifikaci](https://w3c.github.io/pointerevents/#pointerevent-interface).

## Multidotek

Jedna z věcí, které události myši vůbec nepodporují, je multidotek: uživatel se může svého telefonu nebo tabletu dotknout na několika místech najednou nebo provádět speciální gesta.

Události ukazatele umožňují zpracování multidoteku pomocí vlastností `pointerId` a `isPrimary`.

Když se uživatel dotkne dotekové obrazovky na jednom místě a pak na ni položí další prst někde jinde, stane se následující:

1. Při prvním doteku prstu:
    - `pointerdown` s `isPrimary=true` a nějakým `pointerId`.
2. Při druhém a dalších dotecích prstu (za předpokladu, že první prst se stále dotýká):
    - `pointerdown` s `isPrimary=false` a odlišným `pointerId` pro každý prst.

Prosíme všimněte si, že `pointerId` není přiřazeno celému zařízení, ale každému dotýkajícímu se prstu. Jestliže se současně dotkneme obrazovky pěti prsty, dostaneme pět událostí `pointerdown`, každá bude mít své vlastní souřadnice a odlišný `pointerId`.

Události spojené s prvním prstem budou mít vždy `isPrimary=true`.

Pomocí `pointerId` můžeme sledovat více dotýkajících se prstů. Když uživatel přesune prst a pak jej zvedne, dostaneme události `pointermove` a `pointerup` se stejným `pointerId`, jaký jsme měli v `pointerdown`.

```online
Následující demo loguje události `pointerdown` a `pointerup`:

[iframe src="multitouch" edit height=200]

Prosíme všimněte si, že abyste skutečně viděli rozdíl v `pointerId/isPrimary`, musíte používat dotekové zařízení, například mobilní telefon nebo tablet. U jednodotekových zařízení, jakým je myš, budou všechny události ukazatele mít pořád stejné `pointerId` a `isPrimary=true`.
```

## Událost pointercancel

Událost `pointercancel` se spustí, když probíhá interakce s ukazatelem a pak se stane něco, co způsobí její ukončení, takže žádné další události ukazatele se nevygenerují.

Takové případy jsou:
- Dotekové zařízení bylo fyzicky odpojeno.
- Změnila se orientace zařízení (tablet byl otočen).
- Prohlížeč se rozhodl, že tuto interakci zpracuje sám, protože ji považuje za gesto myši, akci zoom-and-pan nebo něco jiného.

Předvedeme si `pointercancel` na praktickém příkladu, abychom viděli, jak nás ovlivní.

Dejme tomu, že implementujeme přetahování míče, podobně jako na začátku článku <info:mouse-drag-and-drop>.

Průběh uživatelských akcí a odpovídajících událostí je následující:

1) Uživatel se dotkne obrázku, aby začal přetahovat.
    - spustí se událost `pointerdown`
2) Pak začne pohybovat ukazatelem (a tedy přetahovat obrázek)
    - spustí se událost `pointermove`, asi několikrát
3) A pak následuje překvapení! Prohlížeč má svou nativní podporu přetahování obrázků, která se spustí a převezme proces přetahování, čímž vygeneruje událost `pointercancel`.
    - Prohlížeč bude nyní zpracovávat přetahování obrázku sám. Uživatel může dokonce přetáhnout obrázek míče mimo prohlížeč, třeba do svého poštovního programu nebo správce souborů.
    - Žádné další události `pointermove` se pro nás nekonají.

Problém tedy je v tom, že prohlížeč se „zmocní“ interakce: na začátku procesu „přetahování“ se spustí `pointercancel` a žádné další události `pointermove` se nevygenerují.

```online
Následuje příklad přetahování s logováním událostí ukazatele (jen `up/down`, `move` a `cancel`) do `textarea`:

[iframe src="ball" height=240 edit]
```

My bychom ovšem chtěli implementovat své vlastní přetahování. Řekněme tedy prohlížeči, aby je nepřebíral.

**Abyste se vyhnuli `pointercancel`, zakažte standardní akce prohlížeče.**

Musíme udělat následující dvě věci:

1. Zakázat aktivaci nativního přetahování:
    - Můžeme to udělat nastavením `míč.ondragstart = () => false`, tak, jak je popsáno v kapitole <info:mouse-drag-and-drop>.
    - To funguje správně pro události myši.
2. Pro doteková zařízení existují i jiné akce prohlížeče týkající se doteku (kromě přetahování). Abychom se vyhnuli problémům i s nimi:
    - Zakážeme je nastavením `#míč { touch-action: none }` v CSS.
    - Pak bude náš kód fungovat na dotekových zařízeních.

Když to uděláme, budou události fungovat tak, jak zamýšlíme. Prohlížeč se nezmocní procesu a nevyvolá `pointercancel`.

```online
Následující demo tyto řádky přidá:

[iframe src="ball-2" height=240 edit]

Jak vidíte, další `pointercancel` se nekoná.
```

Nyní můžeme přidat kód, který bude skutečně hýbat míčem, a naše přetahování bude správně fungovat pro myš i pro doteková zařízení.

## Zachycení ukazatele

Zachycení ukazatele je speciální prvek událostí ukazatele.

Jeho myšlenka je velmi jednoduchá, ale na první pohled se může zdát trochu zvláštní, jelikož pro události žádného jiného druhu nic podobného neexistuje.

Hlavní metodou je:
- `elem.setPointerCapture(pointerId)` -- naváže události se zadaným `pointerId` na `elem`. Po tomto volání budou všechny události ukazatele se stejným `pointerId` mít cíl `elem` (jako by se staly na `elem`), bez ohledu na to, kde v dokumentu se opravdu staly.

Jinými slovy, `elem.setPointerCapture(pointerId)` přesměruje všechny následné události se zadaným `pointerId` na `elem`.

Vazba bude odstraněna:
- automaticky, když nastane událost `pointerup` nebo `pointercancel`,
- automaticky, když je z dokumentu odstraněn `elem`,
- když je volána `elem.releasePointerCapture(pointerId)`.

K čemu je to nyní dobré? Nastal čas ukázat příklad ze skutečného života.

**Zachycení ukazatele můžeme použít ke zjednodušení přetahování a podobných interakcí.**

Vzpomeňme si, jak můžeme implementovat vlastní posuvník, popsaný v kapitole <info:mouse-drag-and-drop>.

Můžeme vytvořit element `posuvník`, který bude představovat pás a „šoupátko“ (`šoupátko`) uvnitř:

```html
<div class="posuvník">
  <div class="šoupátko"></div>
</div>
```

S použitím stylů vypadá následovně:

[iframe src="slider-html" height=40 edit]

<p></p>

Po náhradě událostí myši podobnými událostmi ukazatele je logika fungování následující, jak bylo popsáno:

1. Uživatel se dotkne šoupátka `šoupátko` -- spustí se `pointerdown`.
2. Pak uživatel přesune ukazatel -- spustí se `pointermove` a náš kód přesune element `šoupátko`.
    - ...Když se ukazatel přesunuje, může opustit element `šoupátko` a přesunout se nad nebo pod ně. Pak by se `šoupátko` mělo posunovat výhradně vodorovně a zůstat zarovnané s ukazatelem.

V řešení založeném na událostech myši jsme pro sledování všech pohybů ukazatele, včetně jeho přemístění nad nebo pod `šoupátko`, museli přiřadit celému `document` handler události `mousemove`.

To však není to nejčistší řešení. Jedním z jeho problémů je, že když uživatel posunuje ukazatelem po dokumentu, může spustit handlery událostí (např. `mouseover`) na jiných elementech a vyvolat zcela nesouvisející funkcionalitu UI, což nechceme.

Na tomto místě přichází do hry `setPointerCapture`.

- V handleru `pointerdown` můžeme volat `šoupátko.setPointerCapture(událost.pointerId)`.
- Pak se budoucí události ukazatele až do `pointerup/cancel` přesměrují na `šoupátko`.
- Když dojde k `pointerup` (přetahování skončí), vazba se automaticky odstraní a my se o ni nemusíme starat.

I když tedy uživatel bude pohybovat ukazatelem po celém dokumentu, handlery událostí se budou volat na `šoupátko`. Přesto budou souřadnicové vlastnosti objektů událostí, např. `clientX/clientY`, stále správně -- zachycení má vliv pouze na `target/currentTarget`.

Zde je nástin kódu:

```js
šoupátko.onpointerdown = function(událost) {
  // přesměruje všechny události ukazatele (až do pointerup) na šoupátko
  šoupátko.setPointerCapture(událost.pointerId);

  // začneme sledovat pohyby ukazatele
  šoupátko.onpointermove = function(událost) {
    // pohyb posuvníku: nasloucháme na šoupátku, jelikož všechny události ukazatele jsou přesměrovány na něj
    let nováLevá = událost.clientX - posuvník.getBoundingClientRect().left;
    šoupátko.style.left = nováLevá + 'px';
  };

  // při zvednutí ukazatele ukončíme sledování jeho pohybu
  šoupátko.onpointerup = function(událost) {
    šoupátko.onpointermove = null;
    šoupátko.onpointerup = null;
    // ...také zpracujeme „konec přetahování“, je-li to nutné
  };
};

// poznámka: nemusíme volat šoupátko.releasePointerCapture,
// při pointerup k němu dojde automaticky
```

```online
Celé demo:

[iframe src="slider" height=100 edit]

<p></p>

V demu je navíc další element s handlerem `onmouseover`, který zobrazuje aktuální datum.

Prosíme všimněte si, že když přetahujete šoupátko, můžete se nad tento element přesunout a jeho handler se *nespustí*.

Přetahování tedy díky `setPointerCapture` nemá žádné vedlejší efekty.
```

Nakonec nám tedy zachycení ukazatele dává dvě výhody:
1. Kód je čistší, neboť již nemusíme přidávat a odstraňovat handlery na celém `document`. Vazba se odstraní automaticky.
2. Pokud jsou v dokumentu jiné handlery událostí ukazatele, ukazatel je nemůže neúmyslně spustit, když uživatel posunuje posuvníkem.

### Události pro zachycení ukazatele

Pro úplnost se zmíníme ještě o jedné věci.

Se zachycením ukazatele jsou spojeny dvě události:

- `gotpointercapture` se spustí, když element použije `setPointerCapture`, aby umožnil zachycení.
- `lostpointercapture` se spustí, když je zachycení odstraněno: buď výslovně voláním `releasePointerCapture`, nebo automaticky při `pointerup`/`pointercancel`.

## Shrnutí

Události ukazatele nám umožňují zpracovávat události myši, dotekových zařízení a pera současně, stejnou částí kódu.

Události ukazatele rozšiřují události myši. V názvech událostí můžeme nahradit `mouse` za `pointer` a očekávat, že náš kód bude i nadále fungovat pro myš a bude mít lepší podporu zařízení jiných druhů.

Při přetahování a složitých dotekových interakcích, kdy se prohlížeč může rozhodnout zmocnit se jich a zpracovávat je sám, nezapomeňte zakázat standardní akce na událostech nastavením `touch-action: none` v CSS pro elementy, kterých se to týká.

Další schopnosti událostí ukazatele jsou:

- Podpora multidoteku pomocí `pointerId` a `isPrimary`.
- Vlastnosti specifické pro některá zařízení, např. `pressure`, `width/height` a jiné.
- Zachycení ukazatele: můžeme všechny události ukazatele přesměrovat na specifický element až do `pointerup`/`pointercancel`.

V současnosti jsou události ukazatele podporovány ve všech významných prohlížečích, takže na ně můžete bezpečně přejít, zvláště pokud nepotřebujete IE10- a Safari 12-. A i pro tyto prohlížeče existují polyfilly, které umožňují podporu událostí ukazatele.
