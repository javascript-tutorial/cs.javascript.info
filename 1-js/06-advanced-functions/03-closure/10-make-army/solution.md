
Prozkoumejme, co přesně se děje uvnitř funkce `vytvořArmádu`, a řešení bude zřejmé.

1. Vytvoří se prázdné pole `střelci`:

    ```js
    let střelci = [];
    ```
2. V cyklu se naplní funkcemi pomocí `střelci.push(function)`.

    Každý prvek je funkce, takže výsledné pole vypadá takto:

    ```js no-beautify
    střelci = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

3. Toto pole funkce vrátí.
    
    Pak později volání kteréhokoli jeho prvku, např. `armáda[5]()`, načte z pole prvek `armáda[5]` (což je funkce) a zavolá jej.
    
    Proč nyní všechny tyto funkce zobrazí stejnou hodnotu, `10`?
    
    Je to proto, že uvnitř funkce `střelec` neexistuje žádná lokální proměnná `i`. Když je taková funkce volána, převezme `i` z vnějšího lexikálního prostředí.
    
    Jaká pak bude hodnota proměnné `i`?
    
    Když se podíváme na zdrojový kód:
    
    ```js
    function vytvořArmádu() {
      ...
      let i = 0;
      while (i < 10) {
        let střelec = function() { // funkce střelec
          alert( i );              // by měla zobrazit své číslo
        };
        střelci.push(střelec); // přidá funkci do pole
        i++;
      }
      ...
    }
    ```
    
    Vidíme, že všechny funkce `střelec` jsou vytvořeny v lexikálním prostředí funkce `vytvořArmádu()`. Když je však volána `armáda[5]()`, funkce `vytvořArmádu` již ukončila svou práci a poslední hodnota `i` je `10` (`while` se zastaví na `i=10`).
    
    Výsledkem je, že všechny funkce `střelec` převezmou z vnějšího lexikálního prostředí stejnou hodnotu a tou bude poslední hodnota, `i=10`.
    
    ![](lexenv-makearmy-empty.svg)
    
    Jak vidíte výše, při každé iteraci bloku `while {...}` bude vytvořeno nové lexikální prostředí. Abychom to opravili, můžeme zkopírovat hodnotu `i` do proměnné uvnitř bloku `while {...}` třeba takto:
    
    ```js run
    function vytvořArmádu() {
      let střelci = [];
    
      let i = 0;
      while (i < 10) {
        *!*
          let j = i;
        */!*
          let střelec = function() { // funkce střelec
            alert( *!*j*/!* );              // by měla zobrazit své číslo
          };
        střelci.push(střelec);
        i++;
      }
    
      return střelci;
    }
    
    let armáda = vytvořArmádu();
    
    // Nyní kód funguje správně
    armáda[0](); // 0
    armáda[5](); // 5
    ```
    
    Zde `let j = i` deklaruje „iteračně lokální“ proměnnou `j` a zkopíruje do ní `i`. Primitivy se kopírují „hodnotou“, takže ve skutečnosti získáme nezávislou kopii `i`, která patří do aktuální iterace cyklu.
    
    Střelci budou fungovat správně, protože hodnota `i` nyní existuje trochu blíže. Není v lexikálním prostředí funkce `vytvořArmádu()`, ale v lexikálním prostředí, které odpovídá aktuální iteraci cyklu:
    
    ![](lexenv-makearmy-while-fixed.svg)
    
    Tomuto problému se lze vyhnout i tak, že na začátku použijeme `for`, třeba takto:
    
    ```js run demo
    function vytvořArmádu() {
    
      let střelci = [];
    
    *!*
      for(let i = 0; i < 10; i++) {
    */!*
        let střelec = function() { // funkce střelec
          alert( i );              // by měla zobrazit své číslo
        };
        střelci.push(střelec);
      }
    
      return střelci;
    }
    
    let armáda = vytvořArmádu();
    
    armáda[0](); // 0
    armáda[5](); // 5
    ```
    
    To je v zásadě totéž, protože `for` při každé své iteraci vygeneruje nové lexikální prostředí se svou vlastní proměnnou `i`. Takže `střelec` generovaný v každé iteraci odkazuje na své vlastní `i` přímo z této iterace.
    
    ![](lexenv-makearmy-for-fixed.svg)

Když jste vložili tolik námahy do přečtení tohoto řešení a konečný recept je tak jednoduchý -- prostě použijeme `for`, můžete se divit -- mělo to cenu?

Inu, kdybyste na tuto otázku dokázali snadno odpovědět, nečetli byste řešení. Snad vám tedy tato úloha pomohla trochu lépe všemu porozumět.

Kromě toho zajisté existují případy, kdy člověk dává přednost `while` před `for`, a jiné scénáře, kde takové problémy opravdu nastanou.
