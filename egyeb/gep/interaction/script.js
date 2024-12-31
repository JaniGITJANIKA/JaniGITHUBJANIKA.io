let counter = 0;
let timerElement = document.getElementById("timer");
let gameArea = document.getElementById("game-area");
let timer;
let randomTimeInSeconds;

function interg() {
    counter += 1;
    document.getElementById('counter').innerHTML = counter;
}

function interk() {
    counter += 10;
    document.getElementById('counter').innerHTML = counter;
}

function intert() {
    counter +=100;
    document.getElementById('counter').innerHTML =counter;
}

function startGame() {
    timerElement.style.color = "white";
    timerElement.textContent = "0:00";

    randomTimeInSeconds = Math.floor(Math.random() * 181) + 120; // 2-5 perc között

    timer = setInterval(() => {
        let time = parseInt(timerElement.textContent.split(':')[0]) * 60 + parseInt(timerElement.textContent.split(':')[1]);
        time += 1;

        // A formázott idő perc:másodperc formátumban
        timerElement.textContent = formatTime(time);

        if (time >= randomTimeInSeconds) {
            generateImages();
        }
    }, 1000);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function generateImages() {
    clearInterval(timer);
    timerElement.style.color = parseInt(timerElement.textContent.split(':')[0]) < 3 ? "green" : "red";

    let img1 = document.createElement("img");
    let img2 = document.createElement("img");

    img1.src = "kepek/jojobusz.png";  // Az első kép
    img2.src = "kepek/jojobuszm.png";  // A második kép

    img1.className = "game-image";
    img2.className = "game-image";

    img1.draggable = true;
    img2.draggable = false;

    img1.id = "image1";
    img2.id = "image3";

    img1.style.position = "absolute";
    img2.style.position = "absolute";

    // Random pozíció generálása
    placeImage(img1);
    placeImage(img2);

    gameArea.appendChild(img1);
    gameArea.appendChild(img2);

    img1.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });

    img2.addEventListener("dragover", (e) => e.preventDefault());

    img2.addEventListener("drop", (e) => {
        let droppedId = e.dataTransfer.getData("text");
        if (droppedId === "image1") {
            counter += 100000;
            document.getElementById('counter').innerHTML = counter;
            resetGame();
        }
    });
}

function placeImage(img) {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 100);

    img.style.left = x + "px";
    img.style.top = y + "px";

    img.style.width = "10vw";
    img.style.height = "auto";
}

function resetGame() {
    gameArea.innerHTML = "";
    startGame();
}

document.querySelectorAll('.no-drag').forEach((element) => {
element.draggable = false;
});

// Indítás
window.onload = startGame;