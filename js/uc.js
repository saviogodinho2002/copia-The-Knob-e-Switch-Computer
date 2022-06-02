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
    //nextStep();
    readInstruction();
    setTimeout(() =>{
        blankInput(cxProgramCounter);
        incrementProgramCounter();
    },2000);
    callbackRoutine = setInterval(() => {
        //nextStep();
        readInstruction();
        setTimeout(() =>{
            blankInput(cxProgramCounter);
            incrementProgramCounter();
        },2000);
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
    interpretedComand.innerText = `operação invalida`
    startOrStopButton.textContent = "start";
}
