
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
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
  }
};