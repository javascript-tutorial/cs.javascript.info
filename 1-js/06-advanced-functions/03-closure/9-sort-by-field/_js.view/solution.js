function podleVlastnosti(názevVlastnosti){
  return (a, b) => a[názevVlastnosti] > b[názevVlastnosti] ? 1 : -1;
}
