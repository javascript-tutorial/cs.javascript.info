# Najděte řetězce v uvozovkách

Vytvořte regulární výraz, který najde řetězce ve dvojitých uvozovkách `subject:"..."`.

Řetězce by měly podporovat únikové znaky stejným způsobem, jako řetězce v JavaScriptu. Například uvozovky mohou být vloženy jako `subject:\"`, nový řádek jako `subject:\n` a samotné zpětné lomítko jako `subject:\\`.

```js
let řetězec = "Tak jako \"tady\".";
```

Prosíme všimněte si, že uvozovky za únikovým znakem `subject:\"` neukončují řetězec.

Měli bychom tedy hledat od prvních uvozovek ke druhým, ale po cestě ignorovat uvozovky za únikovým znakem.

To je klíčová součást úlohy, jinak by byla triviální.

Příklady řetězců, které se mají shodovat:
```js
.. *!*"otestuj mě"*/!* ..  
.. *!*"Řekni \"Ahoj\"!"*/!* ... (uvozovky s únikovým znakem uvnitř)
.. *!*"\\"*/!* ..  (dvojité lomítko uvnitř)
.. *!*"\\ \""*/!* ..  (dvojité lomítko a uvozovky s únikovým znakem uvnitř)
```

Abychom v JavaScriptu správně předali do řetězce zpětná lomítka, musíme je zdvojit, například:

```js run
let řetězec = ' .. "otestuj mě" .. "Řekni \\"Ahoj\\"!" .. "\\\\ \\"" .. ';

// řetězec v paměti
alert(řetězec); //  .. "otestuj mě" .. "Řekni \"Ahoj\"!" .. "\\ \"" ..
```
