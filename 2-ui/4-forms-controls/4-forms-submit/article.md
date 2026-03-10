# Formuláře: událost a metoda submit

Událost `submit` se spustí, když je formulář odeslán. Obvykle se používá ke kontrole formuláře před jeho odesláním na server nebo ke zrušení odeslání a zpracování formuláře v JavaScriptu.

Metoda `formulář.submit()` umožňuje vyvolat odeslání formuláře z JavaScriptu. Můžeme ji použít k dynamickému vytvoření a odeslání našich vlastních formulářů na server.

Podívejme se na ně podrobněji.

## Událost submit

Formulář lze odeslat dvěma hlavními způsoby:

1. Prvním je kliknutí na `<input type="submit">` nebo `<input type="image">`.
2. Druhým je stisknutí `key:Enter` na vstupním poli.

Obě akce vyvolají na formuláři událost `submit`. Handler může zkontrolovat data, a pokud v nich jsou chyby, zobrazit je a zavolat `událost.preventDefault()`, aby formulář nebyl odeslán na server.

V následujícím formuláři:
1. Vstupte do textového pole a stiskněte `key:Enter`.
2. Klikněte na `<input type="submit">`.

Obě akce zobrazí `alert` a v důsledku `return false` nebude formulář nikam odeslán:

```html autorun height=60 no-beautify
<form onsubmit="alert('odeslat!');return false">
  První způsob: klávesa Enter ve vstupním poli <input type="text" value="text"><br>
  Druhý způsob: klikněte na "odeslat": <input type="submit" value="Odeslat">
</form>
```

````smart header="Vztah mezi `submit` a `click`"
Když je formulář odeslán stisknutím `key:Enter` na vstupním poli, spustí se událost `click` na `<input type="submit">`.

To je docela veselé, protože k žádnému kliknutí nedošlo.

Zde je demo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Vstupte sem a stiskněte Enter">
 <input type="submit" value="Odeslat" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Metoda submit

Chceme-li odeslat formulář na server ručně, můžeme zavolat `formulář.submit()`.

Pak událost `submit` nebude vygenerována. Předpokládá se, že když programátor volá `formulář.submit()`, skript již zpracoval všechno, co bylo potřeba.

Tato metoda se někdy používá k ručnímu vytvoření a odeslání formuláře, například:

```js run
let formulář = document.createElement('form');
formulář.action = 'https://google.com/search';
formulář.method = 'GET';

formulář.innerHTML = '<input name="q" value="test">';

// formulář musí být v dokumentu, abychom jej mohli odeslat
document.body.append(formulář);

formulář.submit();
```
