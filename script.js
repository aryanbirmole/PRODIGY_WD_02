const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 0;
let lastLapTime = 0;

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedCentiseconds = String(centiseconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
}

function updateButtons() {
  if (isRunning) {
    startBtn.disabled = true;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = true;
  } else {
    if (elapsedTime > 0) {
      startBtn.disabled = false;
      startBtn.textContent = 'Resume';
      pauseBtn.disabled = true;
      lapBtn.disabled = true;
      resetBtn.disabled = false;
    } else {
      startBtn.disabled = false;
      startBtn.textContent = 'Start';
      pauseBtn.disabled = true;
      lapBtn.disabled = true;
      resetBtn.disabled = true;
    }
  }
}

function start() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
  updateButtons();
}

function pause() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
  updateButtons();
}

function reset() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = 0;
  elapsedTime = 0;
  lastLapTime = 0;
  lapCounter = 0;
  display.textContent = '00:00:00.00';
  lapList.innerHTML = '<li class="lap-empty">No laps recorded</li>';
  updateButtons();
}

function recordLap() {
  if (!isRunning) return;
  lapCounter++;
  const currentLapDuration = elapsedTime - lastLapTime;
  lastLapTime = elapsedTime;

  const emptyPlaceholder = lapList.querySelector('.lap-empty');
  if (emptyPlaceholder) {
    emptyPlaceholder.remove();
  }

  const li = document.createElement('li');
  li.className = 'lap-item';

  const lapNum = document.createElement('span');
  lapNum.textContent = `Lap ${lapCounter}`;

  const splitTime = document.createElement('span');
  splitTime.textContent = formatTime(currentLapDuration);

  const overallTime = document.createElement('span');
  overallTime.textContent = formatTime(elapsedTime);

  li.appendChild(lapNum);
  li.appendChild(splitTime);
  li.appendChild(overallTime);

  lapList.prepend(li);
  lapList.scrollTop = 0;
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);

updateButtons();