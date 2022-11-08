const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

let interval = null;

refs.btnStart.addEventListener('click', btnStartClick);
refs.btnStop.addEventListener('click', btnStopClick);


function btnStartClick(event) {
    setBgdColor(refs.body);
    interval = setInterval(setBgdColor, 1000, refs.body);
    event.target.setAttribute('disabled', true);
    refs.btnStop.removeAttribute('disabled');
}

function btnStopClick(event) {
    clearInterval(interval);
    event.target.setAttribute('disabled', true);
    refs.btnStart.removeAttribute('disabled');
}

function setBgdColor(el) {
    el.setAttribute('style', `background-color: ${getRandomHexColor()}`);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}