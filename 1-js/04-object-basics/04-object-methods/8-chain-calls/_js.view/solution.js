
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
  zobrazStupeň: function() { 
    alert(this.stupeň);
  }
};