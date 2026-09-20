# Kvantifikátory +, *, ? a {n}

Dejme tomu, že máme řetězec, např. `+7(903)-123-45-67`, a chceme v něm najít všechna čísla. Na rozdíl od předchozích příkladů nás však nezajímají jednotlivé číslice, ale celá čísla: `7, 903, 123, 45, 67`.

Číslo je posloupnost 1 nebo více číslic `pattern:\d`. Abychom specifikovali, kolik jich potřebujeme, můžeme uvést *kvantifikátor*.

## Kvantita {n}

Nejjednodušší kvantifikátor je číslo ve složených závorkách: `pattern:{n}`.

Kvantifikátor se přidává ke znaku (nebo ke znakové třídě, množině `[...]` atd.) a specifikuje, kolik jich potřebujeme.

Má několik pokročilejších forem, podívejme se na příklady:

Přesný počet: `pattern:{5}`
: `pattern:\d{5}` znamená přesně 5 číslic, totéž jako `pattern:\d\d\d\d\d`.

    Následující příklad najde 5-ciferné číslo:

    ```js run
    alert( "Je mi 12345 let".match(/\d{5}/) ); //  "12345"
    ```

    Abychom vyloučili delší čísla, můžeme přidat `\b`: `pattern:\b\d{5}\b`.

Rozsah: `pattern:{3,5}`, shoda 3-5krát
: Abychom našli čísla o délce 3 až 5 číslic, můžeme uvést do složených závorek hraniční hodnoty: `pattern:\d{3,5}`

    ```js run
    alert( "Není mi 12, ale 1234 let".match(/\d{3,5}/) ); // "1234"
    ```

    Horní hranici můžeme vynechat.

    Regulární výraz `pattern:\d{3,}` pak hledá posloupnosti číslic o délce `3` a více:

    ```js run
    alert( "Není mi 12, ale 345678 let".match(/\d{3,}/) ); // "345678"
    ```

Vraťme se k řetězci `+7(903)-123-45-67`.

Číslo je posloupnost jedné nebo více číslic za sebou. Regulární výraz tedy bude `pattern:\d{1,}`:

```js run
let řetězec = "+7(903)-123-45-67";

let čísla = řetězec.match(/\d{1,}/g);

alert(čísla); // 7,903,123,45,67
```

## Zkratky

Pro nejpoužívanější kvantifikátory existují zkratky:

`pattern:+`
: Znamená „jeden nebo více“, totéž jako `pattern:{1,}`.

    Například `pattern:\d+` hledá čísla:

    ```js run
    let řetězec = "+7(903)-123-45-67";

    alert( řetězec.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: Znamená „žádný nebo jeden“, totéž jako `pattern:{0,1}`. Jinými slovy, učiní symbol nepovinným.

    Například vzor `pattern:ou?r` hledá `match:o`, po němž následuje žádné nebo jedno `match:u` a pak `match:r`.

    `pattern:colou?r` tedy najde jak `match:color`, tak `match:colour`:

    ```js run
    let řetězec = "Mám psát color nebo colour?";

    alert( řetězec.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: Znamená „žádný nebo více“, totéž jako `pattern:{0,}`. Znak se tedy může opakovat libovolněkrát nebo chybět.

    Například `pattern:\d0*` hledá číslici následovanou libovolným počtem nul (může jich být mnoho a nemusí být žádná):

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Porovnejte si to s `pattern:+` (jeden nebo více):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 se neshoduje, neboť 0+ vyžaduje aspoň jednu nulu
    ```

## Další příklady

Kvantifikátory se používají velmi často a slouží jako hlavní „stavební blok“ složitých regulárních výrazů. Podívejme se tedy na další příklady.

**RV pro desetinná čísla (číslo s pohyblivou řádovou tečkou): `pattern:\d+\.\d+`**

V akci:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**RV pro „otevírací HTML značku bez atributů“, například `<span>` nebo `<p>`.**

1. Nejjednodušší: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    Regulární výraz hledá znak `pattern:'<'`, po němž následuje jedno nebo více písmen latinské abecedy a pak `pattern:'>'`.

2. Vylepšený: `pattern:/<[a-z][a-z0-9]*>/i`

    Podle standardu může název HTML značky obsahovat číslici na kterékoli pozici kromě první, např. `<h1>`.

    ```js run
    alert( "<h1>Ahoj!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

**RV pro „otevírací nebo uzavírací HTML značku bez atributů“: `pattern:/<\/?[a-z][a-z0-9]*>/i`**

Na začátek vzoru jsme přidali nepovinné lomítko `pattern:/?`. Museli jsme před ním uvést únikové zpětné lomítko, jinak by je JavaScript považoval za konec vzoru.

```js run
alert( "<h1>Ahoj!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="Abychom učinili regulární výraz přesnějším, musíme jej často učinit složitějším"
Na těchto příkladech vidíme jedno společné pravidlo: čím je regulární výraz přesnější, tím je delší a složitější.

Například pro HTML značky jsme mohli použít jednodušší RV: `pattern:<\w+>`. Protože však HTML klade na název značky přísnější omezení, je výraz `pattern:<[a-z][a-z0-9]*>` spolehlivější.

Můžeme použít `pattern:<\w+>`, nebo potřebujeme `pattern:<[a-z][a-z0-9]*>`?

Ve skutečném životě jsou přijatelné obě varianty. Záleží na tom, jak tolerantní můžeme být k nálezům „navíc“ a nakolik je obtížné je z výsledku odstranit jinými způsoby.
```
