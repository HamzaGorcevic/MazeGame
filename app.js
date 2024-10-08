let field = document.querySelector(".field");
let counterH1 = document.querySelector(".counter");
let endPos = [];
let pos1 = 0;
let pos2 = 0;
let Toggler = document.querySelector(".toggler");
let toggle = document.querySelector(".Toggle");
let clock = document.querySelector(".clock");
let gameFinsished = document.querySelector(".gameFinished");
let btnReload = document.querySelector(".btnReload");
let nmOfMoves = document.querySelector(".numberOfMoves");
let showBestPath = document.querySelector(".showBestPath");
let shortest = document.querySelector(".shortest");
let dimensions = 0;
let tCheck = true;
let counter = 0;
let ticking = 0;
let tickingInterval;

Toggler.addEventListener("click", () => {
    tCheck = !tCheck;
    toggle.style.display = tCheck ? "none" : "flex";
});

btnReload.addEventListener("click", () => {
    location.reload();
});
class Square {
    constructor(top, left, right, bottom, i, j) {
        this.top = top;
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.i = i;
        this.j = j;
    }

    create(i, j) {
        let dot = document.createElement("div");
        if (i == 0) {
            dot.style.borderTop = "2px solid black";
        }
        if (j == 0) {
            dot.style.borderLeft = "2px solid black";
        }
        if (i == dimensions - 1) {
            dot.style.borderBottom = "2px solid black";
        }
        if (j == dimensions - 1) {
            dot.style.borderRight = "2px solid black";
        }
        dot.className = "dot";
        i != 0 ? (dot.style.borderTop = `solid black ${this.top}px `) : "";

        j != 0 ? (dot.style.borderLeft = `solid black ${this.left}px `) : "";

        j != dimensions - 1
            ? (dot.style.borderRight = `solid black ${this.right}px `)
            : "";
        i != dimensions - 1
            ? (dot.style.borderBottom = `solid black ${this.bottom}px `)
            : "";

        return dot;
    }
}
function createMaze(x, y, matrix) {
    for (i = 0; i < dimensions; i++) {
        let kolona = document.createElement("div");
        kolona.style.height = "16px";

        field.style.maxWidth = `${dimensions * 20}px`;
        field.style.minWidth = `${dimensions * 20}px`;

        for (j = 0; j < dimensions; j++) {
            let kvadrat = new Square(...matrix[i][j]);
            kolona.append(kvadrat.create(i, j));
        }
        field.append(kolona);
    }

    // trying to find safe position to create end point
    do {
        randomX = Math.floor(Math.random() * dimensions);
        randomY = Math.floor(Math.random() * dimensions);
    } while (randomX === x && randomY === y);

    field.childNodes[randomX].childNodes[randomY].classList.add("end");
    endPos.push(randomX);
    endPos.push(randomY);
    //
    //Start

    let visited = [];
    for (let i = 0; i < dimensions; i++) {
        visited[i] = [];
        for (let j = 0; j < dimensions; j++) {
            visited[i][j] = 0;
        }
    }
    visited[x][y] = 1;

    directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    let createdCellCounter = dimensions * dimensions;

    generateMaze(createdCellCounter, x, y, visited);
}
function generateMaze(createdCellCounter, x, y, visited, backtrack = []) {
    let help = 0;
    if (createdCellCounter <= 0) {
        return;
    }

    for (let s = 0; s < 4; s++) {
        const [moveX, moveY] =
            directions[Math.floor(Math.random() * directions.length)];
        const newX = x + moveX;
        const newY = y + moveY;
        if (
            newY < dimensions &&
            newX < dimensions &&
            newX >= 0 &&
            newY >= 0 &&
            !visited[newX][newY]
        ) {
            help++;
            createdCellCounter--;

            visited[newX][newY] = 1;
            backtrack.push([newX, newY]);

            if (y < newY) {
                field.childNodes[newX].childNodes[y].style.borderRight =
                    "0px solid red";
                field.childNodes[newX].childNodes[newY].style.borderLeft =
                    "0px solid red";
            } else if (x < newX) {
                field.childNodes[newX].childNodes[newY].style.borderTop =
                    "0px solid blue";

                field.childNodes[x].childNodes[newY].style.borderBottom =
                    "0px solid blue";
            }
            if (y > newY) {
                field.childNodes[newX].childNodes[newY].style.borderRight =
                    "0px solid red";
                field.childNodes[newX].childNodes[y].style.borderLeft =
                    "0px solid red";
            } else if (x > newX) {
                field.childNodes[x].childNodes[newY].style.borderTop =
                    "0px solid blue";
                field.childNodes[newX].childNodes[newY].style.borderBottom =
                    "0px solid blue";
            }
            setTimeout(() => {
                generateMaze(
                    createdCellCounter,
                    newX,
                    newY,
                    visited,
                    backtrack
                );
            }, 30);
        }
    }
}
function MoveMe(pos1, pos2) {
    field.querySelector(".start").classList.add("dot");
    field.querySelector(".start").classList.remove("start");
    field.childNodes[pos1].childNodes[pos2].className = "start";
}
function clearField() {
    pos1 = 0;
    pos2 = 0;
    endPos = [];

    window.removeEventListener("keydown", MovingLogic);
    eventListenerToggle = false;

    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
}
function CountingMoves(counter) {
    counterH1.innerHTML = `${counter}`;
}

