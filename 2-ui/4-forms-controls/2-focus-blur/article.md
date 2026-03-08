# Fokus: focus/blur

Element získá fokus tehdy, když na něj uživatel buď klikne, nebo použije klávesu `key:Tab` na klávesnici. Existuje také HTML atribut `autofocus`, který standardně umístí fokus na element, když se stránka načte, a jsou i jiné způsoby získání fokusu.

Přesun fokusu na element obecně znamená: „připrav se přijímat data“, takže to je chvíle, kdy můžeme spustit kód, abychom inicializovali požadovanou funkcionalitu.

Ještě důležitější může být okamžik ztráty fokusu („blur“). Ten nastane, když uživatel klikne někam jinam nebo stiskne `key:Tab`, aby se přesunul na další pole ve formuláři. Jsou i jiné způsoby ztráty fokusu.

Ztráta fokusu obecně znamená: „data byla zadána“, takže můžeme spustit kód, který je zkontroluje, nebo je dokonce uloží na server a podobně.

Práce s fokusovými událostmi má důležité zvláštnosti. Budeme se je dále snažit co nejlépe vysvětlit.

## Události focus/blur

Událost `focus` je volána, když element získá fokus, a `blur`, když jej ztratí.

Využijme je ke kontrole vstupního pole.

V následujícím příkladu:

- Handler `blur` zkontroluje, zda byl do pole zadán e-mail, a pokud ne, zobrazí chybu.
- Handler `focus` skryje chybovou zprávu (při události `blur` bude kontrola provedena znovu):

```html run autorun height=60
<style>
  .vadný { border-color: red; }
  #chyba { color: red }
</style>

Váš e-mail, prosím: <input type="email" id="input">

<div id="chyba"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // to není e-mail
    input.classList.add('vadný');
    chyba.innerHTML = 'Zadejte prosím platný e-mail.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('vadný')) {
    // odstraníme indikaci "chyba", protože uživatel chce znovu něco zadat
    this.classList.remove('vadný');
    chyba.innerHTML = "";
  }
};
</script>
```

Moderní HTML nám umožňuje provádět mnoho kontrol pomocí vstupních atributů: `required`, `pattern` a podobně. Někdy je to přesně to, co potřebujeme. Chceme-li více flexibility, můžeme použít JavaScript. Můžeme také automaticky odeslat změněnou hodnotu na server, pokud je korektní.


## Metody focus/blur

Metoda `elem.focus()` nastaví fokus na element, metoda `elem.blur()` odebere fokus z elementu.

Například zakažme návštěvníkovi opustit vstupní pole, pokud je jeho hodnota neplatná:

```html run autorun height=80
<style>
  .chyba {
    background: red;
  }
</style>

Váš e-mail, prosím: <input type="email" id="input">
<input type="text" style="width:300px" placeholder="zadejte neplatný e-mail a zkuste sem vstoupit">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // to není e-mail
      // zobrazí se chyba
      this.classList.add("chyba");
*!*
      // ...a fokus se vrátí zpět
      input.focus();
*/!*
    } else {
      this.classList.remove("chyba");
    }
  };
</script>
```

