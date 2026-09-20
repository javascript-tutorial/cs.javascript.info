# Katastrofický zpětný průchod

Některé regulární výrazy vypadají jednoduše, ale mohou běžet velmi, velmi dlouhou dobu a dokonce způsobit „zamrznutí“ motoru JavaScriptu.

Většina vývojářů se s tímto chováním dříve nebo později setká. Jeho typickým symptomem je, že regulární výraz někdy funguje dobře, ale na určitých řetězcích se „zasekne“ a spotřebuje 100% CPU.

V takovém případě webový prohlížeč navrhne zastavit skript a obnovit stránku. To zcela jistě není dobrá věc.

V JavaScriptu na serverové straně může takový RV zablokovat serverový proces, což je ještě horší. Proto bychom se na to rozhodně měli podívat.

## Příklad

Řekněme, že máme řetězec a chceme zkontrolovat, zda se skládá ze slov `pattern:\w+` s možnou mezerou `pattern:\s?` za každým z nich.

Očividný způsob, jak vytvořit regulární výraz, by byl vzít slovo následované nepovinnou mezerou `pattern:\w+\s?` a pak je opakovat pomocí `*`.

To vede k regulárnímu výrazu `pattern:^(\w+\s?)*$`. Specifikuje žádné nebo více takových slov, začíná na začátku řádku `pattern:^` a končí na jeho konci `pattern:$`.

V akci:

```js run
let rv = /^(\w+\s?)*$/;

alert( rv.test("Dobry retezec") ); // true
alert( rv.test("Spatne znaky: $@#") ); // false
```

Vypadá to, že tento RV funguje. Výsledek je správný. Ale na některých řetězcích trvá velmi dlouhou dobu. Tak dlouho, že motor JavaScriptu „zamrzne“ a spotřebuje 100% výkonu CPU.

Jestliže si spustíte následující příklad, neuvidíte pravděpodobně nic, protože JavaScript prostě „zamrzne“. Webový prohlížeč přestane reagovat na události, UI přestane fungovat (většina prohlížečů umožní jen rolování) a po nějaké době navrhne obnovení stránky. Takže s tím buďte opatrní:

```js run
let rv = /^(\w+\s?)*$/;
let řetězec = "Tento vstupni retezec trva velmi dlouhou dobu nebo dokonce zpusobi zamrznuti tohoto regularniho vyrazu!";

// bude trvat velmi dlouho
alert( rv.test(řetězec) );
```

Poctivě dodejme, že některé motory regulárních výrazů dokáží takové hledání zvládnout efektivně, umí to například motor V8 od verze 8.8 (takže Google Chrome 88 zde nezamrzne), zatímco Firefox zamrzne.

## Zjednodušený příklad

Proč se tak děje? Proč tento regulární výraz zamrzne?

Abychom to pochopili, zjednodušme příklad: odstraníme mezery `pattern:\s?`. Pak se z výrazu stane `pattern:^(\w+)*$`.

A aby to bylo ještě zřejmější, nahradíme `pattern:\w` za `pattern:\d`. Výsledný regulární výraz stále zamrzne, například:

```js run
let rv = /^(\d+)*$/;

let řetězec = "012345678901234567890123456789z";

// bude trvat velmi dlouho (opatrně!)
alert( rv.test(řetězec) );
```

Co je tedy na tomto RV špatně?

Nejprve si můžeme všimnout, že regulární výraz `pattern:(\d+)*` je poněkud zvláštní. Kvantifikátor `pattern:*` vypadá nadbytečný. Jestliže chceme číslo, můžeme použít `pattern:\d+`.

Jistě, tento RV je uměle vytvořený; získali jsme ho zjednodušením předchozího příkladu. Avšak důvod, proč je pomalý, je stejný. Když ho pochopíme, předchozí příklad nám začne být jasný.

Co se stane během hledání `pattern:^(\d+)*$` na řádku `subject:123456789z` (pro přehlednost trochu zjednodušeno, prosíme všimněte si nečíslicového znaku `subject:z` na konci, je důležitý), proč to trvá tak dlouho?

