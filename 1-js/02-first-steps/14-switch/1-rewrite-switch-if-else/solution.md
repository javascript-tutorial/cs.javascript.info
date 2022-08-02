Abychom dosáhli přesné funkcionality příkazu `switch`, musí `if` používat striktní rovnost `'==='`.

V tomto případě však pro zadané řetězce funguje i obyčejné `'=='`.

```js no-beautify
if(prohlížeč == 'Edge') {
  alert("Vy máte Edge!");
} else if (prohlížeč == 'Chrome'
 || prohlížeč == 'Firefox'
 || prohlížeč == 'Safari'
 || prohlížeč == 'Opera') {
  alert( 'V pořádku, tyto prohlížeče také podporujeme' );
} else {
  alert( 'Doufáme, že tato stránka vypadá dobře!' );
}
```

Všimněte si, že konstrukce `prohlížeč == 'Chrome' || prohlížeč == 'Firefox' …` je pro lepší čitelnost rozdělena do několika řádků.

Ale i přesto je `switch` jasnější a přehlednější.
