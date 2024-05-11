let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newButton = document.querySelector("#newGame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const WinPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw`;
  msgcontainer.classList.remove("hide");
  newButton.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
  newButton.classList.add("hide");
};

const showWinner = (winner) => {
  msg.innerText = `Congractulations, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  newButton.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of WinPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        showWinner(pos1Value);
        return true; // Exit loop after finding a winner
      }
    }
  }
};

newButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
