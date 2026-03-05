
# Události myši

V této kapitole pronikneme do dalších detailů ohledně událostí myši a jejich vlastností.

Prosíme všimněte si, že tyto události mohou přicházet nejenom z myši, ale i z jiných zařízení, např. telefonů a tabletů, kde jsou emulovány z důvodu zachování kompatibility.

## Typy událostí myši

Některé z těchto událostí jsme už viděli:

`mousedown/mouseup`
: Nad elementem je stisknuto/uvolněno tlačítko myši.

`mouseover/mouseout`
: Nad element vstoupí/element opustí ukazatel myši.

`mousemove`
: Tuto událost vyvolá každý pohyb myši nad elementem.

`click`
: Spustí se po `mousedown` a pak `mouseup` nad stejným elementem, jestliže bylo použito levé tlačítko myši.

`dblclick`
: Spustí se po dvou kliknutích na stejný element v krátkém časovém rozmezí. V současnosti se používá zřídka.

`contextmenu`
: Spustí se, když je stisknuto pravé tlačítko myši. Jsou i jiné způsoby, jak otevřít kontextové menu, např. stisknutím speciální klávesy na klávesnici. V takovém případě se tato událost spustí také, takže to není pouze událost myši.

...Existuje i několik dalších událostí, které probereme později.

## Pořadí událostí

Jak vidíte z uvedeného seznamu, jedna uživatelská akce může spustit více událostí.

Například stisk levého tlačítka myši vyvolá nejprve `mousedown`, když je tlačítko stisknuto, a pak `mouseup` a `click`, když je uvolněno.

V případech, kdy jedna akce vyvolá více událostí, je jejich pořadí pevně dáno. To znamená, že handlery jsou volány v pořadí `mousedown` -> `mouseup` -> `click`.

```online
Klikněte na následující tlačítko a uvidíte události. Zkuste si i dvojité kliknutí.

V uvedeném testu jsou všechny události myši logovány, a pokud je mezi nimi delší prodleva než 1 sekunda, budou odděleny vodorovnou čarou.

Vidíme také vlastnost `button`, která nám umožňuje zjistit, o které tlačítko šlo; vysvětlíme ji dále.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Klikněte na mě pravým nebo levým tlačítkem myši" type="button"> <input onclick="logClear('test')" value="Vymazat" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Tlačítko myši

Události týkající se klikání mají vždy vlastnost `button`, která nám umožňuje přesně zjistit tlačítko.

Při událostech `click` a `contextmenu` ji obvykle nepoužíváme, jelikož první uvedená se stává jen při kliknutí levým tlačítkem a druhá při kliknutí pravým.

Naproti tomu `mousedown` a `mouseup` mohou `událost.button` potřebovat, protože tyto události se spouštějí při každém tlačítku, takže nám `button` umožní rozlišovat mezi „stiskem pravého tlačítka“ a „stiskem levého tlačítka“.

Možné hodnoty `událost.button` jsou:

| Stav tlačítka | `událost.button` |
|--------------|----------------|
| Levé tlačítko (primární) | 0 |
| Prostřední tlačítko (pomocné) | 1 |
| Pravé tlačítko (sekundární) | 2 |
| Tlačítko X1 (zpět) | 3 |
| Tlačítko X2 (dopředu) | 4 |

Většina myší má jen levé a pravé tlačítko, takže možné hodnoty jsou `0` a `2`. Podobné události generují i doteková zařízení, když se jich uživatel dotkne.

Existuje také vlastnost `událost.buttons`, která obsahuje všechna stisknutá tlačítka ve formě celého čísla, jeden bit pro každé tlačítko. V praxi se tato vlastnost používá jen velmi zřídka. Kdybyste ji někdy potřebovali, naleznete podrobnosti na [MDN](mdn:/api/MouseEvent/buttons).

```warn header="Zastaralá `událost.which`"
Starý kód může využívat vlastnost `událost.which`, která představuje starý a nestandardní způsob, jak zjistit tlačítko. Má tyto možné hodnoty:

- `událost.which == 1` – levé tlačítko,
- `událost.which == 2` – prostřední tlačítko,
- `událost.which == 3` – pravé tlačítko.

V současnosti je `událost.which` zastaralá a neměli bychom ji používat.
```

## Modifikátory: shift, alt, ctrl a meta

Všechny události myši obsahují informaci o stisknutých modifikačních klávesách.

Vlastnosti událostí:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (nebo `key:Opt` na Macu)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` na Macu

Jsou `true`, jestliže byla během události stisknuta odpovídající klávesa.

Například následující tlačítko funguje jen při kliknutí spolu se stisknutím `key:Alt+Shift`:

```html autorun height=60
<button id="tlačítko">Alt+Shift+Klikněte na mě!</button>

<script>
  tlačítko.onclick = function(událost) {
*!*
    if (událost.altKey && událost.shiftKey) {
*/!*
      alert('Hurá!');
    }
  };
</script>
```