Motor regulárních výrazů provádí následující:

1. Nejprve se pokusí najít obsah závorek: číslo `pattern:\d+`. Plus `pattern:+` je standardně hltavé, takže pohltí všechny číslice:

    ```
    \d+.......
    (123456789)z
    ```

    Po pohlcení všech číslic se vzor `pattern:\d+` považuje za nalezený (jako `match:123456789`).

    Pak se aplikuje hvězdičkový kvantifikátor `pattern:(\d+)*`. V textu však nejsou žádné další číslice, takže hvězdička nic nevydá.

    Další znak ve vzoru je konec řetězce `pattern:$`. V textu však místo něj máme `subject:z`, takže shoda nenastane:

    ```
               X
    \d+........$
    (123456789)z
    ```

2. Protože nedošlo ke shodě, hltavý kvantifikátor `pattern:+` sníží počet opakování a zpětně se vrátí o jeden znak.

    Nyní `pattern:\d+` vezme všechny číslice kromě poslední (`match:12345678`):
    ```
    \d+.......
    (12345678)9z
    ```
3. Motor se pokusí pokračovat v hledání od další pozice (hned za `match:12345678`).

    Může být aplikována hvězdička `pattern:(\d+)*` -- vrátí jednu další shodu s `pattern:\d+`, číslo `match:9`:

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    Motor se pokusí znovu najít `pattern:$`, ale neuspěje, protože místo něj narazí na `subject:z`:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```


4. Ke shodě nedojde, takže motor bude pokračovat ve zpětném průchodu a sníží počet opakování. Zpětný průchod tak obecně funguje: poslední hltavý kvantifikátor snižuje počet opakování, dokud nedosáhne minima. Pak se sníží předchozí hltavý kvantifikátor a tak dále.

    Prověří se všechny možné kombinace. Zde jsou jejich příklady.

    První číslo `pattern:\d+` má 7 číslic, pak je číslo ze 2 číslic:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    První číslo má 7 číslic, pak jsou 2 čísla po 1 číslici:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    První číslo má 6 číslic, pak je číslo ze 3 číslic:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    První číslo má 6 číslic, pak jsou 2 čísla:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...A tak dále.


Je mnoho způsobů, jak rozdělit posloupnost číslic `123456789` na čísla. Abychom byli přesní, je jich <code>2<sup>n</sup>-1</code>, kde `n` je délka posloupnosti.

- Pro `123456789` máme `n=9`, což dává 511 kombinací.
- Pro delší posloupnost s `n=20` existuje přibližně milión (1 048 575) kombinací.
- Pro `n=30` je jich tisíckrát více (1 073 741 823 kombinací).

Právě testování každé z nich je důvod, proč hledání trvá tak dlouho.

## Zpátky ke slovům a řetězcům

Něco podobného se stane v našem prvním příkladu, kde hledáme slova podle vzoru `pattern:^(\w+\s?)*$` v řetězci `subject:Tento vstup zamrzne!`.

Důvodem je, že slovo může být reprezentováno jako jedno nebo mnoho `pattern:\w+`:

```
(vstup)
(vstu)(p)
(vst)(u)(p)
(vs)(t)(up)
...
```

Člověku je hned zřejmé, že tady nemůže nastat shoda, protože řetězec končí vykřičníkem `!`, zatímco regulární výraz na konci očekává slovní znak `pattern:\w` nebo mezeru `pattern:\s`. Motor to však neví.

Zkouší všechny kombinace, jakými může RV `pattern:(\w+\s?)*` „pohltit“ řetězec, včetně variant s mezerami `pattern:(\w+\s)*` a bez nich `pattern:(\w+)*` (protože mezery `pattern:\s?` jsou nepovinné). Protože těchto kombinací je velké množství (jak jsme viděli u číslic), hledání zabere dlouhou dobu.

Co s tím můžeme dělat?

Měli bychom se přepnout do liknavého režimu?

Naneštěstí to nepomůže: jestliže nahradíme `pattern:\w+` za `pattern:\w+?`, RV stále zamrzne. Změní se pořadí testovaných kombinací, ale ne jejich celkový počet.

Některé motory regulárních výrazů mají chytré testy a konečné automaty, které umožňují vyhnout se procházení všech kombinací nebo je značně urychlí, ale většina motorů je nemá a navíc to nepomůže vždy.

## Jak to opravit?

Tento problém se dá řešit dvěma hlavními způsoby.

První je snížit počet možných kombinací.

Učiníme mezeru povinnou přepsáním regulárního výrazu na `pattern:^(\w+\s)*\w*$` - budeme hledat jakýkoli počet slov následovaných mezerou  `pattern:(\w+\s)*` a pak (nepovinně) poslední slovo `pattern:\w*`.

Tento regulární výraz je ekvivalentní předchozímu (najde stejné shody) a funguje dobře:

```js run
let rv = /^(\w+\s)*\w*$/;
let řetězec = "Tento vstupni retezec trva velmi dlouhou dobu nebo dokonce zpusobi zamrznuti tohoto regularniho vyrazu!";

