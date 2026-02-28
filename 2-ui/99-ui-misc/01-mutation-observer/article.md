
# Pozorovatel změn

Objekt třídy `MutationObserver` je zabudovaný objekt, který pozoruje DOM element a spustí callback, když detekuje změnu.

Nejprve se podíváme na syntaxi a pak prozkoumáme případy použití z reálného světa, abychom viděli, kdy se něco takového může hodit.

## Syntaxe

Používání `MutationObserver` je snadné.

Napřed vytvoříme pozorovatele s callbackovou funkcí:

```js
let pozorovatel = new MutationObserver(callback);
```

A pak jej připojíme k DOM uzlu:

```js
pozorovatel.observe(uzel, konfigurace);
```

`konfigurace` je objekt s booleovskými možnostmi „na které druhy změn reagovat“:
- `childList` -- změny v přímých dětech uzlu `uzel`,
- `subtree` -- ve všech potomcích uzlu `uzel`,
- `attributes` -- v atributech uzlu `uzel`,
- `attributeFilter` -- pole názvů atributů, abychom mohli sledovat jen vybrané,
- `characterData` -- zda sledovat `uzel.data` (textový obsah).

Několik dalších možností:
- `attributeOldValue` -- pokud je `true`, předá se callbacku stará i nová hodnota atributu (viz níže), v opačném případě pouze nová (potřebuje možnost `attributes`),
- `characterDataOldValue` -- pokud je `true`, předá se callbacku stará i nová hodnota `uzel.data` (viz níže), v opačném případě pouze nová (potřebuje možnost `characterData`),

Pak se po každé změně spustí `callback`: změny se předají v prvním argumentu jako seznam objektů třídy [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) a jako druhý argument se předá sám pozorovatel.

Objekty třídy [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) mají následující vlastnosti:

- `type` -- typ změny, jeden z následujících:
    - `"attributes"`: změna atributu,
    - `"characterData"`: změna dat, používá se u textových uzlů,
    - `"childList"`: přidány/odstraněny dětské elementy,
- `target` -- kde ke změně došlo: u změny `"attributes"` element, u změny `"characterData"` textový uzel, u změny `"childList"` element,
- `addedNodes/removedNodes` -- uzly, které byly přidány/odstraněny,
- `previousSibling/nextSibling` -- předchozí a následující sourozenec přidaných/odstraněných uzlů,
- `attributeName/attributeNamespace` -- název/jmenný prostor (pro XML) změněného atributu,
- `oldValue` -- původní hodnota, jen u změn atributů a textu, pokud je nastavena příslušná možnost `attributeOldValue`/`characterDataOldValue`.

Například zde máme `<div>` s atributem `contentEditable`. Tento atribut nám umožňuje na něj vstoupit a editovat ho.

```html run
<div contentEditable id="elem">Klikněte sem a <b>editujte</b>, prosím</div>

<script>
let pozorovatel = new MutationObserver(záznamyZměn => {
  console.log(záznamyZměn); // console.log(změny)
});

// sleduje všechno kromě atributů
pozorovatel.observe(elem, {
  childList: true, // sleduje přímé děti
  subtree: true, // i nižší potomky
  characterDataOldValue: true // předává callbacku stará data
});
</script>
```

Spustíme-li tento kód v prohlížeči, vstoupíme do příslušného `<div>` a změníme text uvnitř `<b>editujte</b>`, `console.log` nám zobrazí jednu změnu:

```js
záznamyZměn = [{
  type: "characterData",
  oldValue: "edit",
  target: <textový uzel>,
  // ostatní vlastnosti jsou prázdné
}];
```

Pokud učiníme složitější editační operace, např. odstraníme `<b>editujte</b>`, událost změny může obsahovat více záznamů o změnách:

```js
záznamyZměn = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <textový uzel>,
  previousSibling: <textový uzel>
  // ostatní vlastnosti jsou prázdné
}, {
  type: "characterData"
  target: <textový uzel>
  // ...detaily změny závisejí na tom, jak prohlížeč takové odstranění zpracuje
  // může spojit dva sousední textové uzly „editujte“ a „, prosím“ do jednoho uzlu
  // nebo je může ponechat jako dva samostatné uzly
}];
```

