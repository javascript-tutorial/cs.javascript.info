# Stáhněte uživatele z GitHubu

Vytvořte asynchronní funkci `vraťUživatele(jména)`, která obdrží pole uživatelských jmen na GitHubu, stáhne z GitHubu příslušné uživatele a vrátí je jako pole.

URL GitHubu s informacemi o uživateli s uživatelským jménem `USERNAME` je: `https://api.github.com/users/USERNAME`.

V pískovišti najdete testovací příklad.

Důležité detaily:

1. Pro každého uživatele by se měl volat jeden požadavek `fetch`.
2. Požadavky by na sebe neměly navzájem čekat. Data tedy dorazí tak rychle, jak je to možné.
3. Jestliže některý požadavek selže nebo zadaný uživatel neexistuje, funkce by ve výsledném poli měla vrátit `null`.
