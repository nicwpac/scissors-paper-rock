let humanScore = 0;
let computerScore = 0;

let roundAmount = 0;
let currentRound = 0;

let playerChoice = "";
let gameActive = false;
//#region DOM
    // Choice Buttons
const btns = [];

const btnScissors = document.querySelector("#scissors-btn");
btns.push(btnScissors);
btnScissors.addEventListener("click", () => selectChoice("Scissors", btnScissors));

const btnPaper = document.querySelector("#paper-btn");
btns.push(btnPaper);
btnPaper.addEventListener("click", () => selectChoice("Paper", btnPaper));

const btnRock = document.querySelector("#rock-btn");
btns.push(btnRock);
btnRock.addEventListener("click", () => selectChoice("Rock", btnRock));

    // Score
const playerScoreCounter = document.querySelector("#score-player");
const computerScoreCounter = document.querySelector("#score-computer");

    // Rounds
const roundAmountInput = document.querySelector("#round-select-input");

const roundCounter = document.querySelector("#round-counter");

    // Other
const startGameBtn = document.querySelector("#start-game");
startGameBtn.addEventListener("click", tryStartGame);

const output = document.querySelector("#output");
//#endregion

function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return "Scissors";
        case 1:
            return "Paper";
        default:
            return "Rock";
    }
}

function playRound(humanChoice, computerChoice, roundNumber) {
    roundCounter.textContent = `Round: ${currentRound + 1} of ${roundAmount}`;
    let outputString = "";
    let won = false;
    let tie = false;
    if (humanChoice === computerChoice) {
        tie = true;
        outputString = `Round ${roundNumber + 1}:\nYou chose: ${humanChoice}, Computer chose: ${computerChoice}\nIt's a tie!`;
    }
    else if (humanChoice === "Scissors") {
        if (computerChoice === "Paper")
            won = true;
    }
    else if (humanChoice === "Rock") {
        if (computerChoice === "Scissors")
            won = true;
    }
    else if (humanChoice === "Paper") {
        if (computerChoice === "Rock")
            won = true;
    }

    if (!tie) {
        if (won && !tie) humanScore++;
        else if (!won && !tie) computerScore++;

        outputString = `Round ${roundNumber + 1}:\n` +
        `You chose: ${humanChoice}, Computer chose: ${computerChoice}\n` +
        (tie ? `It's a tie!` : (`You ${won ? "win!" : "lose..."} ${won ? humanChoice : computerChoice} ` + 
        `beats ${won ? computerChoice : humanChoice}!\n`));
    }
    
    playerScoreCounter.textContent = "Your Score: " + humanScore;
    computerScoreCounter.textContent = "Computer Score: " + computerScore;

    outputPrint(outputString);

    currentRound++;
    if (currentRound == roundAmount) endGame();
}

function outputPrint(outputString) {
    output.textContent = outputString + "\n\n" + output.textContent;
    console.log("outputPrint()'d! Output text = " + outputString);
}

function tryStartGame() {
    console.log("tryStartGame() called!");
    resetGame();
    output.textContent = "";
    roundAmount = roundAmountInput.value;
    if (roundAmount == 0 || roundAmount === null) {
        outputPrint("Please select how many rounds you would like to play.");
        return;
    }

    playerScoreCounter.textContent = "Your Score: 0";
    computerScoreCounter.textContent = "Computer's Score: 0";

    gameActive = true;
}

function endGame() {
    let gameoverText = "";
    if (humanScore == computerScore)
        gameoverText = `Wow! It's a tie! \nYour Score: ${humanScore}, Computer's Score: ${computerScore}`;
    else if (humanScore > computerScore) {
        gameoverText = `Congratulations! You win! \nYour Score: ${humanScore}, Computer's Score: ${computerScore}`;
    }
    else {
        gameoverText = `Bummer! You lost... \nYour Score: ${humanScore}, Computer's Score: ${computerScore}`;
    }

    outputPrint(gameoverText);

    resetGame();
}

function resetGame() {
    gameActive = false;
    currentRound = 0;
    roundAmount = 0;
    humanScore = 0;
    computerScore = 0;
    resetChoiceBtns();
}

function selectChoice(choice, btn) {
    console.log("selectChoice called! gameActive == " + gameActive);
    console.log("currentRound = " + currentRound + ", roundAmount = " + roundAmount);
    if (!gameActive) {
        outputPrint("Please select how many rounds you would like to play.");
        return;
    }

    resetChoiceBtns();
    btn.style.backgroundColor = "gold";
    
    playRound(choice, getComputerChoice(), currentRound);
}

function resetChoiceBtns() {
    btns.forEach(btn => {
        btn.style.backgroundColor = "";
    });
}
