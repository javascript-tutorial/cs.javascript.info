
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
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c
  }
};