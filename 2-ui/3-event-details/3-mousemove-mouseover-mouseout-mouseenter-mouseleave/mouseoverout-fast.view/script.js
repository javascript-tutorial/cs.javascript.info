let rodič = document.getElementById('rodič');
rodič.onmouseover = rodič.onmouseout = rodič.onmousemove = handler;

function handler(událost) {
  let typ = událost.type;
  while (typ.length < 11) typ += ' ';

  log(typ + " target=" + událost.target.id)
  return false;
}


function vymažText() {
  text.value = "";
  posledníZpráva = "";
}

let časPosledníZprávy = 0;
let posledníZpráva = "";
let početOpakování = 1;

function log(zpráva) {
  if (časPosledníZprávy == 0) časPosledníZprávy = new Date();

  let čas = new Date();

  if (čas - časPosledníZprávy > 500) {
    zpráva = '------------------------------\n' + zpráva;
  }

  if (zpráva === posledníZpráva) {
    početOpakování++;
    if (početOpakování == 2) {
      text.value = text.value.trim() + ' x 2\n';
    } else {
      text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + početOpakování + "\n";
    }

  } else {
    početOpakování = 1;
    text.value += zpráva + "\n";
  }

  text.scrollTop = text.scrollHeight;

  časPosledníZprávy = čas;
  posledníZpráva = zpráva;
}
