let field = document.querySelector(".field");

let endPos = [];
function StartGame(len) {
  let dimensions = len;

  const matrix = Array.from({ length: dimensions }, () =>
    Array.from({ length: dimensions }, () => Array.from({ length: 4 }, () => 1))
  );
  //logic

  //logic

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

  function createMaze(x, y) {
    for (i = 0; i < dimensions; i++) {
      let kolona = document.createElement("div");
      kolona.style.height = "30px";
      field.style.width = `${dimensions * 30}px`;

      for (j = 0; j < dimensions; j++) {
        let kvadrat = new Square(...matrix[i][j]);
        kolona.append(kvadrat.create(i, j));
      }
      field.append(kolona);
    }

    do {
      randomX = Math.floor(Math.random() * dimensions);
      randomY = Math.floor(Math.random() * dimensions);
    } while (randomX === x && randomY === y);

    field.childNodes[randomX].childNodes[randomY].classList.add("end");
    endPos.push(randomX);
    endPos.push(randomY);
    console.log(endPos, "endPos");
    //
    //Start

    duzina = field.childNodes.length;
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
    let komsiluk = dimensions * dimensions;
    let k = dimensions * dimensions;

    //generateMAze
    let backtrack = [];
    function generateMaze(x, y) {
      let help = 0;
      if (komsiluk <= 0) {
        return;
      }
      k--;

      for (let s = 0; s < 4; s++) {
        const [move1, move2] =
          directions[Math.floor(Math.random() * directions.length)];
        const newX = x + move1;
        const newY = y + move2;
        if (
          newY < dimensions &&
          newX < dimensions &&
          newX >= 0 &&
          newY >= 0 &&
          !visited[newX][newY]
        ) {
          help++;
          komsiluk--;

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
            generateMaze(newX, newY);
          }, 20);
        }
      }
      if (help == 0 && komsiluk > 0 && backtrack.length > 0) {
        const [prevX, prevY] = backtrack.pop();
        setTimeout(() => {
          let randomX = Math.floor(Math.random() * dimensions);
          let randomY = Math.floor(Math.random() * dimensions);

          generateMaze(prevX, prevY);
        }, 20);
      }
    }

    generateMaze(x, y);
  }

  createMaze(7, 7);

  ////
  let start = field.childNodes[0].childNodes[0];
  start.className = "start";

  // Preload the image

  let pos1 = 0;
  let pos2 = 0;

  window.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        if (
          pos1 > 0 &&
          parseInt(
            field.childNodes[pos1 - 1].childNodes[pos2].style.borderBottom[0]
          ) == 0
        ) {
          pos1--;

          MoveMe(pos1, pos2);
        } else {
          console.log("asd");
        }
        break;
      case "ArrowDown":
        if (
          pos1 < dimensions - 1 &&
          field.childNodes[pos1 + 1].childNodes[pos2].style.borderTop[0] == 0
        ) {
          pos1++;
          MoveMe(pos1, pos2);
        } else {
        }
        break;
      case "ArrowLeft":
        if (
          pos2 > 0 &&
          field.childNodes[pos1].childNodes[pos2 - 1].style.borderRight[0] == 0
        ) {
          pos2--;
          MoveMe(pos1, pos2);
        } else {
          console.log("asd");
        }
        // Handle arrow left key press
        break;
      case "ArrowRight":
        if (
          pos2 < dimensions - 1 &&
          field.childNodes[pos1].childNodes[pos2 + 1].style.borderLeft[0] == 0
        ) {
          ``;
          pos2++;
          MoveMe(pos1, pos2);
        } else {
          console.log("asd");
        }
        // Handle arrow right key press
        break;
      default:
        // Handle other key presses
        break;
    }
  });

  function MoveMe(pos1, pos2) {
    field.querySelector(".start").classList.add("dot");
    field.querySelector(".start").classList.remove("start");

    field.childNodes[pos1].childNodes[pos2].className = "start";
  }
}
// Exit

function clearField() {
  endPos = [];
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
}

let selectDif = document.querySelector(".dif");
let dim = 20;
StartGame(dim);

selectDif.addEventListener("change", (el) => {
  switch (el.target.value) {
    case "Normal":
      dim = 15;
      clearField();
      StartGame(dim);

      break;
    case "Hard":
      dim = 20;
      clearField();
      location.reload();

      StartGame(dim);

      break;
    case "Easy":
      dim = 10;
      clearField();
      StartGame(dim);
      break;
  }
});
let selectAlg = document.querySelector(".alg");

selectAlg.addEventListener("change", (el) => {
  switch (el.target.value) {
    case "BFS":
      findShortestPath(0, 0, dim);
      break;
  }
});

//find Shortest Path
//
//
function findShortestPath(x, y, dimensions) {
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
      console.log(endPos, "endPos");

      path.forEach(({ x, y }) => {
        field.childNodes[x].childNodes[y].style.backgroundColor = "#66FFFF";
      });
      return;
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
          !parseInt(field.childNodes[newX].childNodes[newY].style.borderLeft[0])
        ) {
          visited[newX][newY] = true;
          queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
          console.log("desilo se nes");
        } else if (
          x < newX &&
          !parseInt(field.childNodes[newX].childNodes[newY].style.borderTop[0])
        ) {
          visited[newX][newY] = true;
          queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
          console.log("desilo se nes");
        } else if (
          y > newY &&
          !parseInt(
            field.childNodes[newX].childNodes[newY].style.borderRight[0]
          )
        ) {
          visited[newX][newY] = true;
          queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
          console.log("desilo se nes");
        } else if (
          x > newX &&
          !parseInt(
            field.childNodes[newX].childNodes[newY].style.borderBottom[0]
          )
        ) {
          visited[newX][newY] = true;
          queue.push({ x: newX, y: newY, path: [...path, { x, y }] });
          console.log("desilo se nes");
        }
      }
    }
  }
}
