const comandSet = [
    ["add", "sub", "div", "mul", "or", "and"],
    ["move", "load", "store", "not"],
    ["branch", "bzero", "bneg"]
];

let firstAtribute = secondAtribute = thirdAtribute = 0;
const ABusRegisterDrop = document.getElementById("drop-registers-a");
const BBusRegisterDrop = document.getElementById("drop-registers-b");
const CBusFromDrop = document.getElementById("drop-mem-buffer");
const CbusRegisterDrop = document.getElementById("drop-registers-c");
const aluOperationsDrop = document.getElementById("operations-alu");

const AbusData = document.getElementsByClassName("bus-adress")[0];
const BbusData = document.getElementsByClassName("bus-adress")[1];

const CbusData = document.getElementsByClassName("bus-adress")[2];

const AAluRegister = document.getElementsByClassName("alu-register")[0];
const BAluRegister = document.getElementsByClassName("alu-register")[1];
const BufferAluRegister = document.getElementsByClassName("alu-register")[2];

const MemoryBusData = document.getElementById("memory-bus");

let lastRegisterA =0;
let lastRegisterB = 0;
let lastAluOperation = "add";

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
function readInstruction() { //lexer
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

    regex = new RegExp("^\\s*([a-zA-Z]{3,6})\\s+[0]*(([0-9])|([0-2][0-9])|([3][0-1]))\\s*$", "g");
    if (textOfCurrentAdress.match(regex) != null) { //saltos condicionais
        branchingValidation(textOfCurrentAdress);
        return;
    }
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
    
}
function aritmeticValidation(instruction) {//TODO: passar trabalho para a operation
    let regex = new RegExp("([a-zA-Z]{2,3})", "g");
    comand = instruction.match(regex)[0];

    if (!comandSet[0].includes(comand.toLowerCase())) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }

    regex = new RegExp("([0]*[0-3]{1})", "g");

    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    thirdAtribute = parseInt(instruction.match(regex)[2]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | 0${firstAtribute} | 0${secondAtribute} | 0${thirdAtribute} </p>`;
    
    routine(secondAtribute, thirdAtribute,comandSet[0].indexOf(comand.toLowerCase().trim()),firstAtribute,"null");
}
function dataMovementValidation(instruction) {
    let regex = new RegExp("([a-zA-Z]{3,5})", "g");

    comand = instruction.match(regex)[0].trim();

    if (!comandSet[1].includes(comand.toLowerCase())) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }
    regex = null;
    const regexExps = ["([a-zA-Z]{4}\\s+R[0-3]\\s+[0-9]{1,2})", "[a-zA-Z]\\s+([0-9]{1,2}\\s+R[0-3])", "([a-zA-Z]{3,4}\\s+R[0-3]\\s+R[0-3])","([a-zA-Z]{3}\\s+R[0-3]\\s+[0-9]{1,2})"];


    for (let i = 0; i<4;i++) {
        regex = new RegExp(regexExps[i], "g");
        if (instruction.match(regex) != null) {
            regex = new RegExp("([0-9]{1,2})", "g");
            firstAtribute = parseInt(instruction.match(regex)[0]);
            secondAtribute = parseInt(instruction.match(regex)[1]);
            thirdAtribute = -1;
            cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | ${(firstAtribute < 10 ? "0" : "") + firstAtribute} | ${(secondAtribute < 10 ? "0" : "") + secondAtribute} </p>`;
            dataMovementOperation();
            return;
        }
    }

    cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
    return;


}
function branchingValidation(instruction) {
   
    let regex = new RegExp("([a-zA-Z]{3,6})", "g");
    comand = instruction.match(regex)[0].trim();

    if (!comandSet[2].includes(comand.toLowerCase())) {
        cxInterpretedComand.innerHTML = ` <p class="label inbox" > operação invalida </p>`
        return;
    }

    regex = new RegExp("([0-9]{1,2})", "g");
    firstAtribute = parseInt(instruction.match(regex)[0]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | ${firstAtribute<9?0:""}${firstAtribute} </p>`;
    branchingOperation();
}
function branchingOperation() {

    const flagZero = document.getElementById("flag-zero");
    const flagNegative = document.getElementById("flag-negative");
    console.log(flagNegative.innerText );
    console.log(flagZero.innerText );

    if (comand.toLowerCase().trim() == "branch") {
        programCounter = firstAtribute -1;
    } else if (comand.toLowerCase().trim() == "bneg") {
        if (flagNegative.innerText.trim() == "negative: true"){
            programCounter = firstAtribute-1;
        }
    } if (comand.toLowerCase().trim() == "bzero") {
        if (flagZero.innerText.trim() == "zero: true"){
             programCounter = firstAtribute -1;
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
        console.log("vasco")   

    }else if (comandSet[1][lastAluOperation-1] == "not") {

        BufferAluRegister.value = -1 * (regBValue | regCValue);
        console.log("vasco")     //
    }
    updateFlags(parseInt(BufferAluRegister.value));

}
function dataMovementOperation() {
    
    if (comand.toLowerCase() == "load") {
       
        const data =  document.getElementsByClassName("endereco")[secondAtribute].value;

        routine(-1,-1,4,firstAtribute, data);

    } else if (comand.toLowerCase() == "store") {
    

        routine(secondAtribute,secondAtribute,4,firstAtribute,"null" );

    } else if(comand.toLowerCase() == "move"){
     
        routine(firstAtribute,firstAtribute,4,secondAtribute,"null");
    }else if(comand.toLowerCase() == "not"){
        routine(firstAtribute,firstAtribute,4,secondAtribute,"null");
    }

  
}
function updateFlags(lastOperationResult) {
    document.getElementById("flag-zero").innerHTML = "zero: " + (lastOperationResult == 0);
    document.getElementById("flag-negative").innerHTML = "negative: " + (lastOperationResult < 0);
}
function resetPc() {
    programCounter = 0;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;
}
function routine(registerOneIndex,registerTwoIndex,aluOperationIndex,outPutIndex,dataFromMemory){

    setLastRegistersAndLastALUOperation(registerOneIndex,registerTwoIndex,aluOperationIndex);
    setDropDownsPointers(aluOperationIndex,outPutIndex);
    setDataOnBusABAdressAndMemoryBus(dataFromMemory);
    setDataOnAluAandB();
    aritmeticOperation();
    setDataOnCbusAdress(dataFromMemory);
    setDataOnOutPutRegisterOrMemory(outPutIndex);

}
function setLastRegistersAndLastALUOperation(ABusRegister,BBusRegister,AluOperation){
    lastRegisterA = ABusRegister == -1? lastRegisterA:ABusRegister;
    lastRegisterB = BBusRegister == -1? lastRegisterB:BBusRegister;
    lastAluOperation = AluOperation == -1?lastAluOperation: AluOperation;

}
function setDropDownsPointers(AluOperation,outPut){
 
    ABusRegisterDrop.selectedIndex = lastRegisterA;
    BBusRegisterDrop.selectedIndex = lastRegisterB;

    aluOperationsDrop.selectedIndex = lastAluOperation; 

    CBusFromDrop.selectedIndex = AluOperation == -1? 1 : 0;
    CbusRegisterDrop.selectedIndex = outPut;


    // setDataOnCbusAdress
   // setDataOnBusABAdressAndMemoryBus(lastRegisterA,lastRegisterB);

}

function setDataOnBusABAdressAndMemoryBus(memoryData){
   // ABusRegisterDrop.selectedIndex = ABusRegister;
    //BBusRegisterDrop.selectedIndex = BBusRegister;

    AbusData.value = document.getElementsByClassName("registrador")[lastRegisterA].value;
    BbusData.value = document.getElementsByClassName("registrador")[lastRegisterB].value;
    MemoryBusData.value = memoryData == "null"? Math.floor(Math.random() * 1000): memoryData;

}


function setDataOnAluAandB(){
    //lastAluOperation = -1?lastAluOperation: comandSet[0][aluOperation];
    AAluRegister.value = AbusData.value;
    BAluRegister.value = BbusData.value;
    
    //aritimetic

}

function setDataOnCbusAdress(memoryData){
   CbusData.value = memoryData == "null"? BufferAluRegister.value:MemoryBusData.value ;
}
function setDataOnOutPutRegisterOrMemory(index){
    typeMem = index > 3?"endereco":"registrador";
    document.getElementsByClassName(typeMem)[index].value = CbusData.value;
}
