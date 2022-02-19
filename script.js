const comandSet = [
    ["add", "sub", "div", "mul", "or", "and"],
    ["move", "load", "store", "not"],
    ["jump", "junp", "juzp"]
];

let firstAtribute = secondAtribute = thirdAtribute = 0;
let comand;

let programCounter = 0;
const cxProgramCounterText = document.querySelector("#caixa-program-counter");
const cxReadedComand = document.querySelector("#caixa-comando-lido");
const cxInterpretedComand = document.querySelector("#caixa-comando-interepretado");
function nextStep() {
    readInstruction();
    programCounter++;
    programCounter = programCounter % 32;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;

}
function readInstruction() {
    const currentAdress = document.getElementsByClassName("endereco")[programCounter];
    const textOfCurrentAdress = currentAdress.value;
    cxReadedComand.innerHTML = ` <p class="label inbox" >  ${textOfCurrentAdress} </p>`;

    let regex = new RegExp("^\\s*([a-zA-Z]{2,3})\\s+(R[0]*[0-3]{1})\\s+(R[0]*[0-3]{1})\\s+(R[0]*[0-3]{1})\\s*$", "g");

    if (textOfCurrentAdress.match(regex) != null) { //add e os caralho
        aritmeticValidation(textOfCurrentAdress);
        return;
    }

    regex = new RegExp("^\\s*([a-zA-Z]{3,5})\\s+([R]{0,1}[0]*[0-9]{1,2})\\s+([R]{0,1}[0]*[0-9]{1,2})\\s*$", "g");
    if (textOfCurrentAdress.match(regex) != null) { //load e stor
        dataMovementValidation(textOfCurrentAdress);
        return;
    }

    regex = new RegExp("^\\s*([a-zA-Z]{4})\\s+[0]*(([0-9])|([0-2][0-9])|([3][0-1]))\\s*$", "g");
    if (textOfCurrentAdress.match(regex) != null) { //saltos condicionais
        manipulationOfPCValidation();
        return;
    }
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
    /* let regex = new RegExp("9","g") 
    let string = "882392";//regex.exec();
    console.log(string.match(regex));
    */
    //cxInterpretedComand.innerHTML  = ` <p class="label inbox" >  ${document.getElementsByClassName("endereco")[programCounter].value} </p>`;
}
function aritmeticValidation(instruction) {//TODO: passar trabalho para a operation
    let regex = new RegExp("([a-zA-Z]{2,3})", "g");
    comand = instruction.match(regex)[0];
    if (!comandSet[0].includes(comand.toLowerCase())) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }

    regex = new RegExp("([0]*[0-3]{1})", "g");

    if (comand.toLowerCase() != "not" && instruction.match(regex).length < 3) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }
    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    thirdAtribute = parseInt(instruction.match(regex)[2]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | 0${firstAtribute} | 0${secondAtribute} | 0${thirdAtribute} </p>`;
    aritmeticOperation();
}
function dataMovementValidation(instruction) {
    let regex = new RegExp("([a-zA-Z]{3,5})", "g");

    comand = instruction.match(regex)[0];

    if (!comandSet[1].includes(comand.toLowerCase())) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }
    regex = null;
    if (comand.toLowerCase() == "load") {
        regex = new RegExp("(R[0-3]\\s+[0-9]{1,2})", "g");
    } else if (comand.toLowerCase() == "store") {
        regex = new RegExp("\\s+([0-9]{1,2}\\s+R[0-3])", "g");
    }
    else {
        regex = new RegExp("(R[0-3]\\s+R[0-3])", "g");
    }

    if (instruction.match(regex) == null) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }
    regex = new RegExp("([0-9]{1,2})", "g");
    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | ${(firstAtribute < 10 ? "0" : "") + firstAtribute} | ${(secondAtribute < 10 ? "0" : "") + secondAtribute} </p>`;
    dataMovementOperation();
}
function manipulationOfPCValidation() { }
function aritmeticOperation() {

    const regA = document.getElementsByClassName("registrador")[firstAtribute];
    const regB = document.getElementsByClassName("registrador")[secondAtribute];
    const regAValue = parseInt(regA.value == "" ? 0 : regA.value);
    const regBValue = parseInt(regB.value == "" ? 0 : regB.value);
    const regC = document.getElementsByClassName("registrador")[thirdAtribute];
    const regCValue = parseInt(regC.value == "" ? 0 : regC.value);


    if (comand.toLowerCase() == "add") {
        regA.value = (regBValue + regCValue);
    } else if (comand.toLowerCase() == "sub") {
        regA.value = (regBValue - regCValue);
    } else if (comand.toLowerCase() == "div") {
        regA.value = (regBValue / regCValue);
    } else if (comand.toLowerCase() == "mul") {
        regA.value = (regBValue * regCValue);
    } else if (comand.toLowerCase() == "and") {
        regA.value = (regBValue > regCValue) ? regCValue : regBValue;
    } else if (comand.toLowerCase() == "or") {
        regA.value = (regBValue > regCValue) ? regBValue : regCValue;
    }
    updateFlags(parseInt(regA.value));

}
function dataMovementOperation() {
    let pointerA;
    let pointerB;
    if (comand.toLowerCase() == "load") {
        pointerA = document.getElementsByClassName("registrador")[firstAtribute];
        pointerB = document.getElementsByClassName("endereco")[secondAtribute];

    } else if (comand.toLowerCase() == "store") {
        pointerA = document.getElementsByClassName("endereco")[firstAtribute];
        pointerB = document.getElementsByClassName("registrador")[secondAtribute];

    }else {
        pointerA = document.getElementsByClassName("registrador")[firstAtribute];
        pointerB = document.getElementsByClassName("registrador")[secondAtribute];
    }
  
    pointerA.value = comand.toLowerCase() == "not"? pointerB.value * -1 : pointerB.value;
    updateFlags(parseInt(pointerA.value));

}
function updateFlags(lastOperationResult){
    document.getElementById("flag-zero").innerHTML = "zero: " + (lastOperationResult == 0);
    document.getElementById("flag-negative").innerHTML = "negative: " + (lastOperationResult  < 0);
}
function resetPc() {
    programCounter = 0;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;
}
