let kalkulátor = {
  součet() {
    return this.a + this.b;
  },

  součin() {
    return this.a * this.b;
  },

  načti() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
};