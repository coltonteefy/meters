const powerBar = document.getElementById('power');
const box = document.getElementById('box');
const nextBtn = document.getElementById('btnNext');
const againBtn = document.getElementById('btnAgain');
const startBtn = document.getElementById('btnStart');
const stopBtn = document.getElementById('btnStop');
const retryBtn = document.getElementById('btnRetry');
const circ1 = document.getElementById('circ1');
const circ2 = document.getElementById('circ2');
const circ3 = document.getElementById('circ3');
const lives = document.getElementById('lives');
const level = document.getElementById('level');
const loser = document.getElementById('loser');
const check = document.getElementById('check');
const lvlUp = document.getElementById('lvlUp');
const redX = document.getElementById('redX');
let value = 0;
let change = 0;
let levelUp = 0;
let rand = 0;
let lvl = 1;
let speed = 10;
let w = 30;
let misses = 3;

window.onLoad = function () {
    rand = Math.floor(Math.random() * 69);
    box.style.left = rand + '%';
    clearInterval(goPower);
    let context = new AudioContext();
};

//determines if meter is inside or outside of the goal lines
function powerControl() {
    btnChange();
    if (change === 0) {
        powerBar.value = powerBar.value + 1;
        value = value + 1;
        if (value >= 101) {
            change = 1
        }
    }
    if (change === 1) {
        powerBar.value = powerBar.value - 1;
        value = value - 1;
        if (value === 0) {
            change = 0
        }
    }
}

//determines the success or failure when meter is stopped. Adds progress if success or starts level over when failure
function stopPower() {
    clearInterval(goPower);

    stopBtn.style.visibility = 'hidden';

    if (powerBar.value >= rand && powerBar.value <= rand + w) {
        nextBtn.style.visibility = 'visible';
        againBtn.style.visibility = 'hidden';
        levelUp += 1;
        if (levelUp === 1) {
            circ1.style.fill = 'green';
            success(check);
        }

        if (levelUp === 2) {
            circ2.style.fill = 'green';
            success(check);
        }

        if (levelUp === 3) {
            circ3.style.fill = 'green';

            showLevelUpText();

            setTimeout(() => {
                circ1.style.fill = 'white';
            circ2.style.fill = 'white';
            circ3.style.fill = 'white';
        },800);

            nextLevel();
        }
        lvlUp.style.left = '0px';

    } else if (powerBar.value < rand || powerBar.value > rand + w) {
        nextBtn.style.visibility = 'hidden';
        againBtn.style.visibility = 'visible';
        misses = misses - 1;
        lives.innerHTML = "Lives: " + misses;
        levelUp = 0;
        circ1.style.fill = 'white';
        circ2.style.fill = 'white';
        circ3.style.fill = 'white';

        if (misses === 0) {
            lives.innerHTML = "Lives " + misses;
            loser.classList.add("loseFlash");
            retryBtn.style.visibility = 'visible';
            againBtn.style.visibility = 'hidden';
        } else {
            success(redX);
        }
    }
}

function gameLost() {
    value = 0;
    change = 0;
    levelUp = 0;
    rand = 0;
    lvl = 1;
    level.innerHTML = 'level ' + lvl;
    speed = 10;
    w = 30;
    box.style.width = w + '%';
    misses = 3;
    lives.innerHTML = "Lives: " + misses;
    loser.classList.remove("loseFlash")
    retryBtn.style.visibility = 'hidden';
    stopBtn.style.visibility = 'visible';
    next();
}

function startPower() {
    rand = Math.floor(Math.random() * 69);
    box.style.left = rand + '%';
    goPower = setInterval(function () {
        powerControl();
    }, speed);
}

function btnChange() {
    startBtn.style.visibility = 'hidden';
    stopBtn.style.visibility = 'visible';
}

function next() {
    box.style.left = Math.floor(Math.random() * 69) + '%';
    startPower();
    stopBtn.style.visibility = 'visible';
    nextBtn.style.visibility = 'hidden';
    againBtn.style.visibility = 'hidden';
    powerBar.value = Math.floor(Math.random() * 100);
}

function nextLevel() {
    lvl += 1;
    speed = speed - 1;
    levelUp = 0;
    w = w - 3;
    box.style.width = w + '%';
    level.innerHTML = 'level ' + lvl;
}

function success(item) {
    item.classList.add("flash");
    setTimeout(() => {
        item.classList.remove("flash");
}, 1000);
}

function showLevelUpText() {
    lvlUp.classList.add("floatBy");
    setTimeout(() => {
        lvlUp.classList.remove("floatBy");
}, 2000);
}
