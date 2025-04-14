Aby hledání nerozlišovalo malá a velká písmena, převedeme řetězec na malá písmena a pak budeme hledat:

```js run demo
function ověřSpam(řetězec) {
  let řetězecMalýmiPísmeny = řetězec.toLowerCase();

  return řetězecMalýmiPísmeny.includes('viagra') || řetězecMalýmiPísmeny.includes('xxx');
}

alert( ověřSpam('levná ViAgRA zde') );
alert( ověřSpam('zdarma xxxxx') );
alert( ověřSpam("nevinný králíček") );
```

