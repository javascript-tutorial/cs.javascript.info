importance: 5

---

# Nekonečná stránka

Vytvořte nekonečnou stránku. Když návštěvník doroluje na konec, automaticky připojí k textu aktuální datum a čas (takže návštěvník může rolovat dál).

Příklad:

[iframe src="solution" height=200]

Prosíme všimněte si dvou důležitých vlastností rolování:

1. **Rolování je „elastické“.** Na některých prohlížečích nebo zařízeních můžeme rolovat kousek před začátek nebo za konec dokumentu (zobrazí se prázdné místo dole a pak dokument automaticky „poskočí“ do normálního stavu).
2. **Rolování je nepřesné.** Když dorolujeme na konec stránky, můžeme být ve skutečnosti zhruba 0-50px od skutečného konce dokumentu.

„Dorolování na konec“ by tedy mělo znamenat, že návštěvník není více než 100px od konce dokumentu.

P.S. Ve skutečném životě bychom asi chtěli zobrazit „další zprávy“ nebo „další zboží“.