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
    dot.innerText = `${j}`;

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

duzina = field.childNodes.length;
for (l = 0; l < 10; l++) {
  for (i = 0; i < 10; i++) {
    if (
      l + 1 < 10 &&
      parseInt(field.childNodes[l].childNodes[i].style.borderBottom[0]) &&
      parseInt(field.childNodes[l + 1].childNodes[i].style.borderTop[0])
    ) {
      console.log(l, i);
      field.childNodes[l].childNodes[i].style.borderBottom = "0px solid black";
    }
    if (
      i + 1 < 10 &&
      parseInt(field.childNodes[l].childNodes[i].style.borderRight[0]) &&
      parseInt(field.childNodes[l].childNodes[i + 1].style.borderLeft[0])
    ) {
      field.childNodes[l].childNodes[i].style.borderRight = "0px solid black";
    }
  }
}

function createMaze(x, y) {
  let visited = [];
  for (let i = 0; i < 10; i++) {
    visited[i] = [];
    for (let j = 0; j < 10; j++) {
      visited[i][j] = 0;
    }
  }

  visited[x][y] = 1;
  // proveriti da li su komsije izabranog pocetnog polja posecene,
  //   napraviit da svaki put biramo random komsiju koji ako nije posecen ,
  //    brisemo zid izmedju njega i naseg polja ,ako su jedan pored drugog brisemo levi ili desni zid ,
  //    ako su jedan ispod drugog brisemo gornji ili donji stub
  directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  function generateMaze(x, y) {}
}
