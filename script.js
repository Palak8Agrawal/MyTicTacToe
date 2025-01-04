console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && boxtext[e[0]].innerText !== "") {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
}

// Function to check if a player can win or block
const checkWinOrBlock = (player) => {
    let boxtext = document.getElementsByClassName('boxtext');
    let winOrBlockMove = null;
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    wins.forEach(e => {
        let line = [boxtext[e[0]].innerText, boxtext[e[1]].innerText, boxtext[e[2]].innerText];
        if (line.filter(cell => cell === player).length === 2 && line.filter(cell => cell === "").length === 1) {
            let index = line.indexOf("");
            winOrBlockMove = e[index];
        }
    });
    return winOrBlockMove;
}

// Function for the computer's move (with strategy)
const computerMove = () => {
    if (!isgameover && turn === "O") {
        let boxtext = document.getElementsByClassName("boxtext");

        // Check if the computer can win
        let move = checkWinOrBlock("O");
        if (move !== null) {
            boxtext[move].innerText = "O";
            console.log("Computer played to win");
            audioTurn.play();
        }
        // If the computer can't win, check if it needs to block the player
        else {
            move = checkWinOrBlock("X");
            if (move !== null) {
                boxtext[move].innerText = "O";
                console.log("Computer blocked player's win");
                audioTurn.play();
            }
            // If no winning or blocking move, make a random move
            else {
                let emptyBoxes = Array.from(boxtext).filter((box) => box.innerText === "");
                if (emptyBoxes.length > 0) {
                    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                    randomBox.innerText = "O"; // Computer places "O"
                    console.log("Computer played randomly");
                    audioTurn.play();
                }
            }
        }

        // After the computer plays, check if it wins
        checkWin();
        if (!isgameover) {
            turn = changeTurn();
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    }
};

// Check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let filledBoxes = Array.from(boxtext).filter(box => box.innerText !== "");
    if (filledBoxes.length === 9 && !isgameover) {
        document.querySelector('.info').innerText = "It's a Draw!";
        isgameover = true;
    }
}

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (!isgameover && turn === "X" && boxtext.innerText === '') {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            checkDraw(); // Check if the game is a draw
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                setTimeout(computerMove, 500); // Add delay for computer's move
            }
        }
    })
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0"
});
