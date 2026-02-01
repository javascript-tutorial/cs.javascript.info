kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = zpracuj;

let posledníČas = Date.now();

function zpracuj(e) {
  if (form.elements[e.type + 'Ignore'].checked) return;

  area.scrollTop = 1e6;

  let text = e.type +
    ' key=' + e.key +
    ' code=' + e.code +
    (e.shiftKey ? ' shiftKey' : '') +
    (e.ctrlKey ? ' ctrlKey' : '') +
    (e.altKey ? ' altKey' : '') +
    (e.metaKey ? ' metaKey' : '') +
    (e.repeat ? ' (repeat)' : '') +
    "\n";

  if (area.value && Date.now() - posledníČas > 250) {
    area.value += new Array(81).join('-') + '\n';
  }
  posledníČas = Date.now();

  area.value += text;

  if (form.elements[e.type + 'Stop'].checked) {
    e.preventDefault();
  }
}
