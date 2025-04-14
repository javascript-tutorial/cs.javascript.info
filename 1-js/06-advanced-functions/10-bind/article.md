libs:
  - lodash

---

# Vazby funkcí

Když předáváme objektové metody jako callbacky, například do `setTimeout`, nastává známý problém: „ztráta `this`“.

V této kapitole uvidíme způsoby, jak jej opravit.

## Ztráta „this“

Příklady ztráty `this` jsme už viděli. Jakmile je metoda předána někde odděleně od objektu, `this` je ztraceno.

Tímto způsobem k tomu může dojít při použití `setTimeout`:

```js run
let uživatel = {
  křestníJméno: "Jan",
  řekniAhoj() {
    alert(`Ahoj, ${this.křestníJméno}!`);
  }
};

*!*
setTimeout(uživatel.řekniAhoj, 1000); // Ahoj, undefined!
*/!*
```

Jak vidíme, výstup nezobrazí jako `this.křestníJméno` „Jan“, ale `undefined`!

Je to proto, že `setTimeout` obdrží funkci `uživatel.řekniAhoj` odděleně od objektu. Poslední řádek lze přepsat na:

```js
let f = uživatel.řekniAhoj;
setTimeout(f, 1000); // ztráta kontextu uživatel
```

Metoda `setTimeout` v prohlížeči je trochu zvláštní: při volání funkce nastaví `this=window` (v Node.js se `this` nastaví na objekt časovače, ale na tom zde opravdu nezáleží). Takže pro `this.křestníJméno` se funkce pokusí načíst `window.křestníJméno`, které neexistuje. V jiných podobných případech se `this` obvykle prostě nastaví na `undefined`.

Tato úloha je vcelku typická -- chceme předat objektovou metodu někam jinam (zde do plánovače), kde bude volána. Jak zajistit, aby byla volána ve správném kontextu?

## Řešení 1: obal

Nejjednodušší řešení je použít obalovou funkci:

```js run
let uživatel = {
  křestníJméno: "Jan",
  řekniAhoj() {
    alert(`Ahoj, ${this.křestníJméno}!`);
  }
};

*!*
setTimeout(function() {
  uživatel.řekniAhoj(); // Ahoj, Jan!
}, 1000);
*/!*
```

Nyní to funguje, protože funkce si načte `uživatel` z vnějšího lexikálního prostředí a pak tuto metodu normálně zavolá.

Totéž, ale kratší:

```js
setTimeout(() => uživatel.řekniAhoj(), 1000); // Ahoj, Jan!
```

Vypadá to dobře, ale v naší struktuře kódu se objevuje drobná zranitelnost.

Co když se před spuštěním `setTimeout` (je tam jednosekundová prodleva!) změní hodnota proměnné `uživatel`? Pak bude náhle zavolán nesprávný objekt!


```js run
let uživatel = {
  křestníJméno: "Jan",
  řekniAhoj() {
    alert(`Ahoj, ${this.křestníJméno}!`);
  }
};

setTimeout(() => uživatel.řekniAhoj(), 1000);

// ...hodnota proměnné uživatel se během 1 sekundy změní
uživatel = {
  řekniAhoj() { alert("Jiný uživatel v setTimeout!"); }
};

// Jiný uživatel v setTimeout!
```

Následující řešení nám zaručuje, že se nic takového nestane.

## Řešení 2: metoda bind

Funkce poskytují vestavěnou metodu [bind](mdn:js/Function/bind), která nám umožňuje `this` pevně nastavit.

Základní syntaxe je:

```js
// složitější syntaxe přijde o něco později
let vázanáFunkce = funkce.bind(kontext);
```

Výsledkem `funkce.bind(kontext)` je speciální „exotický objekt“ podobný funkci, který lze volat jako funkci a který transparentně předá volání funkci `funkce` s nastavením `this=kontext`.

Jinými slovy, volání funkce `vázanáFunkce` je jako volání `funkce` s pevným `this`.

Například zde `funkceUživatel` předá volání funkci `funkce` s `this=uživatel`:

