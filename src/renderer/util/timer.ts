interface ITimer {
  second: number;
}

class Timer implements ITimer {
  second: number;

  constructor(second: number) {
    this.second = second;
  }

  setTimer = () => {};

  startTimer = () => {};

  stopTimer = () => {};

  continueTimer = () => {};
}

export default Timer;
