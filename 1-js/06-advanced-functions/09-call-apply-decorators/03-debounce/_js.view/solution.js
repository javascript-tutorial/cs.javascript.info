function vyčkej(funkce, ms) {
  let časovač;
  return function() {
    clearTimeout(časovač);
    časovač = setTimeout(() => funkce.apply(this, arguments), ms);
  };
}
