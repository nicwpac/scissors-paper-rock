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

function getHumanChoice() {
    let choice = prompt("Please choose either \"Scissors\", \"Paper\", or \"Rock\".")
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice, roundNumber) {
    humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
        alert(`Round ${roundNumber + 1}:\nYou chose: ${humanChoice}, Computer chose: ${computerChoice}\nIt's a tie!\nYour Score: ${humanScore}, Computer's Score: ${computerScore}`);
        return;
    }

    let won = false;

    if (humanChoice === "Scissors") {
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

    if (won) humanScore++;
    else computerScore++;

    alert(`Round ${roundNumber + 1}:\nYou chose: ${humanChoice}, Computer chose: ${computerChoice}\n You ${won ? "win!" : "lose..."} ${won ? humanChoice : computerChoice} beats ${won ? computerChoice : humanChoice}!\nYour Score: ${humanScore}, Computer's Score: ${computerScore}`);
}

const roundAmount = 5;

function playGame() {
    for (i = 0; i < roundAmount; i++) {
        playRound(getHumanChoice(), getComputerChoice(), i);
    }
    if (humanScore == computerScore)
        alert(`Wow! It's a tie! \nYour Score: ${humanScore}, Computer's Score: ${computerScore}`);
    else if (humanScore > computerScore) {
        alert(`Congratulations! You win! \nYour Score: ${humanScore}, Computer's Score: ${computerScore}`);
    }
    else {
        alert(`Bummer! You lost... \nYour Score: ${humanScore}, Computer's Score: ${computerScore}`)
    }
}

alert("Starting game...");
playGame();