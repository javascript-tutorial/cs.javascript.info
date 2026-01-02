Vytvořme cyklus nad `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

V cyklu musíme získat text uvnitř každého `li`.

Můžeme přečíst text z prvního dítěte uzlu `li`, kterým je textový uzel:

```js
for (let li of document.querySelectorAll('li')) {
  let titulek = li.firstChild.data;

  // titulek je text v <li> před všemi ostatními uzly
}
```

Počet potomků pak můžeme získat jako `li.getElementsByTagName('li').length`.
