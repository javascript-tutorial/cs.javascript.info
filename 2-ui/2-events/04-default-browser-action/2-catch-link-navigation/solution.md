Zde skvěle využijeme vzorec delegování událostí.

Ve skutečném životě můžeme místo dotazu poslat na server požadavek na „logování“, který si uloží informace o tom, kam návštěvník odešel. Nebo můžeme načíst obsah a zobrazit jej přímo na stránce (pokud je to dovoleno).

Stačí nám zachytávat `obsah.onclick` a pomocí `confirm` se zeptat uživatele. Dobrý nápad by byl použít pro URL `odkaz.getAttribute('href')` namísto `odkaz.href`. Podrobnosti viz řešení.
