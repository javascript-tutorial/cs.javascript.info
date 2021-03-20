První dvě podmínky se dají napsat každá pomocí jednoho `case`, třetí musíme rozdělit do dvou `case`:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Všimněte si, že `break` na konci není nezbytný, ale vložili jsme ho, aby bylo lépe možné kód v budoucnu rozšiřovat.

Je možné, že v budoucnu budeme chtít přidat další `case`, například `case 4`. Kdybychom před něj na konec `case 3` zapomněli umístit `break`, nastala by chyba. Je to tedy určitý druh pojistky.
