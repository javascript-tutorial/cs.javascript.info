importance: 5

---

# K čemu potřebujeme Origin?

Jak pravděpodobně víte, existuje HTTP hlavička `Referer`, která obvykle obsahuje URL stránky, která vyvolala síťový požadavek.

Například když stahujeme `http://google.com` z `http://javascript.info/some/url`, hlavičky vypadají následovně:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Jak vidíte, je přítomen jak `Referer`, tak `Origin`.

Otázky zní:

1. K čemu je nutný `Origin`, když `Referer` obsahuje ještě více informací?
2. Je možné, aby v požadavku nebyl žádný `Referer` nebo `Origin`, nebo to není korektní?
