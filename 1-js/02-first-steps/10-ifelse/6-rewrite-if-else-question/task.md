importance: 5

---

# Přepište „if..else“ na „?“

Přepište `if..else` pomocí několika ternárních operátorů `'?'`.

Z důvodu čitelnosti doporučujeme rozdělit kód na více řádků.

```js
let zpráva;

if (přihlášený == 'Zaměstnanec') {
  zpráva = 'Ahoj';
} else if (login == 'Ředitel') {
  zpráva = 'Dobrý den';
} else if (přihlášený == '') {
  zpráva = 'Nikdo není přihlášený';
} else {
  zpráva = '';
}
```
