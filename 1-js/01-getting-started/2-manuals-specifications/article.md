
# Manuály a specifikace

<<<<<<< HEAD
Tato kniha je *tutoriál*, jehož cílem je pomoci vám postupně se naučit jazyk. Až ovšem budete znát základy, budete potřebovat i jiné zdroje.
=======
This book is a *tutorial*. It aims to help you gradually learn the language. But once you're familiar with the basics, you'll need other resources.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

## Specifikace

[Specifikace ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm) obsahuje nejhlubší, nejpodrobnější a nejformalizovanější informace o JavaScriptu. Ta definuje tento jazyk.

Avšak právě kvůli této vysoké formálnosti je obtížné jí na první pohled porozumět. Potřebujete-li tedy co nejdůvěryhodnější zdroj informací o detailech JavaScriptu, tato specifikace je správné místo. Ke každodennímu použití se však nehodí.

<<<<<<< HEAD
Každý rok se vydává nová verze specifikace. Poslední návrh nového vydání specifikace najdete na <https://tc39.es/ecma262/>.
=======
A new specification version is released every year. Between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Chcete-li si přečíst o zbrusu nových vlastnostech, včetně těch, které jsou „téměř standardem“ (tzv. „3. stadium“), viz propozice na <https://github.com/tc39/proposals>.

Pokud vyvíjíte pro prohlížeč, existují i další specifikace uvedené ve [druhé části](info:browser-environment) tutoriálu.

## Manuály

- **MDN (Mozilla) JavaScript Reference** je manuál s příklady a dalšími informacemi. Výborně poslouží pro získání podrobných informací o jednotlivých funkcích jazyka, metodách atd.

<<<<<<< HEAD
	Lze jej najít na <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.
	
	Často je však nejlepší použít obyčejné internetové vyhledávání. Do dotazu jednoduše napište „MDN [pojem]“, např. pro vyhledávání funkce `parseInt` zadejte <https://google.com/search?q=MDN+parseInt>.

- **MSDN** – Manuál od Microsoftu s mnoha informacemi včetně těch o JavaScriptu (v IE se mu říká JScript). Potřebujete-li něco specifického ohledně Internet Exploreru, je lepší zavítat na: <http://msdn.microsoft.com/>.
=======
    You can find it at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for the `parseInt` function.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

	Můžete také použít internetové vyhledávání s frázemi jako „RegExp MSDN“ nebo „RegExp MSDN jscript“.

## Tabulky kompatibility

JavaScript je neustále vyvíjen a pravidelně se do něj přidávají nové vlastnosti.

<<<<<<< HEAD
Chcete-li vědět, v jakých enginech jsou tyto vlastnosti už podporovány, podívejte se na:
- <https://caniuse.com> - pro každou vlastnost obsahuje tabulku enginů, které ji podporují, např. chcete-li vidět, které enginy podporují moderní kryptografické funkce, jděte na <http://caniuse.com/#feat=cryptography>. 
- <httpss://kangax.github.io/compat-table> - tabulka vlastností jazyka a enginů, které je podporují nebo nepodporují.

Všechny tyto zdroje se vám budou při vývoji hodit, jelikož obsahují cenné informace o detailech jazyka, jejich podpoře apod.
=======
- <https://caniuse.com> - per-feature tables of support, e.g. to see which engines support modern cryptography functions: <https://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - a table with language features and engines that support those or don't support.

All these resources are useful in real-life development, as they contain valuable information about language details, their support, etc.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

Pamatujte si je (nebo tuto stránku) pro případ, že byste potřebovali podrobné informace o určité vlastnosti.