```warn header="Upozornění: na Macu je místo `Ctrl` zpravidla `Cmd`"
Ve Windows a Linuxu jsou modifikační klávesy `key:Alt`, `key:Shift` a `key:Ctrl`. Na Macu je ještě jedna: `key:Cmd`, které odpovídá vlastnost `metaKey`.

Ve většině aplikací platí, že tam, kde Windows/Linux používá `key:Ctrl`, se na Macu používá `key:Cmd`.

To znamená, že když uživatel Windows stiskne `key:Ctrl+Enter` nebo `key:Ctrl+A`, uživatel Macu by stiskl `key:Cmd+Enter` nebo `key:Cmd+A`, a podobně.

Jestliže tedy chceme podporovat kombinace jako `key:Ctrl`+kliknutí, na Macu dává smysl použít `key:Cmd`+kliknutí. Pro uživatele Macu je to pohodlnější.

I kdybychom chtěli přinutit uživatele Macu stisknout `key:Ctrl`+kliknout, je to poněkud obtížné. Problém spočívá v tom, že levé kliknutí spolu s `key:Ctrl` je v MacOS interpretováno jako *pravé kliknutí* a vygeneruje událost `contextmenu`, ne `click` jako Windows/Linux.

Pokud tedy chceme, aby se uživatelé všech operačních systémů cítili pohodlně, měli bychom spolu s `ctrlKey` kontrolovat i `metaKey`.

Pro kód v JS to znamená, že bychom měli kontrolovat `if (událost.ctrlKey || událost.metaKey)`.
```

```warn header="Jsou také mobilní zařízení"
Klávesové kombinace jsou vhodné jako doplněk k práci. Jestliže uživatel používá klávesnici, fungují.

Pokud ji však jeho zařízení nemá, měl by existovat způsob, jak se obejít i bez modifikačních kláves.
```

## Souřadnice: clientX/Y, pageX/Y

Všechny události myši poskytují souřadnice dvěma způsoby:

1. Relativní vzhledem k oknu: `clientX` a `clientY`.
2. Relativní vzhledem k dokumentu: `pageX` a `pageY`.

Rozdíl mezi nimi jsme již probrali v kapitole <info:coordinates>.

Ve zkratce, souřadnice relativní vzhledem k dokumentu `pageX/Y` se počítají od levého horního rohu dokumentu a při rolování stránky se nemění, zatímco `clientX/Y` se počítají od aktuálního levého horního rohu okna, a když stránka roluje, mění se.

Máme-li například okno o rozměrech 500x500 a myš je v levém horním rohu, pak `clientX` a `clientY` jsou `0` bez ohledu na to, kam je stránka odrolovaná.

A jestliže je myš uprostřed, pak `clientX` a `clientY` jsou `250` bez ohledu na to, na kterém místě dokumentu se myš nachází. V tomto ohledu se podobají `position:fixed`.

````online
Přesuňte myš nad vstupní pole, abyste viděli `clientX/clientY` (příklad je umístěn v `iframe`, takže souřadnice jsou relativní vzhledem k tomuto `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Přesuňte myš na mě">
```
````

## Zákaz výběru textu při události mousedown

Dvojité kliknutí myší má jeden vedlejší efekt, který může být v některých rozhraních rušivý: vybírá text.

Například dvojité kliknutí na následující text jej kromě spuštění našeho handleru vybere:

```html autorun height=50
<span ondblclick="alert('dblclick')">Dvakrát na mě klikněte</span>
```

Rovněž když uživatel stiskne levé tlačítko myši a bez jeho uvolnění myší pohne, vyvolá tím výběr, často nechtěný.

Způsobů, jak výběr zakázat, existuje víc. Můžete si o nich přečíst v kapitole <info:selection-range>.

V tomto konkrétním případě je nejrozumnějším způsobem zakázat akci prohlížeče při události `mousedown`. Tím zakážeme oba tyto výběry:

```html autorun height=50
Před...
<b ondblclick="alert('Klik!')" *!*onmousedown="return false"*/!*>
  Dvakrát na mě klikněte
</b>
...Za
```

Nyní nebude tučný element při dvojitém kliknutí vybrán a ani stisknutí levého tlačítka na něm nevyvolá výběr.

Prosíme všimněte si, že vybrat text uvnitř je stále možné. Výběr by však neměl začínat na samotném textu, ale před nebo za ním. Tak se to uživatelům obvykle hodí.

````smart header="Zákaz kopírování"
Jestliže chceme zakázat výběr proto, abychom chránili obsah naší stránky před zkopírováním a vložením jinam, můžeme použít jinou událost: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Zákaz kopírování!');return false"*/!*>
  Drahý uživateli,
  kopírování je ti zakázáno.
  Pokud ovšem znáš JS nebo HTML, můžeš i tak všechno získat ze zdrojového kódu stránky.
</div>
```
Pokud se pokusíte zkopírovat část textu uvnitř `<div>`, nepůjde to, protože standardní akce `oncopy` byla zakázána.

Samozřejmě uživatel má přístup k HTML kódu stránky a může získat obsah odtamtud, avšak ne každý to umí.
````

## Shrnutí

Události myši mají následující vlastnosti:

- Tlačítko: `button`.
- Modifikační klávesy (`true`, je-li stisknuta): `altKey`, `ctrlKey`, `shiftKey` a `metaKey` (Mac).
  - Pokud chcete zpracovat `key:Ctrl`, nezapomínejte na uživatele Macu, kteří obvykle používají `key:Cmd`, proto je lepší kontrolovat `if (e.metaKey || e.ctrlKey)`.

- Souřadnice vzhledem k oknu: `clientX/clientY`.
- Souřadnice vzhledem k dokumentu: `pageX/pageY`.

Standardní akce prohlížeče při `mousedown` je výběr textu. Pokud se do rozhraní nehodí, měli byste ho zakázat.

V následující kapitole uvidíme další podrobnosti o událostech, které následují po pohybu ukazatele, a o tom, jak sledovat změny elementů pod ním.