let timerInterval;
let startTime;

export function startTimer(updateTimerCallback) {
  startTime = Date.now();
  timerInterval = setInterval(() => updateTimerCallback(startTime), 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function updateTimer(startTime) {
  const elapsedTime = Date.now() - startTime;
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `Time: ${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
}
