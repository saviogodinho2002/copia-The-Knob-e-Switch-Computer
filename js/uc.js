const adressAmount = 32;
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
    programCounter = programCounter % adressAmount;
    programCounterText.innerText = `PC:  ${programCounter}`;

}
function resetPc() {
    programCounter = 0;
    programCounterText.innerText = `PC:  ${programCounter}`;
}
function interrupt(){
    clearInterval(callbackRoutine);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
    startOrStopButton.textContent = "start";
}
