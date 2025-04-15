Prosíme všimněte si drobného, ale důležitého detailu řešení. Nepřevádíme `hodnota` na číslo okamžitě po `prompt`, jelikož po `hodnota = +hodnota` bychom neměli jak poznat prázdný řetězec (znamení konce) od nuly (platné číslo). Děláme to až později.


```js run demo
function sečtiVstup() {
 
  let čísla = [];

  while (true) {

    let hodnota = prompt("Číslo, prosím?", 0);

    // měli bychom skončit?
    if (hodnota === "" || hodnota === null || !isFinite(hodnota)) break;

    čísla.push(+hodnota);
  }

  let součet = 0;
  for (let číslo of čísla) {
    součet += číslo;
  }
  return součet;
}

alert( sečtiVstup() ); 
```

