let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "blue", "yellow"];
let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// Start the game
document.addEventListener("keypress", function () {
    if (!started) {
        startGame();
    }
});

function startGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = true;
    h2.innerText = "Level 1";
    nextLevel();
}

function nextLevel() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIndex];
    gameSeq.push(randomColor);

    setTimeout(() => flashButton(randomColor), 500);
}

function flashButton(color) {
    let btn = document.querySelector(`.${color}`);
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function handleUserClick() {
    let color = this.getAttribute("data-color");
    userSeq.push(color);
    flashButton(color);

    checkUserSequence(userSeq.length - 1);
}

function checkUserSequence(currentIndex) {
    if (userSeq[currentIndex] !== gameSeq[currentIndex]) {
        gameOver();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        setTimeout(nextLevel, 1000);
    }
}

function gameOver() {
    h2.innerText = "Game Over! Press any key to restart.";
    started = false;

    if (level > highScore) {
        highScore = level - 1; // Subtract 1 as the last level was failed
        alert(`New High Score: ${highScore}`);
    }
}

// Add event listeners to buttons
let buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", handleUserClick);
});
