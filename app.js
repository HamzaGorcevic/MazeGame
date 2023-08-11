let field = document.querySelector(".field");

const matrix = [
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
];

//logic

//logic

for (let i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
    for (k = 0; k < 4; k++) {}
  }
}

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
    dot.style.borderTop = `solid black ${this.top}px `;
    dot.style.borderLeft = `solid black ${this.left}px `;
    dot.style.borderRight = `solid black ${this.right}px `;
    dot.style.borderBottom = `solid black ${this.bottom}px `;

    return dot;
  }
}

for (i = 0; i < 10; i++) {
  let kolona = document.createElement("div");
  kolona.style.height = "50px";
  for (j = 0; j < 10; j++) {
    let kvadrat = new Square(...matrix[i][j]);
    kolona.append(kvadrat.create(i, j));
  }
  field.append(kolona);
}

// Exit

let randomX = Math.floor(Math.random() * 10);
let randomY = Math.floor(Math.random() * 10);
field.childNodes[randomX].childNodes[randomY].style.background = "red";

//
//Start

field.childNodes[0].childNodes[0].style.background = "yellow";
duzina = field.childNodes.length;
//
function createMaze(x, y) {
  let visited = [];
  for (let i = 0; i < 10; i++) {
    visited[i] = [];
    for (let j = 0; j < 10; j++) {
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
  let komsiluk = 100;
  function generateMaze(x, y) {
    let help = 0;
    if (komsiluk <= 1) {
      console.log("kraj!!!!!");
      return;
    }

    console.log(komsiluk);
    for (let s = 0; s < 4; s++) {
      const [move1, move2] =
        directions[Math.floor(Math.random() * directions.length)];
      const newX = x + move1;
      const newY = y + move2;
      if (
        newY < 10 &&
        newX < 10 &&
        newX >= 0 &&
        newY >= 0 &&
        !visited[newX][newY]
      ) {
        help++;
        komsiluk--;

        visited[newX][newY] = 1;
        if (y < newY) {
          field.childNodes[newX].childNodes[newY].style.borderLeft =
            "0px solid red";
          field.childNodes[newX].childNodes[y].style.borderRight =
            "0px solid red";
        } else if (x < newX) {
          field.childNodes[x].childNodes[newY].style.borderBottom =
            "0px solid blue";
          field.childNodes[newX].childNodes[newY].style.borderTop =
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
        }, 10);
      }
    }
    if (help == 0 && komsiluk > 1) {
      setTimeout(() => {
        generateMaze(x, y);
      }, 10);
    }
  }

  generateMaze(x, y);
}

createMaze(0, 0);
