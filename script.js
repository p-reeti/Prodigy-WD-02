let timer;
let elapsed = 0;
let running = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");


function updateDisplay() {
    let hours = Math.floor(elapsed / 3600000);
    let minutes = Math.floor((elapsed % 3600000) / 60000);
    let seconds = Math.floor((elapsed % 60000) / 1000);
    let milliseconds = Math.floor((elapsed % 1000) / 10);

    display.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startPauseBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
    } else {
        const start = Date.now() - elapsed;
        timer = setInterval(() => {
            elapsed = Date.now() - start;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = "Pause";
    }
    running = !running;
});


resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    elapsed = 0;
    running = false;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    laps.innerHTML = ""; 
});

lapBtn.addEventListener("click", () => {
    if (running) {
        const lapTime = document.createElement("li");
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
});


updateDisplay();
