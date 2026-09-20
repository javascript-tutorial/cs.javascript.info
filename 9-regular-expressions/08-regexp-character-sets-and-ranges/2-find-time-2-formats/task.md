# Najděte čas ve tvaru hh:mm nebo hh-mm

Čas může být ve formátu `hodiny:minuty` nebo `hodiny-minuty`. Hodiny i minuty mají vždy 2 číslice:  `09:00` nebo `21-30`.

Napište regulární výraz, který najde čas:

```js
let rv = /váš RV/g;
alert( "Snídaně v 09:00. Večeře v 21-30".match(rv) ); // 09:00, 21-30
```

P.S. V této úloze předpokládáme, že čas je vždy správně, nemusíte odfiltrovávat nesprávné řetězce jako "45:67". Později si poradíme i s nimi.
