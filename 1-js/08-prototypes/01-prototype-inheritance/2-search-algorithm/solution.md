
1. Přidejme `__proto__`:

    ```js run
    let hlava = {
      brýle: 1
    };

    let stůl = {
      pero: 3,
      __proto__: hlava
    };

    let postel = {
      peřina: 1,
      polštář: 2,
      __proto__: stůl
    };

    let kapsy = {
      peníze: 2000,
      __proto__: postel
    };

    alert( kapsy.pero ); // 3
    alert( postel.brýle ); // 1
    alert( stůl.peníze ); // undefined
    ```

2. V moderních motorech s vylepšeným výkonem není rozdíl mezi tím, zda bereme vlastnost z objektu nebo jeho prototypu. Motory si pamatují, kde byla vlastnost nalezena, a při dalším požadavku to využijí.

    Například pro `kapsy.brýle` si pamatují, kde našly `brýle` (v objektu `hlava`), a příště budou hledat rovnou tam. Jsou také dostatečně chytré, aby si při nějaké změně své vnitřní mezipaměti aktualizovaly, takže tato optimalizace je bezpečná.
