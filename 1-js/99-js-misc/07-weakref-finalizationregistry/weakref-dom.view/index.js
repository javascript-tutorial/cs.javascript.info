const tlačítkoZačítPosílat = document.querySelector('.start-messages'); // (1)
const tlačítkoZavřítOkno = document.querySelector('.window__button'); // (2)
const odkazNaElementOkna = new WeakRef(document.querySelector(".window__body")); // (3)

tlačítkoZačítPosílat.addEventListener('click', () => { // (4)
    startMessages(odkazNaElementOkna);
    tlačítkoZačítPosílat.disabled = true;
});

tlačítkoZavřítOkno.addEventListener('click', () =>  document.querySelector(".window__body").remove()); // (5)


const začniPosílatZprávy = (element) => {
    const idČasovače = setInterval(() => { // (6)
        if (element.deref()) { // (7)
            const zátěž = document.createElement("p");
            zátěž.textContent = `Zpráva: Stav systému OK: ${new Date().toLocaleTimeString()}`;
            element.deref().append(zátěž);
        } else { // (8)
            alert("Element byl odstraněn."); // (9)
            clearInterval(idČasovače);
        }
    }, 1000);
};