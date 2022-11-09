import flatpickr from "flatpickr";  
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Timer } from './timer-class';



const refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
};
const pickrOption = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    defaultDate: new Date(),
    time_24hr: true,
    minuteIncrement: 1,
};
const fp = flatpickr(refs.dateTimePicker, pickrOption);

let timer;
let updateTimetInterval;


fp.config.onClose.push(onChangeDate);
refs.btnStart.addEventListener('click', onStartClick);

function onChangeDate() {
    const fpDate = fp.selectedDates[0];

    if (fpDate < new Date()) {
        refs.btnStart.setAttribute('disabled', true);
        Notify.failure('Please choose a date in the future');
        return ;
    };

    refs.btnStart.removeAttribute('disabled'); 
    timer = new Timer(fpDate);
}

function onStartClick(event) {
    event.target.setAttribute('disabled', true);
    updateTimer();
    updateTimetInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timer.timeLeft <= 0) {
        clearInterval(updateTimetInterval);
        return;
    }
    refs.dataDays.innerText = timer.getTimeLeftObjStr().days;
    refs.dataHours.innerText = timer.getTimeLeftObjStr().hours;
    refs.dataMinutes.innerText = timer.getTimeLeftObjStr().minutes;
    refs.dataSeconds.innerText = timer.getTimeLeftObjStr().seconds;
}