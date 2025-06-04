# Šipkové funkce podruhé

Podívejme se nyní znovu na šipkové funkce.

Šipkové funkce nejsou jen „zkratka“ pro zápis krátkého kódu. Mají určité velmi specifické a užitečné vlastnosti.

V JavaScriptu nastává spousta situací, kdy potřebujeme napsat malou funkci, která se bude spouštět někde jinde.

Například:

- `pole.forEach(funkce)` -- `funkce` je spouštěna funkcí `forEach` pro každý prvek pole.
- `setTimeout(funkce)` -- `funkce` je spouštěna zabudovaným plánovačem.
- ...a mnoho dalších.

Vytvořit funkci a někam ji předat je zcela v duchu JavaScriptu.

A v takových funkcích obvykle nechceme opustit aktuální kontext. Tehdy šipkové funkce přijdou vhod.

## Šipkové funkce nemají „this“

Jak si pamatujeme z kapitoly <info:object-methods>, šipkové funkce nemají `this`. Jestliže k `this` přistupujeme, vezme se zvnějšku.

Například je můžeme použít k iteraci uvnitř objektové metody:

```js run
let skupina = {
  název: "Naše skupina",
  studenti: ["Jan", "Petr", "Alice"],

  zobrazSeznam() {
*!*
    this.studenti.forEach(
      student => alert(this.název + ': ' + student)
    );
*/!*
  }
};

skupina.zobrazSeznam();
```

Zde je ve `forEach` použita šipková funkce, takže `this.název` v ní je přesně stejný jako ve vnější metodě `zobrazSeznam`. Tedy: `skupina.název`.

Kdybychom použili „obyčejnou“ funkci, nastala by chyba:

```js run
let skupina = {
  název: "Naše skupina",
  studenti: ["Jan", "Petr", "Alice"],

  zobrazSeznam() {
*!*
    this.studenti.forEach(function(student) {
      // Chyba: Nelze načíst vlastnost 'název' z undefined
      alert(this.název + ': ' + student)
    });
*/!*
  }
};

skupina.zobrazSeznam();
```

Chyba nastane proto, že `forEach` standardně spouští funkci s `this=undefined`, takže je učiněn pokus o přístup k `undefined.název`.

Na šipkové funkce to vliv nemá, protože ty prostě `this` nemají.

```warn header="Šipkové funkce nelze spouštět s `new`"
Neexistence `this` pochopitelně znamená další omezení: šipkové funkce nelze používat jako konstruktory. Nemůžeme je volat s `new`.
```

```smart header="Šipkové funkce versus bind"
Existuje drobný rozdíl mezi šipkovou funkcí `=>` a obyčejnou funkcí volanou pomocí `.bind(this)`:

- `.bind(this)` vytvoří „vázanou verzi“ funkce.
- Šipka `=>` žádnou vazbu nevytváří. Funkce prostě nemá `this`. Hledání `this` se provádí přesně stejným způsobem jako hledání běžné proměnné: ve vnějším lexikálním prostředí.
```

## Šipkové funkce nemají „arguments“

Šipkové funkce také nemají proměnnou `arguments`.

To je vynikající pro dekorátory, když potřebujeme přesměrovat volání s aktuálním `this` a `arguments`.

Například `odlož(f, ms)` přijímá funkci a vrací obal kolem ní, který odloží její volání o `ms` milisekund:

```js run
function odlož(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function řekniAhoj(kdo) {
  alert('Ahoj, ' + kdo);
}

let řekniAhojOdložené = odlož(řekniAhoj, 2000);
řekniAhojOdložené("Jan"); // Ahoj, Jan po 2 sekundách
```

Totéž bez šipkové funkce by vypadalo následovně:

```js
function odlož(f, ms) {
  return function(...argumenty) {
    let kontext = this;
    setTimeout(function() {
      return f.apply(kontext, argumenty);
    }, ms);
  };
}
```

Zde jsme museli vytvořit navíc proměnné `argumenty` a `kontext`, aby je mohla převzít funkce uvnitř `setTimeout`.

## Shrnutí

Šipkové funkce:

- Nemají `this`.
- Nemají `arguments`.
- Nemohou být volány s `new`.
- Nemají také `super`, ale to jsme ještě neprostudovali. Učiníme tak v kapitole <info:class-inheritance>.

Je to proto, že jsou určeny pro krátké části kódu, které nemají svůj vlastní „kontext“, ale místo toho pracují v aktuálním. A v tomto způsobu použití opravdu vynikají.