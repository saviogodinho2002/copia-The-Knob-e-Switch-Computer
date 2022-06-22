const adressAmount = 32;
function buttonStartClick() {
    if (startOrStopButton.textContent.trim() == "start") {
        startOrStopButton.textContent = "stop";
        execRoutine();
    } else {
        startOrStopButton.textContent = "start";
        cleanProcessQueue();
    }
}
function clearCallBacks() {
    clearInterval(routineCallback);
    clearTimeout(incrementProgramCounterCallBack);
}

function execRoutine() {
    clearCallBacks();

    incrementProgramCounterCallBack = setTimeout(() => {
        blankInput(cxProgramCounter);
        incrementProgramCounter();
    }, timeInterval);
    readInstruction();

    routineCallback = setInterval(() => {

        incrementProgramCounterCallBack = setTimeout(() => {
            blankInput(cxProgramCounter);
            incrementProgramCounter();
        }, timeInterval);

        readInstruction();
    }, time * 10);
}

function cleanProcessQueue() {
    clearCallBacks();
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
    cleanProcessQueue();
    interpretedComand.innerText = "1111 | 1111 | 1111 | 1111 | 1111"
    startOrStopButton.textContent = "start";

}

function branchingOperation() {

    const flagZero = document.getElementById("flag-zero");
    const flagNegative = document.getElementById("flag-negative");

    clearCallBacks();

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
    }, timeInterval);

}
function machineCycleControlOperation() {
    if (comand.toLowerCase().trim() == "halt") {

        cleanProcessQueue();
        
    } else if (comand.toLowerCase().trim() == "nop") {
        routineCallback = setInterval(execRoutine,time*10)
       
    }

}