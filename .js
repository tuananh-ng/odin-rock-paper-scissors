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
    let choice = prompt("rock, paper, or scissors?");
    if (!choice) {
        return;
    }

    while (choice != "rock" && choice != "paper" && choice != "scissors") {
        choice = prompt("rock, paper, or scissors?", "");
    }
    return choice;
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let humanSelection, computerSelection;
    let numRound = 5;

    for (let i = 0; i < numRound; i++) {
        console.log(`Round ${i + 1}:`);
        computerSelection = getComputerChoice();
        humanSelection = getHumanChoice();
        console.log(`Computer: ${computerSelection}\nYou: ${humanSelection}`);

        playRound(humanSelection, computerSelection);
    }

    console.log("Overall:");
    if (humanScore > computerScore) {
        console.log("You win!");
    } else if (computerScore > humanScore) {
        console.log("You lose!");
    } else {
        console.log("It's a tie!");
    }

    function playRound(humanChoice, computerChoice) {
        if (!humanChoice) {
            computerScore += 1;
            console.log("You missed your turn!");
            return;
        }
        humanChoice = humanChoice.toLowerCase();
        computerChoice = computerChoice.toLowerCase();
    
        if (humanChoice === computerChoice) {
            console.log("It's a tie!");
        } else if (humanChoice === "rock" && computerChoice === "paper") {
            computerScore += 1;
            console.log("You lose! Paper beats Rock");
        } else if (humanChoice === "rock" && computerChoice === "scissors") {
            humanScore += 1;
            console.log("You win! Rock beats Scissors");
        } else if (humanChoice === "paper" && computerChoice === "rock") {
            humanScore += 1;
            console.log("You win! Paper beats Rock");
        } else if (humanChoice === "paper" && computerChoice === "scissors") {
            computerScore += 1;
            console.log("You lose! Scissors beat Paper");
        } else if (humanChoice === "scissors" && computerChoice === "rock") {
            computerScore += 1;
            console.log("You lose! Rock beats Scissors");
        } else if (humanChoice === "scissors" && computerChoice === "paper") {
            humanScore += 1;
            console.log("You win! Scissors beat paper");
        }
    }
}