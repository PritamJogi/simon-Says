let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "red", "purple"];

let started = false;
let level = 0;
let highestscore =0;

let h2 = document.querySelector("h2");
let h3= document.querySelector("h3");


//game start krne ke liye
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});


//random button click krne ke bad white background lane ke liye 
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


//user click karega to black color lane ke liye
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randomidx = Math.floor(Math.random() * 4);
    let randcolor = btns[randomidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    btnflash(randbtn);
}

function checkans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `game over..! <b> your score was ${level}</b> <br> press any key to start again`;
        updateHighScore();
        h3.innerText= `highest score: ${highestscore}`;
        gameover();
        reset();
    }
}

//game over hone ke bad red color ke liye
function gameover() {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    }, 250);
}


function btnpress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    userSeq = [];
    level = 0;
    started = false;
    gameSeq = [];
}


function updateHighScore() {
    if (level > highestscore) {
        highestscore = level;
    }
}

