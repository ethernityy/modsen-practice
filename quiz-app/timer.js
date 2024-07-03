let timerInterval;
let startTime;

export function startTimer(timerElement) {
  startTime = Date.now();
  timerInterval = setInterval(() => updateTimer(timerElement), 1000);
}

function updateTimer(timerElement) {
  const elapsedTime = Date.now() - startTime;
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerElement.textContent = `Time: ${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
}

export function stopTimer() {
  clearInterval(timerInterval);
}
