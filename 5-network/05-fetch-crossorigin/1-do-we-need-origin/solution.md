`Origin` potřebujeme proto, že `Referer` někdy schází. Například když pomocí `fetch` stahujeme HTTP stránku z HTTPS (přistupujeme k méně bezpečné stránce z bezpečnější), `Referer` tam není.

[Politika bezpečného obsahu (Content Security Policy)](http://en.wikipedia.org/wiki/Content_Security_Policy) může poslání `Referer` zakázat.

Jak dále uvidíme, `fetch` obsahuje volby, které brání v poslání `Referer` a dokonce jej umožňují změnit (v rámci stejného sídla).

Podle specifikace je `Referer` nepovinná HTTP hlavička.

`Origin` byl vynalezen právě proto, že `Referer` je nespolehlivý. U požadavků jiného původu prohlížeč zaručuje korektní `Origin`.
