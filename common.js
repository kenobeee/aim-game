const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#timeChoose');
const timePoint = document.querySelector('#time');
const board = document.querySelector('#board');
const totalScoreSpan = document.querySelector('#totalScoreSpan');
let time = 0;
let score = 0;

startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        totalScoreSpan.classList.add('active');
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        changeTotalScore()
        createRandomCircle();
    }
})

function startGame() {
    setTime(time);
    createRandomCircle()
    setInterval(decreaseTime, 1000);
}

function changeTotalScore() {
    totalScoreSpan.innerHTML = `${score}`;
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timePoint.innerHTML = `00:${value}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const {height, width} = board.getBoundingClientRect();
    const minSize = 15;
    const maxSize = 65;
    const circleSize = getRandomNumber(minSize, maxSize);
    const x = getRandomNumber(0, width - circleSize);
    const y = getRandomNumber(0, height - circleSize);

    circle.classList.add('circle');
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function finishGame() {
    timePoint.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
}