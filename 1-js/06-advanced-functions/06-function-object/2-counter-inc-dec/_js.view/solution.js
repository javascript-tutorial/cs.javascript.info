function vytvořČítač() {
  let počet = 0;

  function čítač() {
    return počet++;
  }

  čítač.set = hodnota => počet = hodnota;

  čítač.sniž = () => počet--;

  return čítač;
}
