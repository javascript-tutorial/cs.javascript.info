tabulka.onmouseover = function(událost) {
  let cíl = událost.target;
  cíl.style.background = 'pink';

  text.value += `over -> ${cíl.tagName}\n`;
  text.scrollTop = text.scrollHeight;
};

tabulka.onmouseout = function(událost) {
  let cíl = událost.target;
  cíl.style.background = '';

  text.value += `out <- ${cíl.tagName}\n`;
  text.scrollTop = text.scrollHeight;
};
