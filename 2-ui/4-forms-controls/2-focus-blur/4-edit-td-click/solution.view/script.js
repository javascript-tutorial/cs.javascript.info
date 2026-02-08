let tabulka = document.getElementById('tabulka-pa-kua');

let editovanáTd;

tabulka.onclick = function(událost) {

  // 3 možné cíle
  let cíl = událost.target.closest('.edit-storno,.edit-ok,td');

  if (!tabulka.contains(cíl)) return;

  if (cíl.className == 'edit-storno') {
    ukončiEditaciTd(editovanáTd.elem, false);
  } else if (cíl.className == 'edit-ok') {
    ukončiEditaciTd(editovanáTd.elem, true);
  } else if (cíl.nodeName == 'TD') {
    if (editovanáTd) return; // již editujeme

    učiňTdEditovatelnou(cíl);
  }

};

function učiňTdEditovatelnou(td) {
  editovanáTd = {
    elem: td,
    data: td.innerHTML
  };

  td.classList.add('edit-td'); // td je ve stavu editace, CSS také nastaví styly plochy uvnitř

  let textArea = document.createElement('textarea');
  textArea.style.width = td.clientWidth + 'px';
  textArea.style.height = td.clientHeight + 'px';
  textArea.className = 'edit-area';

  textArea.value = td.innerHTML;
  td.innerHTML = '';
  td.appendChild(textArea);
  textArea.focus();

  td.insertAdjacentHTML("beforeEnd",
    '<div class="edit-tlačítka"><button class="edit-ok">OK</button><button class="edit-storno">STORNO</button></div>'
  );
}

function ukončiEditaciTd(td, jeOk) {
  if (jeOk) {
    td.innerHTML = td.firstChild.value;
  } else {
    td.innerHTML = editovanáTd.data;
  }
  td.classList.remove('edit-td'); 
  editovanáTd = null;
}
