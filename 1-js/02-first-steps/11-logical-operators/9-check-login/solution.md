

```js run demo
let uživatelskéJméno = prompt("Kdo je tam?", '');

if (uživatelskéJméno === 'Správce') {

  let heslo = prompt('Heslo?', '');

  if (pass === 'Mistr') {
    alert( 'Vítáme vás!' );
  } else if (pass === '' || pass === null) {
    alert( 'Zrušeno' );
  } else {
    alert( 'Špatné heslo' );
  }

} else if (uživatelskéJméno === '' || uživatelskéJméno === null) {
  alert( 'Zrušeno' );
} else {
  alert( "Neznám vás" );
}
```

Všimněte si svislého odsazení uvnitř bloků `if`. Není technicky vyžadováno, ale činí kód čitelnějším.
