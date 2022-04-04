function debounce(funkce, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => funkce.apply(this, arguments), ms);
  };
}
