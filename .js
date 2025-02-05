const gamingSect = document.querySelector("#gaming");
const start = document.querySelector("#start");
start.addEventListener("click", () => {
    start.textContent = "Restart the game";
});
start.addEventListener("click", playGame);

function playGame() {
    let humanScore = 0, computerScore = 0, numRounds = 1;
    let humanSelection, computerSelection;

    for (let i = 0; i < numRounds; i++) {
        console.log(`Round ${i + 1}:`);
        computerSelection = getComputerChoice();
        humanSelection = getHumanChoice();
        console.log(`You: ${humanSelection}\nComputer: ${computerSelection}`);

        playRound(humanSelection, computerSelection);
    }

    console.log(`Overall: you[${humanScore}] vs computer[${computerScore}]`);
    if (humanScore > computerScore) {
        console.log("You win!");
    } else if (computerScore > humanScore) {
        console.log("You lose!");
    } else {
        console.log("Everybody wins!");
    }

    function playRound(humanChoice, computerChoice) {
        if (!humanChoice) {
            computerScore += 1;
            return console.log("You missed your turn!");
        }
        humanChoice = humanChoice.toLowerCase();
        computerChoice = computerChoice.toLowerCase();
    
        if (humanChoice === computerChoice) {
            return console.log("It's a tie!");
        }

        let superiorChoice = findSuperiorChoice(humanChoice, computerChoice);
        if (humanChoice === superiorChoice) {
            humanScore += 1;
            console.log(`You win (score: ${humanScore}): ${humanChoice} beats ${computerChoice}`);
        } else if (computerChoice === superiorChoice) {
            computerScore += 1;
            console.log(`You lose (score: ${humanScore}): ${computerChoice} beats ${humanChoice}`);
        }
    }
}

function getComputerChoice() {
    let choiceNumber = Math.floor(Math.random() * 3);
    const choices = ["rock", "paper", "scissors"];

    return choices[choiceNumber];
}

function getHumanChoice() {
    let choice = prompt("rock, paper, or scissors?");
    if (!choice) { return; }

    while (choice != "rock" && choice != "paper" && choice != "scissors") {
        choice = prompt("rock, paper, or scissors?", "");
    }
    return choice;
}

function findSuperiorChoice(firstChoice, secondChoice) {
    const presetChoices = [["rock", -1], ["paper", 0], ["scissors", 1]]; // the format is: [name-of-choice, its-value]
    const inspectedChoices = [[firstChoice.toLowerCase(), null], [secondChoice.toLowerCase(), null]];
    for (const presetChoice of presetChoices) {
        for (const inspectedChoice of inspectedChoices) {// if the args are matched, fill up their values
            if (inspectedChoice[0] === presetChoice[0]) {
                inspectedChoice[1] = presetChoice[1];
            }
        }
    }
    if (inspectedChoices[0][1] === null || inspectedChoices[1][1] === null) { return; } // one or both of the choices are not valid
    
    if (inspectedChoices[0][1] === 0 || inspectedChoices[1][1] === 0) {
        return (inspectedChoices[0][1] > inspectedChoices[1][1]) ? inspectedChoices[0][0] : inspectedChoices[1][0];
    }
    if ((- inspectedChoices[0][1]) < (- inspectedChoices[1][1])) {// switch their signs so that
        return inspectedChoices[1][0]; //  whichever beats the middle will be beaten up by the bottom
    } else { // so choosing the assigned values to the preset choices is important
        return inspectedChoices[0][0]; // to respect the rules
    }
}