`MutationObserver` tedy umožňuje reagovat na jakékoli změny uvnitř DOM podstromu.

## Použití pro integraci

Kdy se taková věc může hodit?

Představme si situaci, kdy potřebujeme přidat skript třetí strany, který obsahuje užitečnou funkcionalitu, ale také provádí něco nechtěného, např. zobrazuje reklamy `<div class="reklamy">Nechtěné reklamy</div>`.

Skript třetí strany pochopitelně neposkytuje žádný mechanismus, jak je odstranit.

Použitím `MutationObserver` můžeme detekovat, kdy se nechtěný element objeví v našem DOMu, a odstranit ho.

Existují i jiné situace, kdy skript třetí strany něco přidává do našeho dokumentu a my bychom chtěli detekovat, kdy se to stane, abychom tomu přizpůsobili stránku, něčemu dynamicky změnili velikost a podobně.

`MutationObserver` nám to umožňuje implementovat.

## Použití pro architekturu

Existují i situace, v nichž se `MutationObserver` hodí z architektonického hlediska.

Řekněme, že vytváříme webové stránky o programování. Články a jiné materiály pochopitelně mohou obsahovat úryvky zdrojového kódu.

Takový úryvek v HTML vypadá následovně:

```html
...
<pre class="language-javascript"><code>
  // zde je kód
  let ahoj = "světe";
</code></pre>
...
```

