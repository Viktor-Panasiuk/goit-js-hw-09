export class Timer {
    #timeLeft;
    #dataTimer;

    constructor(date) {

        if (date <= new Date()) {
            this.#dataTimer = new Date();
        } else {
            this.#dataTimer = date;
        }
    }

    static gettimeLeft(dataTimer) {
        return dataTimer - new Date();
    }

    static convertMs = (ms) => {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
    }

    static addLeadingZero = (timer) => {
    const result = {};

    for (const key of Object.keys(timer)) {
        result[key] = String(timer[key]).padStart(2, '0');
    };

    return result;
}

    get timeLeft() {
        this.#timeLeft = Timer.gettimeLeft(this.#dataTimer);
        return this.#timeLeft;
    }

    getTimeLeftObj() {
        return Timer.convertMs(Timer.gettimeLeft(this.#dataTimer))
    }

    getTimeLeftObjStr() {
        return Timer.addLeadingZero(this.getTimeLeftObj());
    }

}