function StartGame(len) {
    showBestPath.addEventListener("click", () => {
        let inner = findShortestPath(0, 0, len, 1);
        shortest.innerHTML = `${inner}`;
    });
    ticking = 0;

    tickingInterval = setInterval(() => {
        ticking++;
        clock.innerHTML = `${ticking}`;
    }, 1000);

    clearField();

    dimensions = len;

    const matrix = Array.from({ length: dimensions }, () =>
        Array.from({ length: dimensions }, () =>
            Array.from({ length: 4 }, () => 1)
        )
    );
    //logic

    createMaze(0, 0, matrix);

    for (r = 0; r < dimensions; r++) {
        let randomX = Math.floor(Math.random() * (dimensions - 2)) + 1;
        let randomY = Math.floor(Math.random() * (dimensions - 2)) + 1;

        field.childNodes[randomX].childNodes[randomY].style.borderLeft =
            "0px solid red";

        field.childNodes[randomX].childNodes[randomY - 1].style.borderRight =
            "0px solid red";

        field.childNodes[randomX].childNodes[randomY].style.borderBottom =
            "0px solid red";
        field.childNodes[randomX + 1].childNodes[randomY].style.borderTop =
            "0px solid red";
    }
    ////

    let start = field.childNodes[0].childNodes[0];
    start.className = "start";

    // Preload the image

    window.addEventListener("keydown", (el) => {
        el.preventDefault();
        MovingLogic(el.key);
    });

    counter = 0;

    CountingMoves(counter);

    const swipeThreshold = 30;

    let startX = 0;
    let startY = 0;

    field.addEventListener("touchstart", (e) => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
    });

    field.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        if (
            Math.abs(diffX) > Math.abs(diffY) &&
            Math.abs(diffX) > swipeThreshold
        ) {
            if (diffX > 0) {
                MovingLogic("ArrowRight");
            } else {
                MovingLogic("ArrowLeft");
            }
        } else if (Math.abs(diffY) > swipeThreshold) {
            if (diffY > 0) {
                MovingLogic("ArrowDown");
            } else {
                MovingLogic("ArrowUp");
            }
        }
    });
}
function MovingLogic(key) {
    switch (key) {
        case "ArrowUp":
            if (
                pos1 > 0 &&
                parseInt(
                    field.childNodes[pos1 - 1].childNodes[pos2].style
                        .borderBottom[0]
                ) == 0
            ) {
                pos1--;
                counter++;
                CountingMoves(counter);

                MoveMe(pos1, pos2);
            } else {
            }
            break;
        case "ArrowDown":
            if (
                pos1 < dimensions - 1 &&
                field.childNodes[pos1 + 1].childNodes[pos2].style
                    .borderTop[0] == 0
            ) {
                pos1++;
                counter++;
                MoveMe(pos1, pos2);
                CountingMoves(counter);
            } else {
            }
            break;
        case "ArrowLeft":
            if (
                pos2 > 0 &&
                field.childNodes[pos1].childNodes[pos2 - 1].style
                    .borderRight[0] == 0
            ) {
                pos2--;
                counter++;
                MoveMe(pos1, pos2);
                CountingMoves(counter);
            } else {
            }
            // Handle arrow left key press
            break;
        case "ArrowRight":
            if (
                pos2 < dimensions - 1 &&
                field.childNodes[pos1].childNodes[pos2 + 1].style
                    .borderLeft[0] == 0
            ) {
                pos2++;
                counter++;
                MoveMe(pos1, pos2);
                CountingMoves(counter);
            } else {
            }
            // Handle arrow right key press
            break;
        default:
            // Handle other key presses
            break;
    }
    if (pos1 == endPos[0] && pos2 == endPos[1]) {
        let clkEnd = document.querySelector(".clockEnd");
        clkEnd.innerHTML = `${ticking}`;
        clearInterval(tickingInterval);
        gameFinsished.style.display = "flex";
        nmOfMoves.innerHTML = `${counter}`;
    }
}

