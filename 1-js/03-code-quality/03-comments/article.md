# Komentáře

Jak víme z kapitoly <info:structure>, komentáře mohou být jednořádkové, které začínají `//`, a víceřádkové `/* ... */`.

Obvykle je používáme k popisu, jak a proč kód funguje.

Na první pohled může být komentování samozřejmé, ale začínající programátoři je často používají nesprávně.

## Špatné komentáře

Začátečníci tíhnou k psaní komentářů, které vysvětlují, „co se v kódu děje“. Například:

```js
// Tento kód dělá toto (...) a toto (...)
// ...a kdo ví, co jiného...
velmi;
složitý;
kód;
```

V dobrém kódu by však množství takových „vysvětlujících“ komentářů mělo být minimální. Kód by měl být srozumitelný i bez nich.

Platí jedno zlaté pravidlo: „Je-li kód natolik nejasný, že vyžaduje komentář, možná by měl být přepsán.“

### Recept: extrahujte funkce

Někdy se vyplatí nahradit kus kódu funkcí, například:

```js
function zobrazPrvočísla(n) {
  dalšíPrvočíslo:
  for (let i = 2; i < n; i++) {

*!*
    // ověří, zda i je prvočíslo
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue dalšíPrvočíslo;
    }
*/!*

    alert(i);
  }
}
```

Lepší varianta s vyjmutou funkcí `jePrvočíslo`:


```js
function zobrazPrvočísla(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!jePrvočíslo(i)) continue;*/!*

    alert(i);  
  }
}

function jePrvočíslo(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Nyní kódu snadno porozumíme. Funkce sama o sobě se stává komentářem. Takový kód se nazývá *sebepopisující*.

### Recept: vytvářejte funkce

A máme-li dlouhý „kus kódu“, jako třeba:

```js
// zde přidáme whisky
for(let i = 0; i < 10; i++) {
  let kapka = vezmiWhisky();
  přičichni(kapka);
  přidej(kapka, sklenice);
}

// zde přidáme džus
for(let t = 0; t < 3; t++) {
  let rajče = vezmiRajče();
  prozkoumej(rajče);
  let džus = rozmačkej(rajče);
  přidej(džus, sklenice);
}

// ...
```

pak může být lepší varianta jej přepsat do funkcí takto:

```js
přidejWhisky(sklenice);
přidejDžus(sklenice);

function přidejWhisky(nádoba) {
  for(let i = 0; i < 10; i++) {
    let kapka = vezmiWhisky();
    //...
  }
}

function přidejDžus(nádoba) {
  for(let t = 0; t < 3; t++) {
    let rajče = vezmiRajče();
    //...
  }
}
```

Opět funkce samy o sobě říkají, co se děje. Není tady co komentovat. I struktura kódu je lepší, když je kód rozdělený. Je jasné, co která funkce provádí, co přijímá a co vrací.

V realitě se nemůžeme „vysvětlujícím“ komentářům úplně vyhnout. Existují složité algoritmy a existují chytrá „vylepšení“ pro účely optimalizace. Obecně bychom se však měli snažit udržet kód jednoduchý a sebepopisující.

## Dobré komentáře

Vysvětlující komentáře jsou tedy obecně špatné. Jaké komentáře jsou dobré?

Popis architektury
: Poskytují vysokoúrovňový pohled na komponenty, jak spolu komunikují, jaký je řídicí tok v různých situacích... Stručně řečeno -- pohled na kód z ptačí perspektivy. Existuje i speciální jazyk [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) určený k tvorbě diagramů na vysoké úrovni architektury, které popisují kód. Rozhodně má smysl si jej prostudovat.

Dokumentace parametrů a použití funkcí
: Existuje speciální syntaxe [JSDoc](http://en.wikipedia.org/wiki/JSDoc) pro dokumentaci funkcí: použití, parametry, návratová hodnota.

Například:
```js
/**
 * Vrátí x umocněné na n-tou.
 *
 * @param {number} x Číslo, které se má umocnit.
 * @param {number} n Exponent, musí být přirozené číslo.
 * @return {number} x umocněné na n-tou.
 */
function mocnina(x, n) {
  ...
}
```

Takové komentáře nám umožňují porozumět účelu funkce a používat ji správně, aniž bychom se dívali na její kód.

Mimochodem i mnoho editorů, například [WebStorm](https://www.jetbrains.com/webstorm/), jim dokáže porozumět a používá je k našeptávání a automatické kontrole kódu.

Existují i nástroje jako [JSDoc 3](https://github.com/jsdoc/jsdoc), které umějí z těchto komentářů vygenerovat dokumentaci v HTML. Více informací o JSDoc si můžete přečíst na <https://jsdoc.app>.

Proč se tato úloha řeší zrovna takhle?
: To, co je psáno, je důležité. Ale to, co *není* psáno, může být ještě důležitější k pochopení toho, o co jde. Proč je tato úloha řešena právě tímto způsobem? Kód nám odpověď nedává.

    Existuje-li mnoho způsobů, jak tuto úlohu řešit, proč zrovna tento? Zvláště pokud to není zrovna nejzřejmější způsob.

    Bez takových komentářů může nastat následující situace:
    1. Vy (nebo váš kolega) otevřete kód, napsaný před nějakou dobou, a vidíte, že je „suboptimální“.
    2. Pomyslíte si: „To jsem byl tehdy ale hloupý, teď jsem o hodně chytřejší“, a přepíšete ho na „jasnější a korektnější“ variantu.
    3. ...Potřeba přepsat kód byla dobrá. Ale po spuštění uvidíte, že „jasnější“ řešení je ve skutečnosti horší. Matně si vzpomenete proč, jelikož jste je už před dlouhou dobou zkoušeli. Vrátíte kód na korektní variantu, ale byla to ztráta času.

    Komentáře, které vysvětlují řešení, jsou velmi důležité, protože nám pomáhají vyvíjet správnou cestou.

Jsou v kódu nějaké finty? Proč jsou použity?
: Obsahuje-li kód cokoli promyšleného a neintuitivního, má rozhodně smysl jej komentovat.

## Shrnutí

Komentáře jsou důležitým znakem dobrého vývojáře: jejich přítomnost, ale i jejich absence.

Dobré komentáře nám umožňují kód dobře udržovat, později se k němu vracet a efektivněji jej využívat.

**Komentujte toto:**

- Celkovou architekturu, pohled z vysoké úrovně.
- Používání funkcí.
- Důležitá řešení, zvláště pokud nejsou jasná na první pohled.

**Zdržte se komentářů:**

- Které vysvětlují „jak kód funguje“ a „co dělá“.
- Vkládejte je jen tehdy, když není možné udržet kód natolik jednoduchý a sebepopisující, že je nevyžaduje.

Komentáře se také používají pro nástroje automatické dokumentace jako JSDoc3, které je načtou a vygenerují z nich dokumentaci v HTML (nebo v jakémkoli jiném formátu).
