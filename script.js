const boxes = document.querySelectorAll(".boxes");
const newGame = document.querySelector(".new-game");
const rstGame = document.querySelector(".rst-btn");
const winMsg = document.getElementById('win-msg');
let game = true; // player O and player X

const winnerPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const draw = () => {
    let isDraw = true;
    for (let box of boxes) {
        if (!box.dataset.value) {
            isDraw = false;
            break;
        }
    }
    return isDraw;
};
boxes.forEach((box) => {
    box.addEventListener("click", function (e) {
        if (game && !box.dataset.value) {
            box.innerHTML = `<img width="40px" src="./assets/letter-o.png">`;
            box.dataset.value = "O";
            game = false;
        } else if (!game && !box.dataset.value) {
            box.innerHTML = `<img width="30px" src="./assets/close.png">`;
            box.dataset.value = "X";
            game = true;
        }
        box.disabled = true;
        checkWinner();
        if (draw()) {
            winMsg.style.display = "block";
            winMsg.innerHTML = "It's a draw!😔";
            game = false;
        }
    });
});

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
        box.dataset.value = "";
    });
    game = true;
    winMsg.style.display = "none";
};

const checkWinner = () => {
    for (let patterns of winnerPatterns) {
        let posVal1 = boxes[patterns[0]].dataset.value;
        let posVal2 = boxes[patterns[1]].dataset.value;
        let posVal3 = boxes[patterns[2]].dataset.value;

        if (posVal1 && posVal2 && posVal3) {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                winMsg.style.display = "block";
                winMsg.innerHTML = `Congratulations!...<br>🎊Player ${posVal1} Wins🎉`;
                game = false;
                boxes.forEach((box) => {
                    box.disabled = true;
                })
            } 
        }
    }
};
rstGame.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);