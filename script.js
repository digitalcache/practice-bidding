const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
info: {
    color: "green"
},
warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
},
alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
}
};

const TIME_LIMIT = 1800;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
</div>
`;

startTimer();
function onTimesUp() {
    clearInterval(timerInterval);
}
function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
).toFixed(0)} 283`;
document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("bidBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    document.getElementById("bidValue").innerText = "$" + initialBidValue;
    document.getElementById("bidFormula").innerText = null;
    document.getElementById("bidFormulaClose").style.display = "none";
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    document.getElementById("bidValue").innerText = "$" + initialBidValue;
    document.getElementById("bidFormula").innerText = null;
    document.getElementById("bidFormulaClose").style.display = "none";
    modal.style.display = "none";
  }
}


initialBidValue = 8500;
document.getElementById("bidValue").innerText = "$" + initialBidValue;
var bidElements = document.getElementsByClassName("bidItem");

var myFunction = function(e) {
    let selectedValue = e.target.innerText.split('-$')[1];
    let formulaString = "$" + initialBidValue + " - $" + selectedValue;
    let formulaValue = initialBidValue - selectedValue;
    document.getElementById("bidValue").innerText = "$" + formulaValue;
    document.getElementById("bidFormulaClose").style.display = "flex";
    document.getElementById("bidFormula").innerText = formulaString;

};

for (var i = 0; i < bidElements.length; i++) {
    bidElements[i].addEventListener('click', myFunction, false);
}

document.getElementById("bidFormulaClose").addEventListener('click', () => {
    document.getElementById("bidValue").innerText = "$" + initialBidValue;
    document.getElementById("bidFormula").innerText = null;
    document.getElementById("bidFormulaClose").style.display = "none";
});