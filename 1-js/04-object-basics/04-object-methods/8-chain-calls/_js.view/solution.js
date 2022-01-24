
let žebřík = {
  stupeň: 0,
  nahoru: function() { 
    this.stupeň++;
    return this;
  },
  dolů: function() { 
    this.stupeň--;
    return this;
  },
<<<<<<< HEAD
  zobrazStupeň: function() { 
    alert(this.stupeň);
=======
  showStep: function() { 
    alert(this.step);
    return this;
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
  }
};