Funguje to ve všech prohlížečích kromě Firefoxu ([v důsledku chyby](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Jestliže do vstupního pole něco zadáme a pak se pokusíme použít `key:Tab` nebo klikneme mimo `<input>`, pak `onblur` vrátí fokus zpět.

Prosíme všimněte si, že nemůžeme „zakázat ztrátu fokusu“ voláním `událost.preventDefault()` v `onblur`, protože `onblur` se spustí až *poté*, co element ztratil fokus.

V praxi bychom si však měli dobře rozmyslet, zda budeme něco takového implementovat, protože obecně *bychom měli uživateli zobrazovat chyby*, ale *neměli bychom mu bránit pokračovat* ve vyplňování formuláře. Může chtít napřed vyplnit ostatní pole.

```warn header="Ztráta fokusu iniciovaná JavaScriptem"
Ke ztrátě fokusu může dojít z mnoha důvodů.

Jeden z nich je situace, kdy návštěvník klikne někam jinam. Ale ztrátu může způsobit i samotný JavaScript, například:

- `alert` strhne fokus na sebe, takže způsobí ztrátu fokusu na elementu (událost `blur`), a když `alert` zmizí, fokus se vrátí zpět (událost `focus`).
- Pokud je element odstraněn z DOMu, dojde také ke ztrátě fokusu. Pokud je později znovu vložen, fokus se na něj nevrátí.

Tyto vlastnosti mohou někdy způsobit, že se handlery `focus/blur` nechovají správně -- spustí se, když nejsou zapotřebí.

Nejlepším receptem je dávat si při používání těchto událostí pozor. Chceme-li sledovat ztrátu fokusu iniciovanou uživatelem, měli bychom se vyhnout tomu, že ji způsobíme sami.
```

## Povolení fokusu na kterýkoli element: tabindex

Mnoho elementů standardně fokus nepodporuje.

Jejich seznam se mezi jednotlivými prohlížeči mírně liší, ale jedno platí vždy: podpora `focus/blur` je zaručena u elementů, s nimiž může návštěvník interagovat: `<button>`, `<input>`, `<select>`, `<a>` a podobně.

Naproti tomu elementy, jejichž účelem je něco formátovat, např. `<div>`, `<span>`, `<table>`, standardně nemohou fokus získat. Metoda `elem.focus()` na nich nefunguje a události `focus/blur` se nikdy nespustí.

To můžeme změnit použitím HTML atributu `tabindex`.

Každý element, který má `tabindex`, může získat fokus. Hodnotou tohoto atributu je pořadové číslo elementu, když je použita klávesa `key:Tab` (nebo něco podobného) k přepínání mezi elementy.

To znamená, že máme-li dva elementy, první má `tabindex="1"` a druhý `tabindex="2"`, pak když jsme v prvním elementu a stiskneme `key:Tab`, fokus se přesune na druhý.

Pořadí přepínání je následující: napřed jdou elementy s `tabindex` od `1` a vyšším (v pořadí podle `tabindex`), pak elementy bez `tabindex` (např. obvyklý `<input>`).

Elementy bez odpovídajícího `tabindex` se přepínají v pořadí, v jakém jsou ve zdrojovém kódu dokumentu (standardní pořadí).

Dvě hodnoty jsou speciální:

- `tabindex="0"` umístí element mezi ty, které nemají `tabindex`. To znamená, že když přepínáme mezi elementy, elementy s `tabindex=0` následují až po elementech s `tabindex ≥ 1`.

    To se obvykle používá k tomu, abychom umožnili elementu získat fokus, ale zachovali standardní pořadí přepínání. Abychom element učinili součástí formuláře na stejné úrovni, jako `<input>`.

- `tabindex="-1"` umožňuje nastavit fokus na element pouze programově. Klávesa `key:Tab` takové elementy přeskakuje, ale metoda `elem.focus()` na nich funguje.

Například zde máme seznam. Klikněte na první položku a stiskněte `key:Tab`:

```html autorun no-beautify
Klikněte na první položku a stiskněte Tab. Sledujte pořadí přesunu fokusu. Prosíme všimněte si, že mnoho následujících stisknutí Tab může v tomto příkladu přesunout fokus mimo iframe.
<ul>
  <li tabindex="1">Jedna</li>
  <li tabindex="0">Nula</li>
  <li tabindex="2">Dvě</li>
  <li tabindex="-1">Minus jedna</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

Pořadí je následující: `1 - 2 - 0`. Běžně `<li>` nepodporuje fokus, ale `tabindex` jej umožní včetně vlastností a nastavení stylů pomocí `:focus`.

```smart header="Funguje i vlastnost `elem.tabIndex`"
V JavaScriptu můžeme přidat `tabindex` pomocí vlastnosti `elem.tabIndex`, která má stejný efekt.
```

## Delegování: focusin/focusout

Události `focus` a `blur` nebublají.

Nemůžeme například umístit `onfocus` na `<form>`, abychom jej zvýraznili, třeba takto:

```html autorun height=80
<!-- při fokusu na formulář -- přidáme třídu -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="jméno" value="Jméno">
  <input type="text" name="příjmení" value="Příjmení">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

Uvedený příklad nefunguje, protože když uživatel nastaví fokus na `<input>`, událost `focus` se spustí jen na tomto vstupu a neprobublá výš. Proto se `form.onfocus` nikdy nespustí.

Má to dvě řešení.

Za prvé, `focus/blur` mají jednu veselou historickou vlastnost: nebublají, ale propadají se dolů ve fázi zachytávání.

Tohle bude fungovat:

```html autorun height=80
<form id="form">
  <input type="text" name="jméno" value="Jméno">
  <input type="text" name="příjmení" value="Příjmení">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // umístíme handler ve fázi zachytávání (poslední argument je true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Za druhé, existují vlastnosti `focusin` a `focusout` -- jsou přesně stejné jako `focus/blur`, ale bublají.

Všimněte si, že musejí být přiřazeny pomocí `elem.addEventListener`, ne pomocí `on<událost>`.

Zde je tedy jiná fungující varianta:

```html autorun height=80
<form id="form">
  <input type="text" name="jméno" value="Jméno">
  <input type="text" name="příjmení" value="Příjmení">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Shrnutí

Události `focus` a `blur` se spouštějí na elementech, když získávají/ztrácejí fokus.

Mají následující zvláštnosti:
- Nebublají. Můžeme však použít fázi zachytávání nebo události `focusin/focusout`.
- Většina elementů standardně fokus nepodporuje. Abyste umožnili elementu získávat fokus, použijte `tabindex`.

Element, který má aktuálně fokus, je k dispozici jako `document.activeElement`.
