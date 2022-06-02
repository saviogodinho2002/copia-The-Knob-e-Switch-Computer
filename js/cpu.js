


function branchingOperation() {

    const flagZero = document.getElementById("flag-zero");
    const flagNegative = document.getElementById("flag-negative");
    console.log(flagNegative.innerText);
    console.log(flagZero.innerText);

    if (comand.toLowerCase().trim() == "branch") {
        programCounter = firstAtribute - 1;
    } else if (comand.toLowerCase().trim() == "bneg") {
        if (flagNegative.innerText.trim() == "negative: true") {
            programCounter = firstAtribute - 1;
        }
    } if (comand.toLowerCase().trim() == "bzero") {
        if (flagZero.innerText.trim() == "zero: true") {
            programCounter = firstAtribute - 1;
        }
    }

}
function aritmeticOperation() {

    const regB = document.getElementsByClassName("registrador")[lastRegisterA];
    const regBValue = parseInt(regB.value == "" ? 0 : regB.value);
    const regC = document.getElementsByClassName("registrador")[lastRegisterB];
    const regCValue = parseInt(regC.value == "" ? 0 : regC.value);


    if (comandSet[0][lastAluOperation] == "add") {

        BufferAluRegister.value = (regBValue + regCValue);

    } else if (comandSet[0][lastAluOperation] == "sub") {

        BufferAluRegister.value = (regBValue - regCValue);

    } else if (comandSet[0][lastAluOperation] == "div") {

        BufferAluRegister.value = (regBValue / regCValue);

    } else if (comandSet[0][lastAluOperation] == "mul") {

        BufferAluRegister.value = (regBValue * regCValue);

    } else if (comandSet[0][lastAluOperation] == "and") {

        BufferAluRegister.value = regBValue | regCValue;

    } else if (comandSet[0][lastAluOperation] == "or" && thirdAtribute != -1) {

        BufferAluRegister.value = regBValue | regCValue;


    } else if (comandSet[1][lastAluOperation - 1] == "not") {

        BufferAluRegister.value = -1 * (regBValue | regCValue);

    }
    blankInput(BufferAluRegister);
    updateFlags(parseInt(BufferAluRegister.value));

}
function dataMovementOperation() {
    thirdAtribute = 0;
    if (comand.toLowerCase() == "load") {

        const data = document.getElementsByClassName("endereco")[secondAtribute].value;

        routine(-1, -1, 4, firstAtribute, data);

    } else if (comand.toLowerCase() == "store") {

        routine(secondAtribute, secondAtribute, 4, firstAtribute, null);

    } else if (comand.toLowerCase() == "move") {

        routine(secondAtribute, secondAtribute, 4,firstAtribute, null);
    } else if (comand.toLowerCase() == "not") {
        thirdAtribute = -1;
        routine(firstAtribute, firstAtribute, 4, secondAtribute, null);
    }


}
function updateFlags(lastOperationResult) {
    document.getElementById("flag-zero").innerHTML = "zero: " + (lastOperationResult == 0);
    document.getElementById("flag-negative").innerHTML = "negative: " + (lastOperationResult < 0);
}

function routine(registerOneIndex, registerTwoIndex, aluOperationIndex, outPutIndex, dataFromMemory) {
    stepsCallBacks.push(setTimeout(() => {
        setLastRegistersAndLastALUOperation(registerOneIndex, registerTwoIndex, aluOperationIndex);
        setDropDownsPointers(registerOneIndex, outPutIndex);

    }, time));


    stepsCallBacks.push(setTimeout(() => {
        setDataOnBusABAdressAndMemoryBus(dataFromMemory);

        stepsCallBacks.shift();
    }, time * 2));

    stepsCallBacks.push(setTimeout(() => {
        setDataOnAluAandB();

        stepsCallBacks.shift();
    }, time * 4));

    stepsCallBacks.push(setTimeout(() => {
        aritmeticOperation();

        stepsCallBacks.shift();
    }, time * 6));

    stepsCallBacks.push(setTimeout(() => {
        setDataOnCbusAdress(dataFromMemory);

        stepsCallBacks.shift();
    }, time * 8));

    stepsCallBacks.push(setTimeout(() => {
        setDataOnOutPutRegisterOrMemory(outPutIndex);

        stepsCallBacks.shift();
    }, time * 9));


}
function setLastRegistersAndLastALUOperation(ABusRegister, BBusRegister, AluOperation) {
    lastRegisterA = ABusRegister == -1 ? lastRegisterA : ABusRegister;
    lastRegisterB = BBusRegister == -1 ? lastRegisterB : BBusRegister;
    lastAluOperation = AluOperation == -1 ? lastAluOperation : AluOperation;

}
function setDropDownsPointers(flag, outPut) {

    ABusRegisterDrop.selectedIndex = lastRegisterA;
    BBusRegisterDrop.selectedIndex = lastRegisterB;

    aluOperationsDrop.selectedIndex = lastAluOperation;

    CBusFromDrop.selectedIndex = flag == -1 ? 1 : 0;
    CbusRegisterDrop.selectedIndex = outPut > 4 ? 4 : outPut;

}

