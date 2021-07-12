export class CountdownTimer {
  constructor({ selector, targetDate }) {
    const timerRef = document.querySelector(selector);
    this.targetDate = targetDate;
    this.daysRef = timerRef.querySelector('[data-value="days"]');
    this.hoursRef = timerRef.querySelector('[data-value="hours"]');
    this.minsRef = timerRef.querySelector('[data-value="mins"]');
    this.secsRef = timerRef.querySelector('[data-value="secs"]');
    this.timeLeft = null;
    this.countDownTime = 1000;
    this.timerId = null;
  }
  init() {
    const timeLeft = this.targetDate.getTime() - Date.now();
    this.setTimeLeft(timeLeft);
    this.render();
  }
  start() {
    this.init();
    const countDownFunc = this.getFuncForTimer();
    this.timerId = setInterval(countDownFunc, this.countDownTime);
  }
  setTimeLeft(timeLeft) {
    this.timeLeft = timeLeft >= 0 ? timeLeft : 0;
  }
  getFuncForTimer() {
    const timeLeft = () => {
      if (this.timeLeft === 0 && this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
        return;
      }
      const timeLeft = this.timeLeft - this.countDownTime;
      this.setTimeLeft(timeLeft);
      this.render();
    };
    return timeLeft;
  }
  render() {
    this.daysRef.innerHTML = this.getDays(this.timeLeft);
    this.hoursRef.innerHTML = this.getHours(this.timeLeft);
    this.minsRef.innerHTML = this.getMins(this.timeLeft);
    this.secsRef.innerHTML = this.getSecs(this.timeLeft);
  }
  getDays(time) {
    const days = this.transformToFormat(Math.floor(time / (1000 * 60 * 60 * 24)));
    return days;
  }
  getHours(time) {
    const hours = this.transformToFormat(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    return hours;
  }
  getMins(time) {
    const mins = this.transformToFormat(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    return mins;
  }

  getSecs(time) {
    const secs = this.transformToFormat(Math.floor((time % (1000 * 60)) / 1000));
    return secs;
  }
  transformToFormat(time) {
    return String(time).padStart(2, '0');
  }
}
