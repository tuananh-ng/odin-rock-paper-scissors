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

function findSuperiorChoice(firstChoice, secondChoice) {
    const presetChoices = [["rock", -1], ["paper", 0], ["scissors", 1]]; // the format is: [name-of-choice, its-value]
    const availableChoices = [[firstChoice.toLowerCase(), null], [secondChoice.toLowerCase(), null]];
    for (const presetChoice of presetChoices) {
        for (const availableChoice of availableChoices) {// if the args are matched, fill up their values
            if (presetChoice[0] === availableChoice[0]) {
                availableChoice[1] = presetChoice[1];
            }
        }
    }

    if (availableChoices[0][1] === null || !availableChoices[1][1] === null) {
        return; // one or both of the choices are not valid
    }
    
    if (availableChoices[0][1] === 0 || availableChoices[1][1] === 0) {
        return (availableChoices[0][1] > availableChoices[1][1]) ? availableChoices[0][0] : availableChoices[1][0];
    }
    if ((- availableChoices[0][1]) < (- availableChoices[1][1])) {// switch their signs so that
        return availableChoices[1][0]; //  whichever beats the middle will be beaten up by the bottom
    } else { // so choose the assigned value to the preset choices are important
        return availableChoices[0][0]; // to respect the rules
    }
}

function playGame() {
    let humanScore = 0, computerScore = 0, numRound = 5;
    let humanSelection, computerSelection;

    for (let i = 0; i < numRound; i++) {
        console.log(`Round ${i + 1}:`);
        computerSelection = getComputerChoice();
        humanSelection = getHumanChoice();
        console.log(`Computer: ${computerSelection}\nYou: ${humanSelection}`);

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