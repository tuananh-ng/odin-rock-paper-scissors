const gamingSect = document.querySelector("#gaming");
const start = document.querySelector("#start");

start.addEventListener("click", () => {
    start.textContent = "Restart the game";

    const scoreText = document.querySelector(".scores");
    const announcement = document.querySelector(".announcement");
    if (!scoreText) {
        const scoreSect = document.createElement("span");
        scoreSect.classList.toggle("scores");
        scoreSect.textContent = "You: 0 | Computer: 0";

        gamingSect.appendChild(scoreSect);
    } else {
        scoreText.textContent = "You: 0 | Computer: 0";
    }

    if (announcement) {
        gamingSect.removeChild(announcement);
    }
});
start.addEventListener("click", initTheChoiceSection);
start.addEventListener("click", playGame);

function playGame() {
    let humanScore = 0, computerScore = 0;
    let humanSelection, computerSelection;
    const choiceButtons = document.querySelectorAll(".choiceBtn");
    
    choiceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (humanScore === 5 || computerScore === 5) {
                const finalMessage = document.querySelector(".announcement");
                if (finalMessage) {
                    finalMessage.textContent = `Overall: you[${humanScore}] vs computer[${computerScore}]. `;
                }

                console.log(`Overall: you[${humanScore}] vs computer[${computerScore}]`);
                if (humanScore > computerScore) {
                    finalMessage.textContent = finalMessage.textContent.concat("You win!");
                    console.log("You win!");
                } else if (computerScore > humanScore) {
                    finalMessage.textContent = finalMessage.textContent.concat("You lose!");
                    console.log("You lose!");
                } else {
                    finalMessage.textContent = finalMessage.textContent.concat("Everybody wins!");
                    console.log("Everybody wins!");
                }
                return;
            }

            computerSelection = getComputerChoice();
            humanSelection = button.textContent;
            console.log(`You: ${humanSelection}\nComputer: ${computerSelection}`);

            playRound(humanSelection, computerSelection);
            updateDisplayingScores();
        });
    });

    function playRound(humanChoice, computerChoice) {
        if (!humanChoice) {
            computerScore += 1;
            return console.log("You missed your turn!");
        }
        humanChoice = humanChoice.toLowerCase();
        computerChoice = computerChoice.toLowerCase();
    
        if (!(document.querySelector(".announcement"))) {
            const announcement = document.createElement("p");
            announcement.classList.toggle("announcement");
            gamingSect.appendChild(announcement);
        }

        if (humanChoice === computerChoice) {
            document.querySelector(".announcement").textContent = "It's a tie!";
            return console.log("It's a tie!");
        }

        let superiorChoice = findSuperiorChoice(humanChoice, computerChoice);
        if (humanChoice === superiorChoice) {
            humanScore += 1;

            document.querySelector(".announcement").textContent = `You win: ${humanChoice} beats ${computerChoice}`;
            console.log(`You win (score: ${humanScore}): ${humanChoice} beats ${computerChoice}`);
        } else if (computerChoice === superiorChoice) {
            computerScore += 1;

            document.querySelector(".announcement").textContent = `You lose: ${computerChoice} beats ${humanChoice}`;
            console.log(`You lose (score: ${humanScore}): ${computerChoice} beats ${humanChoice}`);
        }
    }

    function updateDisplayingScores() {
        const scoreText = document.querySelector(".scores");
        if (!scoreText) {
            return;
        }

        scoreText.textContent = `You: ${humanScore} | Computer: ${computerScore}`;
    }
}

function initTheChoiceSection() {
    if (document.querySelector(".choices")) {
        return;
    }
    const choiceSect = document.createElement("div");
    choiceSect.classList.toggle("choices");
    document.querySelector("#gaming").appendChild(choiceSect);

    const choices = [];
    const numChoices = 3;
    for (let i = 0; i < numChoices; i++) {
        choices[i] = document.createElement("button");
        choices[i].classList.toggle("choiceBtn");
        choiceSect.appendChild(choices[i]);
    }

    choices[0].textContent = "rock";
    choices[1].textContent = "paper";
    choices[2].textContent = "scissors";
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