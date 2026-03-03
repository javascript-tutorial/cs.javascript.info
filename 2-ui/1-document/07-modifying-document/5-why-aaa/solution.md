Důvodem této podivnosti je, že HTML kód v tomto úkolu je nekorektní.

Prohlížeč ho musí automaticky opravit. Uvnitř `<table>` však nesmí být žádný text: podle specifikace jsou povoleny jen značky specifické pro tabulku. Prohlížeč tedy zobrazí `"aaa"` *před* `<table>`.

Nyní je jasné, proč zůstane, i když tabulku odstraníme.

Na tuto otázku lze snadno odpovědět po prozkoumání DOMu prohlížečovými nástroji. Uvidíte `"aaa"` před `<table>`.

Standard HTML podrobně specifikuje, jak se má zpracovávat vadný HTML, a tak je toto chování prohlížeče korektní.
