//------------blackjack-------------------------
const Prompt = require('prompt-sync')();

let playerMain: number = 0;
let cpuMain: number = 0;
let cpuScore: number = 0;
let playerScore: number = 20;
let cpuGeneralScore: number = 0;
let playerGeneralScore: number = 0;
let playerWantDraw: string = "";
let playerWantContinue: string = "";
let playerChoice: string = "";
let valueWhenCpuWantStop: number = 0;
let isTheEndOfTheRound: boolean = false;
let scoreInterval: number = 0;
let algoCanHelp: boolean = true;

function randomNumber(max: number, min: number){
    let random: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}

function draw(min: number, max: number, isCpu: boolean = false) {
    let playerChoiceValue: number = 0;
    let playerAsMakeChoice: boolean = false;
    let consentment: string = "";
    let random: number = randomNumber(min, max)
    if (random === 11) {
        if (isCpu) {
            if (cpuScore + 11 <= 21) {
                random = 11;
            } else {
                random = 1;
            }
        } else {
            playerChoiceValue = Number(Prompt("vous avez fait 11 ! choisissez la valeur de votre tir entre 1 et 11"));
            if(playerChoiceValue === 11 || playerChoiceValue === 1){
                playerAsMakeChoice = true;
            }
            while (!playerAsMakeChoice) {
                playerChoiceValue = Number(Prompt("S'il vous plait, faite en choix entre 1 et 11 !"));
                if(playerChoiceValue === 11 || playerChoiceValue === 1){
                    playerAsMakeChoice = true;  
                }
            }
            if (playerScore + playerChoiceValue > 21 && playerChoiceValue != 1 && algoCanHelp) {
                console.log("Attention ! si vous faites ce choix, votre score dépasserra 21 !!!");
                playerAsMakeChoice = false; 
                while (!playerAsMakeChoice) {
                    playerChoiceValue = Number(Prompt("refaite votre choix entre 1 et 11"));
                    if(playerChoiceValue === 11 || playerChoiceValue === 1){
                        playerAsMakeChoice = true;  
                    }
                }
                consentment = Prompt("Attention, je ne vous aiderais plus à partir de maintenan ! d'accord ? (oui / non)");
                if(consentment === "oui"){
                    console.log("Merci de votre compréhension !");
                }else{
                    console.log("mal poli !")
                }
                algoCanHelp = false;
            }
            random = playerChoiceValue;
        }
    }
    return random;
}

playerChoice = Prompt("Voulez vous jouer au blackjack ? (oui / non)").toLowerCase();

while (playerChoice !== "oui") {
    playerChoice = Prompt("Répondez par oui ou par non je vous prie, voulez vous jouer au blackjack ?").toLowerCase()
}
console.log("la regle est simple, vous et l'ordinateur tirez un nombre aléatoire entre 1 et 11. \n vous pouvez tirez autant de carte que vous le voudrez. \n le gagnant sera le joueur qui fera le plus gros score sans dépasser la valeur de 21")

while (playerWantContinue != "non") {
  
    playerScore = draw(11, 11);

    valueWhenCpuWantStop = draw(16, 21, true);
    console.log("votre score est de " + playerScore);
    cpuScore = draw(1, 11, true);
    playerWantDraw = Prompt("Voulez vous tirer un nombre a nouveau ? (oui / non)").toLowerCase();;
    while (playerChoice !== "oui") {
        playerChoice = Prompt("Répondez par oui ou par non je vous prie, voulez vous tirer un nombre a nouveau ?").toLowerCase()
    }
    while (playerWantDraw != "non") {
        playerScore = playerScore + draw(1, 11);
        console.log("votre score est de " + playerScore);
        if (playerScore > 21) {
            console.log("votre score depasse 21 ! Vous avez perdu cette manche.");
            cpuGeneralScore++;
            isTheEndOfTheRound = true;
            break;
        }
        cpuScore = cpuScore + draw(1, 11, true);
        playerWantDraw = Prompt("Voulez vous tirer un nombre a nouveau ? (oui / non)");
    }
    if (playerWantDraw === "non") {
        while (cpuScore <= valueWhenCpuWantStop) {
            cpuScore = cpuScore + draw(1, 11, true);
            isTheEndOfTheRound = true;
        }
    }
    if (cpuScore > 21) {
        console.log("votre adversaire a dépassé 21 ! Vous avez gagné cette manche !")
        playerGeneralScore++;
        isTheEndOfTheRound = true;
    }
    console.log("voici votre score final : " + playerScore);
    console.log("voici le score final de votre adversaire : " + cpuScore);
    if (isTheEndOfTheRound === false) {
        if (playerScore > cpuScore) {
            playerGeneralScore++;
            console.log("Vous avez gagné cette manche !")
        } else if (cpuScore > playerScore) {
            console.log("blaaaaaaaaaaa")
            cpuGeneralScore++;
            console.log("Votre adversaire à gagné cette manche !")
        }
    }
    if (playerScore === cpuScore) {
        console.log("Vous etes à égalité sur cette manche !")
    }
    console.log("vous avez gagné " + playerGeneralScore + " manches.")
    console.log("votre adversaire a gagné " + cpuGeneralScore + " manches.")
    if (playerGeneralScore > cpuGeneralScore) {
        scoreInterval = playerGeneralScore - cpuGeneralScore;
        console.log("Vous avez gagné " + scoreInterval + " manches de plus que votre adversaire ! \n Vous etes en tête ! Bien joué !")
    } else if (cpuGeneralScore > playerGeneralScore) {
        scoreInterval = cpuGeneralScore - playerGeneralScore;
        console.log("Votre adversaire a gagné " + scoreInterval + " manches de plus vous ! continuez vous allez vous refaire !")
    } else {
        console.log("Votre adversaire et vous êtes a égalité ! Quelle partie !!!")
    }
    playerWantContinue = Prompt("Voulez vous jouer a nouveau ? (oui / non)");
    if (playerWantContinue === "non") {
        console.log("merci d'avoir jouer a mon jeu ! Bonne journée !");
        break;
    }
    while (playerWantContinue !== "oui") {
        playerChoice = Prompt("Répondez par oui ou par non je vous prie, voulez vous jouer a nouveau ? ").toLowerCase();
    }
}