```js run  
let uživatel = {
  křestníJméno: "Jan"
};

function funkce() {
  alert(this.křestníJméno);
}

*!*
let funkceUživatel = funkce.bind(uživatel);
funkceUživatel(); // Jan  
*/!*
```

Zde je `funkce.bind(uživatel)` jako „vázaná varianta“ `funkce` s napevno nastaveným `this=uživatel`.

Všechny argumenty se předávají do původní `funkce` beze změny, například:

```js run  
let uživatel = {
  křestníJméno: "Jan"
};

function funkce(věta) {
  alert(věta + ', ' + this.křestníJméno);
}

// navážeme this na uživatele
let funkceUživatel = funkce.bind(uživatel);

*!*
funkceUživatel("Ahoj"); // Ahoj, Jan (argument "Ahoj" je předán a this=uživatel)
*/!*
```

Zkusme to nyní s objektovou metodou:


```js run
let uživatel = {
  křestníJméno: "Jan",
  řekniAhoj() {
    alert(`Ahoj, ${this.křestníJméno}!`);
  }
};

*!*
let řekniAhoj = uživatel.řekniAhoj.bind(uživatel); // (*)
*/!*

// můžeme ji spustit bez objektu
řekniAhoj(); // Ahoj, Jan!

setTimeout(řekniAhoj, 1000); // Ahoj, Jan!

// i když se hodnota proměnné uživatel během 1 sekundy změní,
// řekniAhoj použije předem navázanou hodnotu, která odkazuje na původní objekt uživatel
uživatel = {
  řekniAhoj() { alert("Jiný uživatel v setTimeout!"); }
};
```

Na řádku `(*)` vezmeme metodu `uživatel.řekniAhoj` a navážeme ji na `uživatel`. Funkce `řekniAhoj` je „vázaná“ funkce, která může být volána samostatně nebo předána do `setTimeout` -- na tom nezáleží, kontext bude správně.

Zde vidíme, že argumenty se předají beze změny, jen `this` bude pevně nastaveno funkcí `bind`:

```js run
let uživatel = {
  křestníJméno: "Jan",
  řekni(věta) {
    alert(`${věta}, ${this.křestníJméno}!`);
  }
};

let řekni = uživatel.řekni.bind(uživatel);

řekni("Ahoj"); // Ahoj, Jan! (argument "Ahoj" je předán do funkce řekni)
řekni("Nashle"); // Nashle, Jan! (argument "Nashle" je předán do funkce řekni)
```

````smart header="Pohodlná metoda: `bindAll`"
Jestliže objekt obsahuje mnoho metod a my je plánujeme aktivně předávat, můžeme je navázat všechny v cyklu:

```js
for (let klíč in uživatel) {
  if (typeof uživatel[klíč] == 'function') {
    uživatel[klíč] = uživatel[klíč].bind(uživatel);
  }
}
```

