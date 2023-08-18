console.log("Welcome to Genie Guesser!")

// Variables globales

let isButtonDisabled = false;

// Funciones principales

function getRandomNumber(min = 1, max = 100){
    return Math.floor(Math.random() * (max - min)) + min;
}

function numberIsLarger(){
    const minValue = document.getElementById("minValue");
    const guessedNumber = document.getElementById("guessedNumber");

    minValue.innerHTML = parseInt(guessedNumber.innerHTML) + 1;
    wrongNumber();
    setTimeout(makeNewGuess, 1500);
}

function numberIsSmaller(){
    const maxValue = document.getElementById("maxValue");
    const guessedNumber = document.getElementById("guessedNumber");

    maxValue.innerHTML = `${parseInt(guessedNumber.innerHTML) - 1}`;
    wrongNumber();
    setTimeout(makeNewGuess, 1500);
}

function makeNewGuess(){
    const minValueStr = document.getElementById("minValue");
    const maxValueStr = document.getElementById("maxValue");

    const maxValue = parseInt(maxValueStr.innerHTML);
    const minValue = parseInt(minValueStr.innerHTML);

    let newAnswer = 0;

    newAnswer = binarySearch(minValue, maxValue);
    guessNumber(newAnswer);
    if(minValue > maxValue)
        finishGame();
}

function binarySearch(minValue = 1, maxValue = 100){
    console.log(`${minValue}, ${maxValue}`);
    return Math.floor( ( minValue + maxValue ) / 2);
}

// Transiciones del juego

function startGame(){
    const tryButtons = document.getElementsByClassName("tryButton");
    const confirmButton = document.getElementById("confirmButton");

    confirmButton.innerHTML = "¡Correcto!";
    confirmButton.setAttribute("onclick", "finishGame()");
    confirmButton.setAttribute("class", "col-12 col-lg-4 btn btn-success");

    for (const tryButton of tryButtons) {
        tryButton.removeAttribute("disabled");
        tryButton.style.visibility = "visible";
    }

    const randomNumber = getRandomNumber();
    guessNumber(randomNumber);
}

function guessNumber(number){
    const genieIMG = document.getElementById("genieIMG");
    const abbuIMG = document.getElementById("abbuIMG");
    const genieTextBox = document.getElementById("genieTextBox");

    if(number === 1)
        disableSmallerNumberButton();
    else if(number === 100)
        disableLargerNumberButton();
    else if(isButtonDisabled)
        enableButtons();

    genieIMG.setAttribute("src", "../img/genieGuess.png");
    abbuIMG.setAttribute("src", "../img/abbuStart.png");
    genieTextBox.innerHTML = `¡AJA!, el número que estás pensando es <span id="guessedNumber">${number}</span>, ¿cierto?`;
}

function wrongNumber(){
    const genieIMG = document.getElementById("genieIMG");
    const abbuIMG = document.getElementById("abbuIMG");
    const genieTextBox = document.getElementById("genieTextBox");

    genieIMG.setAttribute("src", "../img/genieWrong.png");
    abbuIMG.setAttribute("src", "../img/abbuWrong.png");

    const option = getRandomNumber(1, 5);
    let message = "";

    switch(option){
        case 1:
            message = "Como dicen en mi colmena: ¡la mentira no es buena!";
            break;
        case 2:
            message = "“No me lo puedo creer, vencido por un felpudo”";
            break;
        case 3:
            message = "ya, ya, niño malo, pero no más rodeos";
            break;
        case 4:
            message = "Genio despierta, baja ya de las nubes";
            break;
        default:
            message = "¡No intentes romper el juego, listillo!";
    }

    genieTextBox.innerHTML = message;
}

function setGame(){
    const genieIMG = document.getElementById("genieIMG");
    const abbuIMG = document.getElementById("abbuIMG");
    const confirmButton = document.getElementById("confirmButton");
    const genieTextBox = document.getElementById("genieTextBox");
    const minValue = document.getElementById("minValue");
    const maxValue = document.getElementById("maxValue");

    minValue.innerHTML = "1";
    maxValue.innerHTML = "100";

    confirmButton.innerHTML = "OK";
    confirmButton.setAttribute("onclick", "startGame()");

    genieTextBox.innerHTML = `¡Piensa en un número del 1 al 100 y luego haz click en OK!`;

    genieIMG.setAttribute("src", "../img/genieStart.png");
    abbuIMG.setAttribute("src", "../img/abbuStart.png");
}

function finishGame(){
    const genieIMG = document.getElementById("genieIMG");
    const abbuIMG = document.getElementById("abbuIMG");
    const genieTextBox = document.getElementById("genieTextBox");
    const guessedNumber = document.getElementById("guessedNumber");
    const tryButtons = document.getElementsByClassName("tryButton");
    const confirmButton = document.getElementById("confirmButton");

    const rightAnswer = guessedNumber.innerHTML;

    genieIMG.setAttribute("src", "../img/genieRight.png");
    abbuIMG.setAttribute("src", "../img/abbuRight.png");
    genieTextBox.innerHTML = `Tu número es el ${rightAnswer}, excelente decisión, Abú`;

    for (const tryButton of tryButtons) {
        tryButton.style.visibility = "hidden";
    }

    confirmButton.setAttribute("class", "col-12 btn btn-success");
    confirmButton.innerHTML = "Reiniciar el juego";
    confirmButton.setAttribute("onclick", "setGame()");

}

// Funciones para habilitar y deshabilitar los botones

function disableSmallerNumberButton(){
    const smallerNumberButton = document.getElementById("smallerNumberButton");
    smallerNumberButton.disabled = true;
    isButtonDisabled = true;
}

function disableLargerNumberButton(){
    const largerNumberButton = document.getElementById("largerNumberButton");
    largerNumberButton.disabled = true;
    isButtonDisabled = true;
}

function enableButtons(){
    const largerNumberButton = document.getElementById("largerNumberButton");
    const smallerNumberButton = document.getElementById("smallerNumberButton");
    largerNumberButton.disabled = false;
    smallerNumberButton.disabled = false;
    isButtonDisabled = false;
}

