// Three main elements
const display = document.getElementById("display");
const controlBtn = document.getElementById("control-btn");
const resetBtn = document.getElementById("reset");
// Event listeners
controlBtn.addEventListener("click", startStopTimer);
resetBtn.addEventListener("click", resetTimer);

let startTime = 0;
let elapsedTime = 0;
let interval = null;

function startStopTimer() {
  if (controlBtn.innerHTML === "Start") {
    startTime = Date.now();
    startStopwatch();
    controlBtn.innerHTML = "Stop";
  } else {
    elapsedTime += Date.now() - startTime;
    clearInterval(interval);
    controlBtn.innerHTML = "Start";
  }
}

function resetTimer() {
  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(interval);
  displayTime(0, 0, 0, 0);
}

function startStopwatch() {
  interval = setInterval(function () {
    // calculate elapsed time using Date.now instead of just a setTimeOut since it's more accurate
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now

    const time = Date.now() - startTime + elapsedTime;

    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    const hour = parseInt((time / (1000 * 60 * 60)) % 24);
    // call function to display the time
    displayTime(hour, minutes, seconds, milliseconds);
  }, 1);
}

function displayTime(hour, minutes, seconds, milliseconds) {
  // if only one digit prepend a zero
  const time = [hour, minutes, seconds, milliseconds].map((time) =>
    time < 10 ? `0${time}` : time
  );
  display.innerHTML = time.join(":");
}
