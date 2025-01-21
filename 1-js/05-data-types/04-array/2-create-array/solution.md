

```js run
let styly = ["Jazz", "Blues"];
styly.push("Rock-n-Roll");
styly[Math.floor((styly.length - 1) / 2)] = "Klasika";
alert( styly.shift() );
styly.unshift("Rap", "Reggae");
```

