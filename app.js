let field = document.querySelector(".field");

const matrix = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => Array.from({ length: 4 }, () => 1))
);
//logic

//logic

let dimensions = 11;
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
    if (i != 0) {
      dot.style.borderTop = `solid black ${this.top}px `;
    }

    j != 0 ? (dot.style.borderLeft = `solid black ${this.left}px `) : "";

    if (j != 10 - 1) {
      dot.style.borderRight = `solid black ${this.right}px `;
    }
    if (i != 10 - 1) {
      dot.style.borderBottom = `solid black ${this.bottom}px `;
    }

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

let randomX = Math.floor(Math.random() * 10);
let randomY = Math.floor(Math.random() * 10);
let end = (field.childNodes[randomX].childNodes[randomY].className = "end");

//
//Start

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
  let k = 100;

  //generateMAze
  let backtrack=[];
  function generateMaze(x, y) {
    let help = 0;
    if (komsiluk <= 1) {
      console.log("kraj!!!!!");
      return;
    }
    k--;

    console.log(komsiluk, k);
    

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
        backtrack.push([newX,newY]);

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
    if (help == 0 && komsiluk > 1 && backtrack.length > 0) {
      const [prevX, prevY] = backtrack.pop();
      setTimeout(() => {
        generateMaze(prevX, prevY);
      }, 10);
    }
  }

  generateMaze(x, y);
}

createMaze(0, 0);

////
let start = field.childNodes[0].childNodes[0];
start.className = "start";

let pos1 = 5;
let pos2 = 5;

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (pos1 > 0) {
        pos1--;
        MoveMe(pos1, pos2);
      } else {
        this.alert("NEEEEEEEEEE!");
      }
      break;
    case "ArrowDown":
      if (pos1 < 9) {
        pos1++;
        MoveMe(pos1, pos2);
      } else {
        this.alert("NEEEEEEEEEE!");
      }
      console.log("down");
      break;
    case "ArrowLeft":
      if (pos2 > 0) {
        pos2--;
        MoveMe(pos1, pos2);
      } else {
        this.alert("NEEEEEEEEEE!");
      }
      // Handle arrow left key press
      break;
    case "ArrowRight":
      if (pos2 < 9) {
        ``;
        pos2++;
        MoveMe(pos1, pos2);
      } else {
        this.alert("NEEEEEEEEEE!");
      }
      // Handle arrow right key press
      break;
    default:
      // Handle other key presses
      break;
  }
});

function MoveMe(pos1, pos2) {
  field.querySelector(".start").classList.add("dot")
  field.querySelector(".start").classList.remove("start");

  field.childNodes[pos1].childNodes[pos2].className = "start";
}
// Exit
