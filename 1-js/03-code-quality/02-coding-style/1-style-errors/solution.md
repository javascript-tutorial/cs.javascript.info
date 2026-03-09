
Měli byste si všimnout následujícího:

```js no-beautify
<<<<<<< HEAD
function mocnina(x,n)  // <- chybí mezera mezi argumenty
{  // <- levá složená závorka na zvláštním řádku
  let výsledek=1;   // <- chybějí mezery před a za =
  for(let i=0;i<n;i++) {výsledek*=x;}   // <- chybějí mezery
  // obsah { ... } by měl být na novém řádku
  return výsledek;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technicky je to možné,
// ale lepší je to rozdělit na 2 řádky, navíc tam chybějí mezery a ;
if (n<=0)  // <- chybějí mezery uvnitř (n <= 0) a nad ním by měl být prázdný řádek
{   // <- levá složená závorka na zvláštním řádku
  // níže - dlouhé řádky by měly být rozděleny na více řádků pro lepší čitelnost
  alert(`${n}-tá mocnina není podporována, zadejte prosím celé číslo větší než nula`);
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
}
else // <- toto může být na jediném řádku: "} else {"
{
  alert(mocnina(x,n))  // chybějí mezery a ;
}
```

Opravená varianta:

```js
function mocnina(x, n) {
  let výsledek = 1;

  for (let i = 0; i < n; i++) {
    výsledek *= x;
  }

  return výsledek;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`${n}-tá mocnina není podporována,
    zadejte prosím celé číslo větší než nula`);
} else {
  alert( mocnina(x, n) );
}
```