function setDataOnBusABAdressAndMemoryBus(memoryData) {

    AbusData.value = document.getElementsByClassName("registrador")[lastRegisterA].value;
    BbusData.value = document.getElementsByClassName("registrador")[lastRegisterB].value;
    MemoryBusData.value = memoryData == null ? Math.floor(Math.random() * 1000) : memoryData;

    blankInput(AbusData);
    blankInput(BbusData);
    blankInput(MemoryBusData);
}
function setDataOnAluAandB() {

    AAluRegister.value = AbusData.value;
    BAluRegister.value = BbusData.value;

    blankInput(AAluRegister);
    blankInput(BAluRegister);
}

function setDataOnCbusAdress(memoryData) {
    CbusData.value = memoryData == null ? BufferAluRegister.value : MemoryBusData.value;
    blankInput(CbusData);
}
function setDataOnOutPutRegisterOrMemory(index) {

    const typeMem = index > 3 ? "endereco" : "registrador";
    const out = document.getElementsByClassName(typeMem)[index];

    if (index > 3) {
        MemoryBusData.value = CbusData.value;
        blankInput(MemoryBusData);
        stepsCallBacks.push(setTimeout(
            () => {
                out.value = CbusData.value;
                blankInput(out);
            }, time));
    } else {
        out.value = CbusData.value;
        blankInput(out);
    }
}

function blankInput(input) {
    input.classList.add("blue-input");
    setTimeout(() => {
        input.classList.remove("blue-input");
    }, time);
}

function setZerosInMemAndRegis() {
    const memAdress = document.getElementsByClassName("endereco");
    const registers = document.getElementsByClassName("registrador");

    for (const iterator of memAdress) {
        iterator.value = iterator.value == "" ? 0 : iterator.value;
    }
    for (const iterator of registers) {
        iterator.value = iterator.value == "" ? 0 : iterator.value;
    }
}
function setZerosInAluRegistersAndBusRegister() {
    AbusData.value = 0;
    BbusData.value = 0;

    CbusData.value = 0;

    AAluRegister.value = 0;
    BAluRegister.value = 0;
    BufferAluRegister.value = 0;

    MemoryBusData.value = 0;

    cxProgramCounterText.value = 0;
    cxReadedComand.value = 0;
    cxInterpretedComand.value = 0;
}
function verifyIfVoidString(element) {
    element.value = element.value == "" ? 0 : element.value;
}
function gerateMemAdress() {
    let htmlFirstSection = "";
    let htmlSecondSection = "";
    const adressAmount = 32;
    for (let i = 0; i < adressAmount; i++) {
        if (i < (adressAmount / 2))
            htmlFirstSection += `<div class="endereco-container"> ${i} <input class="caixa-de-texto endereco" name="instruction" onfocusout="verifyIfVoidString(this)"/> </div>`;
        else
            htmlSecondSection += `<div class="endereco-container"> ${i} <input class="caixa-de-texto endereco" name="instruction" onfocusout="verifyIfVoidString(this)"/> </div>`;
    }
    const groupsAdress = document.getElementsByClassName("enderecos-container-group");
    groupsAdress[0].innerHTML = htmlFirstSection;
    groupsAdress[1].innerHTML = htmlSecondSection;

}

gerateMemAdress();
setZerosInMemAndRegis();
setZerosInAluRegistersAndBusRegister();