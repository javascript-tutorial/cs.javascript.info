Pomocí operátoru otazníku `'?'`:

```js
function ověřVěk(věk) {
  return (věk > 18) ? true : confirm('Dovolili ti to rodiče?');
}
```

Pomocí OR `||` (kratší varianta):

```js
function ověřVěk(věk) {
  return (věk > 18) || confirm('Dovolili ti to rodiče?');
}
```

Všimněte si, že závorky okolo `věk > 18` zde nejsou nutné. Slouží jen k lepší čitelnosti.
