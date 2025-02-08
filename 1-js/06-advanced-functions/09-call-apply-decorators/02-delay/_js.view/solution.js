function zpozdi(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

};