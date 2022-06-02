
function buttonStartClick() {
    if (startOrStopButton.textContent == "start") {
        startOrStopButton.textContent = "stop";
        execRoutine();
    } else {
        startOrStopButton.textContent = "start";
        stop();
    }
}

function execRoutine() {

    clearInterval(callbackRoutine);
    nextStep();
    callbackRoutine = setInterval(() => {
        nextStep();

    }, time * 10);
}
function stop() {
    clearInterval(callbackRoutine);
    let iterator = 0;
    while (stepsCallBacks.length) {
        clearTimeout(stepsCallBacks[iterator]);
        stepsCallBacks.shift();
    }
    
}

function nextStep() {
    readInstruction();
    incrementProgramCounter();
}

function incrementProgramCounter() {
    programCounter++;
    programCounter = programCounter % 32;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;

}
function resetPc() {
    programCounter = 0;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;
    stop();

}
