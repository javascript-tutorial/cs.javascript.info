Tento test ukazuje jedno z pokušení, kterým vývojář při psaní testů čelí.

To, co zde máme, jsou ve skutečnosti 3 testy, ale jsou vytvořeny jako jediná funkce se 3 kontrolami.

Někdy je jednodušší psát takto, ale když nastane chyba, je mnohem méně zřejmé, co bylo špatně.

Nastane-li chyba uprostřed složitého provádění, musíme v té chvíli zjišťovat, jaká byla data. Vlastně musíme *ladit test*.

Bylo by mnohem lepší rozdělit test do několika `it` bloků s jasně uvedenými vstupy a výstupy.

Například takto:
```js
describe("Umocní x na n-tou", function() {
  it("5 na 1 se rovná 5", function() {
    assert.equal(mocnina(5, 1), 5);
  });

  it("5 na 2 se rovná 25", function() {
    assert.equal(mocnina(5, 2), 25);
  });

  it("5 na 3 se rovná 125", function() {
    assert.equal(mocnina(5, 3), 125);
  });
});
```

Nahradili jsme jediné `it` za `describe` a skupinu `it` bloků. Když nyní něco selže, jasně uvidíme, jaká byla data.

Nyní můžeme také izolovat jediný test a spustit jej samostatně. To uděláme tak, že napíšeme `it.only` místo `it`:


```js
describe("Umocní x na n-tou", function() {
  it("5 na 1 se rovná 5", function() {
    assert.equal(mocnina(5, 1), 5);
  });

*!*
  // Mocha spustí pouze tento blok
  it.only("5 na 2 se rovná 25", function() {
    assert.equal(mocnina(5, 2), 25);
  });
*/!*

  it("5 na 3 se rovná 125", function() {
    assert.equal(mocnina(5, 3), 125);
  });
});
```
