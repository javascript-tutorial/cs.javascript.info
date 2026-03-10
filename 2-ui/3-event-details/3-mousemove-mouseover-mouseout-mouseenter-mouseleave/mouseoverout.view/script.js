kontejner.onmouseover = kontejner.onmouseout = handler;

function handler(událost) {

  function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
  }

  log.value += událost.type + ':  ' +
    'target=' + str(událost.target) +
    ',  relatedTarget=' + str(událost.relatedTarget) + "\n";
  log.scrollTop = log.scrollHeight;

  if (událost.type == 'mouseover') {
    událost.target.style.background = 'pink'
  }
  if (událost.type == 'mouseout') {
    událost.target.style.background = ''
  }
}
