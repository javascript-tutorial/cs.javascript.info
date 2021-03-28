importance: 5

---

# Přepište „switch“ na „if“

Přepište tento kód pomocí `if..else`, které nahradí následující `switch`:

```js
switch (prohlížeč) {
  case 'Edge':
    alert( "Vy máte Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Dobrá, tyto prohlížeče také podporujeme' );
    break;

  default:
    alert( 'Doufáme, že tato stránka vypadá dobře!' );
}
```

