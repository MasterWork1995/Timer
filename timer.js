const refs = {
    days: document.querySelector("[data-value=days]"),
    hours: document.querySelector("[data-value=hours]"),
    mins: document.querySelector("[data-value=mins]"),
    seconds: document.querySelector("[data-value=secs]"),
};

class CountdownTimer {
    constructor({ onTick }) {
        this.targetDate = new Date('Jan 01, 2022');
        this.onTick = onTick;
    }

    start() {
        setInterval(() => {
            const currentTime = Date.now();
            const newYearDate = this.targetDate - currentTime;
            const time = this.getTimeComponents(newYearDate);

            this.onTick(time);
        }, 100);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = this.pad(Math.floor((time % (1000 * 60)) / (1000)));

        return { days, hours, mins, seconds };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new CountdownTimer({
    onTick: updateClockface
});

timer.start(updateClockface);

function updateClockface({ days, hours, mins, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.seconds.textContent = seconds;
}