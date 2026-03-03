Nejprve musíme najít všechny externí odkazy.

To lze udělat dvěma způsoby.

První je najít všechny odkazy pomocí `document.querySelectorAll('a')` a pak vyfiltrovat ty, které potřebujeme:

```js
let odkazy = document.querySelectorAll('a');

for (let odkaz of odkazy) {
*!*
  let href = odkaz.getAttribute('href');
*/!*
  if (!href) continue; // neobsahuje atribut

  if (!href.includes('://')) continue; // neobsahuje protokol

  if (href.startsWith('http://internal.com')) continue; // interní

  odkaz.style.color = 'orange';
}
```

Prosíme všimněte si, že používáme `odkaz.getAttribute('href')` a ne `odkaz.href`, protože potřebujeme hodnotu z HTML kódu.

...Druhý, jednodušší způsob je přidat kontrolu do CSS selektoru:

```js
// najdeme všechny odkazy, které v href obsahují ://
// ale href nezačíná http://internal.com
let selektor = 'a[href*="://"]:not([href^="http://internal.com"])';
let odkaz = document.querySelectorAll(selektor);

odkazy.forEach(odkaz => odkaz.style.color = 'orange');
```
