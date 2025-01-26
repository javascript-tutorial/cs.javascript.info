
function formátujDatum(datum) {
  let rozdíl = new Date() - datum; // rozdíl v milisekundách

  if (rozdíl < 1000) { // méně než 1 sekunda
    return 'právě teď';
  }

  let sec = Math.floor(rozdíl / 1000); // převedeme rozdíl na sekundy

  if (sec < 60) {
    return 'před ' + sec + ' s';
  }

  let min = Math.floor(rozdíl / 60000); // převedeme rozdíl na minuty
  if (min < 60) {
    return 'před ' + min + ' min.';
  }

  // naformátujeme datum
  // před jednociferný den/měsíc/hodiny/minuty přidáme nulu
  let d = datum;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(složka => složka.slice(-2)); // z každé složky vezmeme poslední 2 číslice

  // spojíme složky do data
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

