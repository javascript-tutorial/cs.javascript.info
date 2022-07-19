importance: 2

---

# Zřetězení

Máme objekt `žebřík`, který nám umožňuje chodit nahoru a dolů:

```js
let žebřík = {
  stupeň: 0,
  nahoru() { 
    this.stupeň++;
  },
  dolů() { 
    this.stupeň--;
  },
  zobrazStupeň: function() { // zobrazí aktuální stupeň
    alert( this.stupeň );
  }
};
```

Když nyní potřebujeme učinit několik volání po sobě, můžeme to udělat takto:

```js
žebřík.nahoru();
žebřík.nahoru();
žebřík.dolů();
žebřík.zobrazStupeň(); // 1
žebřík.dolů();
žebřík.zobrazStupeň(); // 0
```

Upravte kód funkcí `nahoru`, `dolů` a `zobrazStupeň` tak, aby bylo možné volání zřetězit takto:

```js
žebřík.nahoru().nahoru().dolů().zobrazStupeň().dolů().zobrazStupeň(); // zobrazí 1, pak 0
```

Takový přístup se zeširoka používá v JavaScriptových knihovnách.
