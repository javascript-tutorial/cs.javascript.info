Řešení: `pattern:/"(\\.|[^"\\])*"/g`.

Krok za krokem:

- Nejprve najdeme otevírací uvozovky `pattern:"`.
- Potom, pokud máme zpětné lomítko `pattern:\\` (ve vzoru je musíme zdvojit, protože je to speciální znak), pak za ním může být jakýkoli znak (tečka).
- V opačném případě přijmeme libovolný znak kromě uvozovek (ty znamenají konec řetězce) a zpětného lomítka (abychom zabránili osamoceným zpětným lomítkům, zpětné lomítko se používá jen s jiným symbolem za sebou): `pattern:[^"\\]`
- ...A tak dále až do uzavíracích uvozovek.

V akci:

```js run
let rv = /"(\\.|[^"\\])*"/g;
let řetězec = ' .. "otestuj mě" .. "Řekni \\"Ahoj\\"!" .. "\\\\ \\"" .. ';

alert( řetězec.match(rv) ); // "otestuj mě","Řekni \"Ahoj\"!","\\ \""
```
