let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);

        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;

        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
        lapButton.disabled = true;
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timerInterval);
    difference = 0;
    display.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
    lapCounter = 0;

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    const milliseconds = Math.floor((difference % 1000) / 10);

//     display.textContent =
        (hours < 10 ? "0" : "") + hours + ":" +
/
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 10 ? "0" : "") + milliseconds;
// }

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
