let player1_option_X = document.querySelector(".chose1-X");
let player1_option_Y = document.querySelector(".chose1-Y");
let player2_option_X = document.querySelector(".chose2-X");
let player2_option_Y = document.querySelector(".chose2-Y");

let startGameBtn = document.querySelector("#start-game-btn");
let resetGameBtn = document.querySelector("#reset-game-btn");
let newGameBtn = document.querySelector("#new-game-btn");

let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#message");
let win_msg = document.querySelector(".win-msg");

let game = document.querySelector(".game");
let clicked = false;    //Before starting the game, slect X or O
let count = 0; //To determine if it is a tie or not.

let player1_turn = true;
let player2_turn;
let player1, player2;

winning_pattern = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 

    [0, 4, 8],
    [2, 4, 6]
];

player1_option_X.addEventListener("click", ()=>{
    player1_option_X.style.backgroundColor="#1ec946";
    player2_option_Y.style.backgroundColor="#1ec946";

    player1_option_Y.style.backgroundColor="white";
    player2_option_X.style.backgroundColor="white";

    player1 = "X";
    player2 = "O";

    clicked=true;
    msg.innerText = "Click on 'Start Game' Button";
});

player1_option_Y.addEventListener("click", ()=>{
    player1_option_Y.style.backgroundColor="#1ec946";
    player2_option_X.style.backgroundColor="#1ec946";

    player1_option_X.style.backgroundColor="white";
    player2_option_Y.style.backgroundColor="white";

    player1 = "O";
    player2 = "X";

    clicked = true;
    msg.innerText = "Click on 'Start Game' Button";
})

startGameBtn.addEventListener("click", ()=> {
    if(clicked) {
        msg.classList.add("hide");
        game.classList.remove("hide");

        player1_option_X.disabled = true;
        player1_option_Y.disabled = true;
        player2_option_X.disabled = true;
        player2_option_Y.disabled = true;

        // player1_option_Y.style.color="red";
        // player2_option_X.style.color="red";
        // player1_option_X.style.color="red";
        // player2_option_Y.style.color="red";
    }

    else {
        alert("Select 'X' or 'O'");
    }
});

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{

        if(player1_turn) {
            box.innerText = player1;
            player1_turn = false;
            player2_turn = true;
        }

        else {
            box.innerText = player2;
            player1_turn = true;
            player2_turn = false;
        }
        
        count += 1;
        disableBoxes(box);
        checkWinner();
        if(count==9) {
            console.log("Draw");
            disableBoxes(box);
        }
    });
});

let checkWinner = ()=>{
    for(let pattern of winning_pattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val == pos2Val && pos2Val == pos3Val) {
                
                console.log(`Winner is ${pos1Val}`);
                win_msg.innerText = `Winner : ${pos1Val}`;
                win_msg.classList.remove("hide");
                
                for(let box of boxes) {
                    disableBoxes(box);
                }
            }
        }
        
    }
}

resetGameBtn.addEventListener("click", ()=>{
    resetGame();
    console.log("Game reset....");
})

newGameBtn.addEventListener("click", ()=>{
    newGame();
    console.log("New Game....");
})

let disableBoxes = (box)=>{
    box.disabled=true;
    box.style.color="black";
    box.style.backgroundColor = "white";
}

let resetGame = ()=>{
    win_msg.classList.add("hide");
    player1_turn=true;
    player2_turn=false;
    for(let box of boxes) {
        box.innerText = "";
        box.disabled=false;
        box.style.backgroundColor="white";
    }
}

let newGame = ()=>{
    resetGame();
    msg.innerText = "Select X or O";
    player1_option_X.style.backgroundColor="white";
    player1_option_Y.style.backgroundColor="white";
    player2_option_X.style.backgroundColor="white";
    player2_option_Y.style.backgroundColor="white";
    
    player1_option_X.disabled = false;    
    player1_option_Y.disabled = false;
    player2_option_X.disabled = false;
    player2_option_Y.disabled = false;

    player1_option_X.style.color="black";
    player1_option_Y.style.color="black";
    player2_option_X.style.color="black";
    player2_option_Y.style.color="black";

    game.classList.add("hide");
    msg.classList.remove("hide");

    clicked=false;
}