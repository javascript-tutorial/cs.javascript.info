function čekej(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

};