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
