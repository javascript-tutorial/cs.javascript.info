# Obnovitelné odesílání souboru

Odeslat soubor metodou `fetch` je velice snadné.

Jak obnovit odeslání po ztrátě spojení? Neexistuje pro to žádná vestavěná možnost, ale máme součásti, které nám to umožní implementovat.

Obnovitelné odesílání by mělo přijít společně s oznamováním průběhu odesílání, protože očekáváme velké soubory (pokud máme potřebu je obnovovat). Jelikož `fetch` neumožňuje sledovat průběh odesílání, použijeme [XMLHttpRequest](info:xmlhttprequest).

## Nepříliš užitečná událost průběhu

Abychom mohli odesílání obnovit, potřebujeme vědět, kolik bytů bylo odesláno před ztrátou spojení.

Pro sledování průběhu odesílání máme událost `xhr.upload.onprogress`.

Naneštěstí nám tady tato událost nepomůže obnovit odesílání, protože se spouští, když jsou data *odeslána*, ale byla přijata serverem? To prohlížeč neví.

Možná byla uložena do bufferu místní síťovou proxy, možná vzdálený serverový proces spadl a nemohl je zpracovat, nebo prostě byla ztracena po cestě a nedostala se k příjemci.

Tato událost je tedy užitečná jen k zobrazení hezkého ukazatele průběhu.

Abychom mohli obnovit odesílání, musíme znát *přesný* počet bytů, které server přijal. A ten nám může sdělit jedině server, proto vytvoříme dodatečný požadavek.

## Algoritmus

1. Nejprve vytvoříme identifikátor souboru, aby unikátně identifikoval soubor, který se chystáme odeslat:
    ```js
    let idSouboru = soubor.name + '-' + soubor.size + '-' + soubor.lastModified;
    ```
    Ten je zapotřebí k obnově odesílání, abychom sdělili serveru, co obnovujeme.

    Pokud se změní název, velikost nebo datum poslední změny, vytvoří se jiný `idSouboru`.

2. Pošleme na server požadavek s dotazem, kolik bytů už server má, například:
    ```js
    let odpověď = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // Server má tento počet bytů
    let počátečníByte = +await odpověď.text();
    ```

    Předpokládáme, že server sleduje odesílání souborů podle hlavičky `X-File-Id`. To by mělo být implementováno na straně serveru.

    Jestliže soubor na serveru ještě neexistuje, odpověď serveru by měla být `0`.

3. Pak můžeme použít metodu `slice` objektu `Blob` k odeslání souboru od `počátečníByte`:
    ```js
    xhr.open("POST", "upload");

    // id souboru, aby server věděl, který soubor odesíláme
    xhr.setRequestHeader('X-File-Id', idSouboru);

    // byte, od kterého obnovujeme, aby server věděl, že obnovujeme
    xhr.setRequestHeader('X-Start-Byte', počátečníByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Odesláno ${počátečníByte + e.loaded} z ${počátečníByte + e.total}`);
    };

    // soubor může být z input.files[0] nebo jiného zdroje
    xhr.send(soubor.slice(počátečníByte));
    ```

    Zde posíláme serveru jak identifikátor souboru v hlavičce `X-File-Id`, aby server věděl, který soubor odesíláme, tak počáteční byte v hlavičce `X-Start-Byte`, aby server věděl, že soubor neodesíláme od začátku, ale obnovujeme přerušené odesílání.

    Server by si měl projít své záznamy, a pokud tento soubor dříve přijímal a aktuální velikost přijatých dat je přesně `X-Start-Byte`, měl by nová data připojit k němu.


Následuje demo s kódem klienta i serveru, napsané v Node.js.

Na této stránce funguje jen částečně, protože Node.js je za jiným serverem jménem Nginx, který si přijatá data ukládá do bufferu a předává je Node.js, až když jsou zcela kompletní.

Můžete si však demo stáhnout a pro plnou ukázku si je spustit lokálně:

[codetabs src="upload-resume" height=200]

Jak vidíme, moderní síťové metody se svými možnostmi blíží správcům souborů -- máme kontrolu nad hlavičkami, indikátor průběhu, posílání částí souborů a podobně.

Můžeme implementovat obnovitelné odesílání a mnoho dalšího.