Pro lepší čitelnost a současně pro zkrášlení budeme na našich stránkách používat JavaScriptovou knihovnu pro zvýraznění syntaxe, např. [Prism.js](https://prismjs.com/). Abychom pro uvedený úryvek kódu zajistili zvýraznění syntaxe touto knihovnou, voláme funkci `Prism.highlightElem(pre)`, která prozkoumá obsah takových elementů `pre` a přidá do nich speciální značky a styly pro barevné zvýraznění syntaxe podobně, jak vidíte v příkladech zde na této stránce.

Kdy přesně bychom měli spustit tuto zvýrazňovací metodu? Můžeme to udělat v události `DOMContentLoaded` nebo umístit skript na konec stránky. V té chvíli je náš DOM připraven a my můžeme najít elementy `pre[class*="language"]` a zavolat na nich `Prism.highlightElem`:

```js
// zvýrazní všechny úryvky kódu na stránce
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Dosud je všechno jednoduché, že? Najdeme v HTML kódu úryvky kódu a zvýrazníme je.

Teď pojďme dál. Řekněme, že chceme dynamicky přidávat materiály ze serveru. Metody, jak na to, prostudujeme [později v tomto tutoriálu](info:fetch). Prozatím je podstatné jen to, že na požádání stáhneme HTML článek z webového serveru a zobrazíme jej:

```js
let článek = /* stáhneme nový obsah ze serveru */
článekElem.innerHTML = článek;
```

Nový HTML `článek` může obsahovat úryvky kódu. Musíme na ně volat `Prism.highlightElem`, jinak nebudou zvýrazněny.

**Kdy a kde volat `Prism.highlightElem` pro dynamicky načtený článek?**

Můžeme toto volání připojit ke kódu, který načte článek, například takto:

```js
let článek = /* stáhneme nový obsah ze serveru */
článekElem.innerHTML = článek;

*!*
let úryvky = článekElem.querySelectorAll('pre[class*="language-"]');
úryvky.forEach(Prism.highlightElem);
*/!*
```

...Jenže představme si, že v kódu máme spoustu míst, kde načítáme obsah -- články, kvízy, příspěvky ve fórech atd. Musíme umístit volání zvýrazňovací funkce všude, abychom zvýraznili kód v obsahu po načtení? To není příliš pohodlné.

A co když je obsah načten modulem třetí strany? Máme například fórum, které napsal někdo jiný a které načítá obsah dynamicky, a chtěli bychom do něj přidat zvýrazňování syntaxe. Nikdo není rád, když musí provádět změny ve skriptech třetích stran.

Naštěstí je tady jiná možnost.

Můžeme pomocí `MutationObserver` automaticky detekovat, kdy jsou úryvky kódu vloženy na stránku, a zvýraznit je.

Tím budeme zpracovávat funkcionalitu zvýrazňování na jediném místě a nebudeme mít potřebu ji integrovat.

### Demo dynamického zvýrazňování

Uvedeme funkční příklad.

Spustíte-li tento kód, začne sledovat element pod sebou a zvýrazní všechny úryvky kódu, které se v něm objeví:

```js run
let pozorovatel = new MutationObserver(změny => {

  for(let změna of změny) {
    // prozkoumáme nové uzly, je tady něco ke zvýraznění?

    for(let uzel of změna.addedNodes) {
      // sledujeme jen elementy, ostatní uzly (např. textové) přeskakujeme
      if (!(uzel instanceof HTMLElement)) continue;

      // ověříme, zda vložený element je úryvek kódu
      if (uzel.matches('pre[class*="language-"]')) {
        Prism.highlightElement(uzel);
      }

      // nebo je úryvek kódu někde v jeho podstromu?
      for(let elem of uzel.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('demo-zvýraznění');

pozorovatel.observe(demoElem, {childList: true, subtree: true});
```

Níže je uveden HTML element a JavaScript, který jej dynamicky vyplní pomocí `innerHTML`.

Prosíme, spusťte si předcházející kód (výše, sleduje element) a pak níže uvedený kód. Uvidíte, jak `MutationObserver` detekuje a zvýrazní úryvek.

<p id="demo-zvýraznění" style="border: 1px solid #ddd">Demo element s <code>id="demo-zvýraznění"</code>, výše uvedený kód jej po spuštění bude sledovat.</p>

Následující kód vyplní jeho `innerHTML`, což způsobí, že `MutationObserver` zareaguje a zvýrazní jeho obsah:

```js run
let demoElem = document.getElementById('demo-zvýraznění');

// dynamicky vloží obsah s úryvky kódu
demoElem.innerHTML = `Následuje úryvek kódu:
  <pre class="language-javascript"><code> let ahoj = "světe!"; </code></pre>
  <div>Další:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Nyní máme `MutationObserver`, který může zajišťovat veškeré zvýrazňování ve sledovaných elementech nebo v celém `document`. Můžeme přidávat a odstraňovat úryvky kódu v HTML, aniž bychom na to museli myslet.

## Další metody

K zastavení sledování uzlu slouží následující metoda:

- `pozorovatel.disconnect()` -- zastaví sledování.

Když zastavíme sledování, může se stát, že pozorovatel ještě nezpracoval některé změny. V takových případech použijeme

- `pozorovatel.takeRecords()` -- vrátí seznam nezpracovaných záznamů změn -- ty, které se udály, ale callback je nezpracoval.

Tyto metody můžeme použít společně, například:

```js
// získáme seznam nezpracovaných změn
// mělo by být voláno před odpojením,
// pokud vás zajímají možné nezpracované nedávné změny
let záznamyZměn = pozorovatel.takeRecords();

// zastavíme sledování změn
pozorovatel.disconnect();
...
```


```smart header="Záznamy vrácené metodou `pozorovatel.takeRecords()` budou odstraněny z fronty zpracování"
Callback se nebude volat pro záznamy, které vrátila metoda `pozorovatel.takeRecords()`.
```

```smart header="Interakce se sběračem odpadků"
Pozorovatelé interně používají slabé odkazy na uzly. To znamená, že když je uzel odstraněn z DOMu a stane se nedosažitelným, může být odstraněn sběračem odpadků.

Skutečnost, že DOM uzel je sledován pozorovatelem, nebrání v jeho odstranění sběračem.
```

## Shrnutí

`MutationObserver` umí reagovat na změny v DOMu -- změny atributů, textového obsahu a přidávání i odebírání elementů.

Můžeme jej použít ke sledování změn, které provádějí jiné části našeho kódu, ale i pro integraci se skripty třetích stran.

`MutationObserver` může sledovat jakékoli změny. Pro optimalizaci se používají konfigurační možnosti „co sledovat“, abychom neplýtvali zdroji na nepotřebné vyvolávání callbacku.
