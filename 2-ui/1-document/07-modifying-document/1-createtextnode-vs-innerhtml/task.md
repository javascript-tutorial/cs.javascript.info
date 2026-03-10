importance: 5

---

# createTextNode oproti innerHTML oproti textContent

Máme prázdný DOM element `elem` a řetězec `text`.

Které z těchto tří příkazů provedou přesně totéž?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
