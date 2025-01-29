let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let numChoice = Math.floor(Math.random() * 3);
    switch (numChoice) {
        case 0:
            return "rock";
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors";
            break;
    }
}

function getHumanChoice() {
    let choice = prompt("rock, paper, or scissors?", "");
    if (choice === null) {
        return;
    }

    while (choice != "rock" && choice != "paper" && choice != "scissors") {
        choice = prompt("rock, paper, or scissors?", "");
    }
    return choice;
}

function playRound(humanChoice, computerChoice) {
    /* get the choices of the human and the computer
    Based on the rule deciding which choice is superior, increase the score of the player
    Print a congratulatory message
    */
    if (!humanChoice) {
        return;
    }
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
    } else if (humanChoice === "rock" && computerChoice === "paper") {
        humanScore -= 1;
        computerScore += 1;
        console.log("You lose! Paper beats Rock");
    } else if (humanChoice === "rock" && computerChoice === "scissors") {
        humanScore += 1;
        computerScore -= 1;
        console.log("You win! Rock beats Scissors");
    } else if (humanChoice === "paper" && computerChoice === "rock") {
        humanScore += 1;
        computerScore -= 1;
        console.log("You win! Paper beats Rock");
    } else if (humanChoice === "paper" && computerChoice === "scissors") {
        humanScore -= 1;
        computerScore += 1;
        console.log("You lose! Scissors beat Paper");
    } else if (humanChoice === "scissors" && computerChoice === "rock") {
        humanScore -= 1;
        computerScore += 1;
        console.log("You lose! Rock beats Scissors");
    } else if (humanChoice === "scissors" && computerChoice === "paper") {
        humanScore += 1;
        computerScore -= 1;
        console.log("You win! Scissors beat paper");
    }
}