alert( rv.test(řetězec) ); // false
```

Proč problém zmizel?

Je to tím, že mezera je nyní povinná.

Když z předchozího RV vypustíme mezeru, změní se na `pattern:(\w+)*`, což vede k mnoha kombinacím `\w+` uvnitř jednoho slova.

Takže `subject:vstup` může odpovídat dvěma opakováním `pattern:\w+`, například:

```
\w+  \w+
(vst)(up)
```

Nový vzor je jiný: `pattern:(\w+\s)*` specifikuje opakování slov následovaných mezerou! Řetězec `subject:vstup` nemůže být nalezen jako dvě opakování `pattern:\w+\s`, protože mezera je povinná.

Ušetří se čas potřebný k otestování mnoha (ve skutečnosti většiny) kombinací.

## Zákaz zpětného průchodu

Ne vždy je však vhodné přepsat regulární výraz. V uvedeném příkladu to bylo snadné, ale není vždy zřejmé, jak to udělat.

Kromě toho je přepsaný RV obvykle složitější, což není dobré. Regulární výrazy jsou už tak dost složité i bez dalšího úsilí.

Naštěstí existuje alternativní přístup. Můžeme zakázat kvantifikátoru zpětný průchod.

Jádro problému spočívá v tom, že motor regulárních výrazů zkouší mnoho kombinací, které jsou pro člověka očividně špatné.

Například v RV `pattern:(\d+)*$` je člověku hned zřejmé, že `pattern:+` by neměl zpětně procházet. Jestliže nahradíme jeden `pattern:\d+` dvěma samostatnými `pattern:\d+\d+`, nic se nezmění:

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

A v původním příkladu `pattern:^(\w+\s?)*$` můžeme chtít zakázat zpětný průchod v `pattern:\w+`. To znamená: `pattern:\w+` by měl najít celé slovo o maximální možné délce. Není nutné snižovat ve `pattern:\w+` počet opakování nebo ho dělit na dvě slova `pattern:\w+\w+` a podobně.

Moderní motory regulárních výrazů podporují pro tento účel posesivní (possessive) kvantifikátory. Běžný kvantifikátor se stane posesivním, jestliže za něj přidáme `pattern:+`. To znamená, že abychom zabránili `pattern:+` ve zpětném průchodu, použijeme  `pattern:\d++` namísto `pattern:\d+`.

Posesivní kvantifikátory jsou ve skutečnosti jednodušší než „obyčejné“. Najdou prostě tolik, kolik mohou, bez jakéhokoli zpětného průchodu. Proces hledání bez zpětného průchodu je jednodušší.

Existují i tzv. „atomické zachytávací skupiny“ -- způsob, jak zakázat zpětný průchod v závorkách.

...Špatná zpráva však je, že v JavaScriptu nejsou podporovány.

Můžeme je však emulovat pomocí „transformace dopředným nahlédnutím“.

### Dopředné nahlédnutí nás zachrání!

Narazili jsme tedy na opravdu pokročilé téma. Chtěli bychom, aby kvantifikátor, např. `pattern:+`, neprováděl zpětný průchod, protože někdy to nemá smysl.

Vzor, který najde co nejvíce opakování `pattern:\w` bez zpětného průchodu, je: `pattern:(?=(\w+))\1`. Místo `pattern:\w` můžeme samozřejmě použít jakýkoli jiný vzor.

Může to vypadat divně, ale ve skutečnosti je to velmi jednoduchá transformace.

Rozšifrujme to:

- Dopředné nahlédnutí `pattern:?=` se podívá dopředu na nejdelší možné slovo `pattern:\w+`, které začíná na aktuální pozici.
- Obsah závorek s `pattern:?=...` si motor nezapamatuje, takže uzavřeme `pattern:\w+` do závorek. Motor si pak jejich obsah zapamatuje.
- ...A umožní nám se na něj odkázat ve vzoru pomocí `pattern:\1`.

To znamená: podíváme se dopředu -- a pokud tam je slovo `pattern:\w+`, budeme je hledat pomocí `pattern:\1`.

Proč? Je to proto, že dopředné nahlédnutí najde slovo `pattern:\w+` jako celek a my je zachytíme do vzoru pomocí `pattern:\1`. V zásadě jsme tedy implementovali posesivní kvantifikátor plus `pattern:+`. Zachytí pouze celé slovo `pattern:\w+`, ne jeho část.

Například ve slově `subject:JavaScript` nemůže najít pouze `match:Java` a nechat `match:Script` zbytku vzoru.

Porovnejme tyto dva vzory:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. V první variantě `pattern:\w+` napřed zachytí celé slovo `subject:JavaScript`, ale pak `pattern:+` zpětně prochází znak po znaku, aby našel shodu se zbytkem vzoru, dokud nakonec neuspěje (když `pattern:\w+` najde `match:Java`).
2. Ve druhé variantě se `pattern:(?=(\w+))` dívá dopředu a najde slovo `subject:JavaScript`, které zahrne do vzoru jako celek pomocí `pattern:\1`, takže nezbude žádný způsob, jak najít `subject:Script` za ním.

Místo `pattern:\w` můžeme do `pattern:(?=(\w+))\1` uvést složitější regulární výraz, když potřebujeme zakázat zpětný průchod kvantifikátoru `pattern:+` za ním.

```smart
O vztahu mezi posesivními kvantifikátory a dopředným nahlédnutím najdete další informace v článcích [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](https://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) a [Mimicking Atomic Groups](https://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

Přepišme první příklad pomocí dopředného nahlédnutí, abychom zakázali zpětný průchod:

```js run
let rv = /^((?=(\w+))\2\s?)*$/;

alert( rv.test("Dobry retezec") ); // true

let řetězec = "Tento vstupni retezec trva velmi dlouhou dobu nebo dokonce zpusobi zamrznuti tohoto regularniho vyrazu!";

alert( rv.test(řetězec) ); // false, funguje a rychle!
```

Zde jsme místo `pattern:\1` použili `pattern:\2`, protože tady jsou další vnější závorky. Abychom se vyhnuli manipulaci s čísly, můžeme závorky pojmenovat, např.  `pattern:(?<slovo>\w+)`.

```js run
// závorky mají jméno ?<slovo>, odkazuje se na ně \k<slovo>
let rv = /^((?=(?<slovo>\w+))\k<slovo>\s?)*$/;

let řetězec = "Tento vstupni retezec trva velmi dlouhou dobu nebo dokonce zpusobi zamrznuti tohoto regularniho vyrazu!";

alert( rv.test(řetězec) ); // false

alert( rv.test("Dobry retezec") ); // true
```

Problém popsaný v tomto článku se nazývá „katastrofický zpětný průchod“ („catastrophic backtracking“).

Uvedli jsme dva způsoby, jak jej řešit:
- Přepsat regulární výraz tak, aby se snížil počet možných kombinací.
- Zakázat zpětný průchod.
