
Odpovědi:

1. `true`. 

    Přiřazení do `Králík.prototype` nastaví `[[Prototype]]` pro nové objekty, ale neovlivní již existující.

2. `false`. 

    Objekty jsou přiřazovány odkazem. Objekt z `Králík.prototype` není duplikován, ale je to stále jediný objekt, na který se odkazují jak `Králík.prototype`, tak `[[Prototype]]` objektu `králík`. 

    Když tedy změníme jeho obsah skrz jeden odkaz, uvidíme to i druhým odkazem.

3. `true`.

    Všechny operace `delete` se aplikují přímo na objekt. Zde se `delete králík.žere` pokusí odstranit vlastnost `žere` z objektu `králík`, ale ten ji neobsahuje. Operace tedy nemá žádný účinek.

4. `undefined`.

    Vlastnost `žere` je smazána z prototypu a nadále neexistuje.
