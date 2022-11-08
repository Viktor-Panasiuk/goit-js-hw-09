import flatpickr from "flatpickr";  
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
let fpDate;
let updateTimetInterval;
const fp = flatpickr(refs.dateTimePicker, pickrOption);

fp.config.onClose.push(onChangeDate);
refs.btnStart.addEventListener('click', onStartClick);

function onStartClick(event) {
    event.target.setAttribute('disabled', true);
    updateTimer();
    updateTimetInterval = setInterval(updateTimer, 1000);
}

function onChangeDate() {
    fpDate = fp.selectedDates[0];

    const nowDate = new Date();

    if (fpDate < nowDate) {
        refs.btnStart.setAttribute('disabled', true);
        Notify.failure('Please choose a date in the future');
        return ;
    };

    refs.btnStart.removeAttribute('disabled'); 
}

const convertMs = (ms) => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (timer) => {
    const keys = Object.keys(timer);
    const result = {};

    for (const key of keys) {
        result[key] = String(timer[key]).padStart(2, '0');
    };

    return result;
}

function updateTimer() {
    const deltaTime = fpDate - (new Date());
    if (deltaTime <= 0) {
        clearInterval(updateTimetInterval);
        return;
    }
    const timer = addLeadingZero(convertMs(deltaTime));
    refs.dataDays.innerText = timer.days;
    refs.dataHours.innerText = timer.hours;
    refs.dataMinutes.innerText = timer.minutes;
    refs.dataSeconds.innerText = timer.seconds;
}