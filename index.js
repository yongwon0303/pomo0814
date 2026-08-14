const DEFAULT_MINUTES = 25;
const STORAGE_KEY = "pomodoroMinutes";

const timeDisplay = document.getElementById("time-display");
const timerNotice = document.getElementById("timer-notice");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

const storedMinutes = Number(localStorage.getItem(STORAGE_KEY));
const timerMinutes = storedMinutes > 0 ? storedMinutes : DEFAULT_MINUTES;

let remainingSeconds = timerMinutes * 60;
let timerId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function tick() {
  if (remainingSeconds <= 0) {
    clearInterval(timerId);
    timerId = null;
    timerNotice.textContent = "설정된 시간이 완료되었습니다.";
    return;
  }
  remainingSeconds--;
  updateDisplay();
}

startBtn.onclick = function () {
  if (timerId !== null) return;
  if (remainingSeconds <= 0) return;
  timerNotice.textContent = "";
  timerId = setInterval(tick, 1000);
};

stopBtn.onclick = function () {
  clearInterval(timerId);
  timerId = null;
};

resetBtn.onclick = function () {
  clearInterval(timerId);
  timerId = null;
  remainingSeconds = timerMinutes * 60;
  timerNotice.textContent = "";
  updateDisplay();
};

updateDisplay();