Knihovny JavaScriptu poskytují funkce i pro praktické hromadné navazování, např. [_.bindAll(objekt, názvyMetod)](https://lodash.com/docs#bindAll) v knihovně Lodash.
````

## Částečné funkce

Doposud jsme hovořili pouze o vázání `this`. Učiňme další krok.

Můžeme vázat nejen `this`, ale i argumenty. To se dělá zřídkakdy, ale občas se to může hodit.

Úplná syntaxe funkce `bind`:

```js
let vázanáFunkce = funkce.bind(kontext, [arg1], [arg2], ...);
```

Umožní nám navázat kontext jako `this` a počáteční argumenty funkce.

Mějme například funkci násobení `krát(a, b)`:

```js
function krát(a, b) {
  return a * b;
}
```

Použitím `bind` vytvořme funkci `dvakrát`, která na ní bude založena:

```js run
function krát(a, b) {
  return a * b;
}

*!*
let dvakrát = krát.bind(null, 2);
*/!*

alert( dvakrát(3) ); // = krát(2, 3) = 6
alert( dvakrát(4) ); // = krát(2, 4) = 8
alert( dvakrát(5) ); // = krát(2, 5) = 10
```

Volání `krát.bind(null, 2)` vytvoří novou funkci `dvakrát`, která předává volání funkci `krát`, přičemž napevno nastaví `null` jako kontext a `2` jako první argument. Další argumenty se předají beze změny.

To se nazývá [částečná (parciální) aplikace funkce](https://en.wikipedia.org/wiki/Partial_application) -- vytvoříme novou funkci tak, že napevno nastavíme některé parametry existující funkce.

Prosíme všimněte si, že zde ve skutečnosti nepoužíváme `this`. Funkce `bind` jej však vyžaduje, takže musíme něco předat, třeba `null`.

V následujícím kódu funkce `třikrát` hodnotu ztrojnásobí:

```js run
function krát(a, b) {
  return a * b;
}

*!*
let třikrát = krát.bind(null, 3);
*/!*

alert( třikrát(3) ); // = krát(3, 3) = 9
alert( třikrát(4) ); // = krát(3, 4) = 12
alert( třikrát(5) ); // = krát(3, 5) = 15
```

Proč obvykle vytváříme částečnou funkci?

Výhodou je, že můžeme vytvořit nezávislou funkci s čitelným názvem (`dvakrát`, `třikrát`). Můžeme ji používat, aniž bychom pokaždé museli uvádět první argument, jelikož ten je pevně nastaven pomocí `bind`.

V jiných případech je částečná aplikace užitečná, když máme velmi generickou funkci a pro své pohodlí chceme její méně univerzální variantu.

Například máme funkci `pošli(odKoho, komu, text)`. Uvnitř objektu `uživatel` pak můžeme chtít používat její částečnou variantu: `pošliNěkomu(komu, text)`, která bude posílat od aktuálního uživatele.

## Částečná funkce bez kontextu

Co kdybychom chtěli napevno nastavit některé argumenty, ale ne kontext `this`? Například v objektové metodě.

Nativní `bind` nám to neumožňuje. Nemůžeme jednoduše vypustit kontext a přeskočit na argumenty.

Naštěstí můžeme snadno implementovat funkci `částečná`, která bude vázat pouze argumenty.

Například takto:

```js run
*!*
function částečná(funkce, ...vázanéArgumenty) {
  return function(...argumenty) { // (*)
    return funkce.call(this, ...vázanéArgumenty, ...argumenty);
  }
}
*/!*

// Použití:
let uživatel = {
  křestníJméno: "Jan",
  řekni(čas, věta) {
    alert(`[${čas}] ${this.křestníJméno}: ${věta}!`);
  }
};

// přidáme částečnou metodu s pevným časem
uživatel.řekniNyní = částečná(uživatel.řekni, new Date().getHours() + ':' + new Date().getMinutes());

uživatel.řekniNyní("Ahoj");
// Něco jako:
// [10:00] Jan: Ahoj!
```

Výsledkem volání `částečná(funkce[, arg1, arg2...])` je obal `(*)`, který volá funkci `funkce`:
- Se stejným `this`, které obdrží (pro volání `uživatel.řekniNyní` to je `uživatel`).
- Pak jí předá `...vázanéArgumenty` -- argumenty z volání funkce `částečná` (`"10:00"`).
- Pak jí předá `...argumenty` -- argumenty předané obalu (`"Ahoj"`).

S roztaženou syntaxí je tak lehké to udělat, že?

Navíc v knihovně Lodash existuje již připravená implementace [_.partial](https://lodash.com/docs#partial).

## Shrnutí

Metoda `funkce.bind(kontext, ...argumenty)` vrací „vázanou variantu“ funkce `funkce`, která pevně nastaví kontext `this` a první argumenty, jsou-li předány.

Obvykle používáme `bind` k pevnému nastavení `this` pro objektovou metodu, abychom ji mohli někam předat, například do funkce `setTimeout`.

Když pevně nastavíme některé argumenty existující funkce, výsledná (méně univerzální) funkce se nazývá *částečně (parciálně) aplikovaná* nebo *částečná (parciální)*.

Částečná funkce se hodí, když nechceme stále znovu a znovu opakovat tentýž argument. Například máme-li funkci `pošli(odKoho, komu)` a argument `odKoho` by měl být v naší úloze vždy stejný, můžeme vytvořit částečnou funkci a pracovat s ní.
