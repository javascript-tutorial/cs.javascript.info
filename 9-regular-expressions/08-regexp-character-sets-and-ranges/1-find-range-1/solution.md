Odpovědi zní: **ne, ano**.

- V řetězci `subject:Java` nenalezne nic, neboť `pattern:[^script]` znamená „jakýkoli znak kromě uvedených“. Regulární výraz tedy bude hledat řetězec `"Java"` následovaný jedním takovým symbolem, ale po něm nenásleduje žádný symbol, nýbrž konec řetězce.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
- Ano, protože části `pattern:[^script]` odpovídá znak `"S"`, který není jedním ze `pattern:script`. Protože tento RV rozlišuje malá a velká písmena (nemá příznak `pattern:i`), bude `"S"` považovat za jiný znak než `"s"`.

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
