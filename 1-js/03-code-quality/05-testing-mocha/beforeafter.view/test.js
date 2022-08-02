describe("test", function() {
  
   // Mocha obvykle čeká na provedení testu 2 sekundy a pak jej považuje za špatný
  
  this.timeout(200000); // S tímto kódem to můžeme zvýšit - v tomto případě na 200 000 milisekund

  // To je kvůli funkci "alert", protože jestliže budete zaváhat se stisknutím tlačítka "OK", testy neprojdou!
  
  before(() => alert("Začíná testování - před všemi testy"));
  after(() => alert("Končí testování - po všech testech"));

  beforeEach(() => alert("Před testem - vstup do testu"));
  afterEach(() => alert("Po testu - výstup z testu"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
