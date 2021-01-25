
# Manuály a specifikace

Tato kniha je *tutoriál*, jehož cílem je pomoci vám postupně se naučit jazyk. Až ovšem budete znát základy, budete potřebovat i jiné zdroje.

## Specifikace

[Specifikace ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm) obsahuje nejhlubší, nejpodrobnější a nejformalizovanější informace o JavaScriptu. Ta definuje tento jazyk.

Avšak právě kvůli této vysoké formálnosti je obtížné jí na první pohled porozumět. Potřebujete-li tedy co nejdůvěryhodnější zdroj informací o detailech JavaScriptu, tato specifikace je správné místo. Ke každodennímu použití se však nehodí.

Každý rok se vydává nová verze specifikace. Poslední návrh nového vydání specifikace najdete na <https://tc39.es/ecma262/>.

Chcete-li si přečíst o zbrusu nových vlastnostech, včetně těch, které jsou „téměř standardem“ (tzv. „3. stadium“), viz propozice na <https://github.com/tc39/proposals>.

<<<<<<< HEAD
Pokud vyvíjíte pro prohlížeč, existují i další specifikace uvedené ve [druhé části](info:browser-environment) tutoriálu.
=======
Also, if you're in developing for the browser, then there are other specifications covered in the [second part](info:browser-environment) of the tutorial.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

## Manuály

<<<<<<< HEAD
- **MDN (Mozilla) JavaScript Reference** je manuál s příklady a dalšími informacemi. Výborně poslouží pro získání podrobných informací o jednotlivých funkcích jazyka, metodách atd.
=======
- **MDN (Mozilla) JavaScript Reference** is the main manual with examples and other information. It's great to get in-depth information about individual language functions, methods etc.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

	Lze jej najít na <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.
	
	Často je však nejlepší použít obyčejné internetové vyhledávání. Do dotazu jednoduše napište „MDN [pojem]“, např. pro vyhledávání funkce `parseInt` zadejte <https://google.com/search?q=MDN+parseInt>.

<<<<<<< HEAD

- **MSDN** – Manuál od Microsoftu s mnoha informacemi včetně těch o JavaScriptu (v IE se mu říká JScript). Potřebujete-li něco specifického ohledně Internet Exploreru, je lepší zavítat na: <http://msdn.microsoft.com/>.

	Můžete také použít internetové vyhledávání s frázemi jako „RegExp MSDN“ nebo „RegExp MSDN jscript“.

## Tabulky kompatibility
=======
Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for `parseInt` function.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

JavaScript je neustále vyvíjen a pravidelně se do něj přidávají nové vlastnosti.

Chcete-li vědět, v jakých enginech jsou tyto vlastnosti už podporovány, podívejte se na:

- <http://caniuse.com> - pro každou vlastnost obsahuje tabulku enginů, které ji podporují, např. chcete-li vidět, které enginy podporují moderní kryptografické funkce, jděte na <http://caniuse.com/#feat=cryptography>. 
- <https://kangax.github.io/compat-table> - tabulka vlastností jazyka a enginů, které je podporují nebo nepodporují.

Všechny tyto zdroje se vám budou při vývoji hodit, jelikož obsahují cenné informace o detailech jazyka, jejich podpoře apod.

Pamatujte si je (nebo tuto stránku) pro případ, že byste potřebovali podrobné informace o určité vlastnosti.
