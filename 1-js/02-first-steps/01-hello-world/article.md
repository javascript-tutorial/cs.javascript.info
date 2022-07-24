# Ahoj, světe!

Tato část tutoriálu pojednává o základech JavaScriptu, o samotném jazyce.

Potřebujeme však pracovní prostředí, v němž budeme spouštět skripty. Protože tato kniha je online, prohlížeč je dobrá volba. Budeme však udržovat množství příkazů specifických pro prohlížeč (např. `alert`) na minimu, abyste nad nimi nemuseli ztrácet čas, jestliže se plánujete zaměřit na jiné prostředí (např. Node.js). Na JavaScript v prohlížeči se zaměříme v [další části](/ui) tutoriálu.

Nejprve se podíváme, jak vložit skript na webovou stránku. V prostředích na straně serveru (např. Node.js) můžete spustit skript příkazem, například `"node my.js"`.


## Značka „script“

Programy v JavaScriptu můžeme vložit téměř kamkoli v HTML dokumentu pomocí značky `<script>`.

Příklad:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Před skriptem...</p>

*!*
  <script>
    alert( 'Ahoj, světe!' );
  </script>
*/!*

  <p>...a za skriptem.</p>

</body>

</html>
```

```online
Příklad si můžete přehrát kliknutím na tlačítko „Přehrát“ v pravém horním rohu ve výše uvedeném okně.
```

Značka `<script>` obsahuje kód v JavaScriptu, který se spustí automaticky, když prohlížeč začne tuto značku zpracovávat.


## Moderní značení

Značka `<script>` má některé atributy, které se v současnosti používají jen zřídka, ale stále je můžeme najít ve starším kódu:

Atribut `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Starý standard HTML, HTML4, vyžadoval, aby skript byl určitého typu (`type`). Obvykle to byl `type="text/javascript"`. To už dnes není nutné. Kromě toho moderní standard HTML zcela změnil význam tohoto atributu, který se dnes může používat pro moduly JavaScriptu. To je však pokročilejší záležitost. Na moduly se zaměříme v další části tohoto tutoriálu.

Atribut `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Tento atribut měl oznamovat jazyk (language) skriptu. Protože výchozím jazykem je dnes JavaScript, nemá již tento atribut smysl a není třeba jej používat.

Komentáře před a za skripty.
: V zastaralých knihách a průvodcích můžete uvnitř značky `<script>` najít takovéto komentáře:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Tento trik se v moderním JavaScriptu již nepoužívá. Tyto komentáře znepřístupňovaly JavaScriptový kód starým prohlížečům, které neuměly zpracovat značku `<script>`. Protože každý prohlížeč vydaný v posledních 15 letech to umí, můžete podle tohoto komentáře poznat opravdu starý kód.


## Externí skripty

Máme-li větší množství kódu v JavaScriptu, můžeme jej uložit do samostatného souboru.

Tyto soubory se přidávají do HTML pomocí atributu `src`:

```html
<script src="/cesta/ke/skriptu.js"></script>
```

Zde `/cesta/ke/skriptu.js` je absolutní cesta ke skriptu z kořenové složky webového sídla. Můžeme uvést i relativní cestu od aktuální stránky. Například `src="script.js"`, stejně jako `src="./script.js"`, by znamenalo soubor `"script.js"` v aktuální složce.

Můžeme poskytnout i úplné URL. Například:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

Chceme-li připojit více skriptů, použijeme více značek:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Bývá pravidlem, že do HTML se ukládají jen ty nejjednodušší skripty. Složitější se umisťují do oddělených souborů.

Výhodou odděleného souboru je, že prohlížeč si jej stáhne a uloží do své [mezipaměti](https://en.wikipedia.org/wiki/Web_cache).

Jiné stránky, které se odkazují na stejný skript, si jej místo opětovného stažení nahrají z mezipaměti, takže se soubor ve skutečnosti stáhne pouze jednou.

Tím se snižuje přenos dat a načítání stránek je tak rychlejší.
```

````warn header="Je-li nastaveno `src`, obsah značky se ignoruje."
Jedna značka `<script>` nemůže obsahovat atribut `src` a kód současně.

Tohle nebude fungovat:

```html
<script *!*src*/!*="soubor.js">
  alert(1); // obsah je ignorován, protože je nastaveno src
</script>
```

Musíme si vybrat mezi externím `<script src="…">` a vloženým `<script>` skriptem.

Výše uvedený příklad může fungovat, když jej rozdělíme do dvou skriptů:

```html
<script src="soubor.js"></script>
<script>
  alert(1);
</script>
```
````

## Shrnutí

- JavaScriptový kód můžeme umístit na stránku pomocí značky `<script>`.
- Atributy `type` a `language` nejsou vyžadovány.
- Skript v externím souboru lze vložit pomocí `<script src="cesta/ke/skriptu.js"></script>`.


O skriptech v prohlížeči a jejich interakcí s webovou stránkou toho lze napsat mnohem více. Mějme však na paměti, že tato část tutoriálu je věnována pouze jazyku JavaScript, takže bychom se zde neměli zatěžovat specifiky jeho implementací v prohlížečích. Ke spouštění skriptů v JavaScriptu budeme používat prohlížeč, což je při online čtení velmi výhodné, ale je to jen jedna z mnoha možností.
