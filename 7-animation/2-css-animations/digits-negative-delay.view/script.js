pás.onclick = function() {
  let sekunda = new Date().getSeconds() % 10;
  pás.style.transitionDelay = '-' + sekunda + 's';
  pás.classList.add('animace');
};