let dif = document.querySelector(".difficulty");
let startScreen = document.querySelector(".box");

let arrDif = Array.from(dif.childNodes);
arrDif.map((el) => {
    el.addEventListener("click", () => {
        startScreen.style.display = "none";
        if (el.value == "Hard") {
            dim = 35;
            StartGame(dim);
        } else if (el.value == "Normal") {
            dim = 25;

            StartGame(dim);
        } else if (el.value == "Easy") {
            dim = 15;
            StartGame(dim);
        }
    });
});

callBot = document.querySelector(".box-ai");
callBot.addEventListener("click", () => {
    let h1Counted = document.querySelector(".counted");
    h1Counted.innerHTML = findShortestPath(pos1, pos2, dim);
});
//find Shortest Path
//
//
function findShortestPath(x, y, dimensions, color = 0) {
    let visited = [];
    for (let i = 0; i < dimensions; i++) {
        visited[i] = [];
        for (let j = 0; j < dimensions; j++) {
            visited[i][j] = false;
        }
    }

    let queue = [];
    queue.push({ x, y, path: [] });
    visited[x][y] = true;

    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    while (queue.length > 0) {
        const { x, y, path } = queue.shift();

        if (x === endPos[0] && y === endPos[1]) {
            path.forEach(({ x, y }) => {
                if (field.childNodes[x].childNodes[y].className == "start") {
                } else {
                    if (color == 0) {
                        field.childNodes[x].childNodes[y].className =
                            "footPrints";
                    } else {
                        field.childNodes[x].childNodes[y].className =
                            "footPrintsAi";
                    }
                }
            });
            return path.length;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (
                newX >= 0 &&
                newY >= 0 &&
                newX < dimensions &&
                newY < dimensions &&
                !visited[newX][newY]
            ) {
                if (
                    y < newY &&
                    !parseInt(
                        field.childNodes[newX].childNodes[newY].style
                            .borderLeft[0]
                    )
                ) {
                    visited[newX][newY] = true;
                    queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
                } else if (
                    x < newX &&
                    !parseInt(
                        field.childNodes[newX].childNodes[newY].style
                            .borderTop[0]
                    )
                ) {
                    visited[newX][newY] = true;
                    queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
                } else if (
                    y > newY &&
                    !parseInt(
                        field.childNodes[newX].childNodes[newY].style
                            .borderRight[0]
                    )
                ) {
                    visited[newX][newY] = true;
                    queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
                } else if (
                    x > newX &&
                    !parseInt(
                        field.childNodes[newX].childNodes[newY].style
                            .borderBottom[0]
                    )
                ) {
                    visited[newX][newY] = true;
                    queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
                }
            }
        }
    }
}
