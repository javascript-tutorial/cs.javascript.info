function vytvořČítač() {
  let počet = 0;

  // ... váš kód ...
}

let čítač = vytvořČítač();

alert( čítač() ); // 0
alert( čítač() ); // 1

čítač.nastav(10); // nastaví nový počet

alert( čítač() ); // 10

čítač.sniž(); // sníží počet o 1

alert( čítač() ); // 10 (místo 11)
