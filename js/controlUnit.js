const adressAmount = 32;
function buttonStartClick() {
    if (startOrStopButton.textContent.trim() == "start") {
        startOrStopButton.textContent = "stop";
        execRoutine();
    } else {
        startOrStopButton.textContent = "start";
        stop();
    }
}
function execRoutine() {
    clearInterval(routineCallback);

    incrementProgramCounterCallBack = setTimeout(() => {
        blankInput(cxProgramCounter);
        incrementProgramCounter();
    }, 2000);
    readInstruction();

    routineCallback = setInterval(() => {

        incrementProgramCounterCallBack = setTimeout(() => {
            blankInput(cxProgramCounter);
            incrementProgramCounter();
        }, 2000);

        readInstruction();
    }, time * 10);
}

function stop() {
    clearInterval(routineCallback);
    clearTimeout(incrementProgramCounterCallBack);
    while (stepsCallBacks.length) {
        clearTimeout(stepsCallBacks[0]);
        stepsCallBacks.shift();
    }
}
function nextStep() {
    readInstruction();
}

function incrementProgramCounter() {
    programCounter++;
    programCounter = programCounter % adressAmount;
    programCounterText.innerText = `PC:  ${programCounter}`;

}
function resetPc() {
    programCounter = 0;
    programCounterText.innerText = `PC:  ${programCounter}`;
}
function interrupt() {
    clearInterval(routineCallback);
    interpretedComand.innerText = `operação invalida`
    startOrStopButton.textContent = "start";
    clearTimeout(incrementProgramCounterCallBack);
}

function branchingOperation() {

    const flagZero = document.getElementById("flag-zero");
    const flagNegative = document.getElementById("flag-negative");

    clearTimeout(incrementProgramCounterCallBack);
    clearInterval(routineCallback);

    setTimeout(() => {
        if (comand.toLowerCase().trim() == "branch") {
            programCounter = firstAtribute;
        } else if (comand.toLowerCase().trim() == "bneg") {
            if (flagNegative.innerText.trim() == "negative: true") {
                programCounter = firstAtribute;
            }
        } if (comand.toLowerCase().trim() == "bzero") {
            if (flagZero.innerText.trim() == "zero: true") {
                programCounter = firstAtribute;
            }
        }
        execRoutine();
        programCounterText.innerText = `PC:  ${programCounter}`;
    }, 2000);

}