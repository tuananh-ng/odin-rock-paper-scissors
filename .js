function getComputerChoice() {
    let numChoice = Math.floor(Math.random() * 3);
    switch (numChoice) {
        case 0:
            console.log("rock");
            break;
        case 1:
            console.log("paper");
            break;
        case 2:
            console.log("scissors");
            break;
    }
}

function getHumanChoice() {
    
}