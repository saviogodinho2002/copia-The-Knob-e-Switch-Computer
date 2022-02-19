const comandSet = ["add","sub","div","mul","mov","not","load","stor","jump","junp","juzp"];

let firstAtribute = secondAtribute = 0;
let comand;

let programCounter = 0;
const cxProgramCounterText = document.querySelector("#caixa-program-counter");
const cxReadedComand = document.querySelector("#caixa-comando-lido");
const cxInterpretedComand = document.querySelector("#caixa-comando-interepretado");
function nextStep(){
    readInstruction();
    programCounter++;
    programCounter = programCounter%32;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;
   
}
function readInstruction(){
    const currentAdress = document.getElementsByClassName("endereco")[programCounter];
    const textOfCurrentAdress = currentAdress.value;
    cxReadedComand.innerHTML = ` <p class="label inbox" >  ${textOfCurrentAdress} </p>`;
    
    let regex = new RegExp( "^\\s*([a-zA-Z]{3})\\s+([0]*[0-3]{1})\\s+([0]*[0-3]{1})\\s*$","g");
    
    if(textOfCurrentAdress.match(regex) != null){ //add e os caralho
        aritmeticValidation(textOfCurrentAdress);
        return;
    }

    regex = new RegExp("^\\s*([a-zA-z]{4})\\s+([0]*[0-3]{1})\\s+[0]*(([0-9])|([0-2][0-9])|([3][0-1]))\\s*$","g");
    if(textOfCurrentAdress.match(regex) != null){ //load e stor
        manipulationOfMemoryValidation();
        return;
    }

    regex = new RegExp("^\\s*([a-zA-z]{4})\\s+[0]*(([0-9])|([0-2][0-9])|([3][0-1]))\\s*$","g");
    if(textOfCurrentAdress.match(regex) != null){ //saltos condicionais
        manipulationOfPCValidation();
        return;
    }
    cxInterpretedComand.innerHTML =  ` <p class="label inbox" > operação invalida </p>`
    /* let regex = new RegExp("9","g") 
    let string = "882392";//regex.exec();
    console.log(string.match(regex));
    */
    //cxInterpretedComand.innerHTML  = ` <p class="label inbox" >  ${document.getElementsByClassName("endereco")[programCounter].value} </p>`;
}
function aritmeticValidation(instruction){
    let regex = new RegExp("([a-zA-Z]{3})","g");
    comand = instruction.match(regex)[0];
    if(!comandSet.includes(comand)) {
        cxInterpretedComand.innerHTML =  ` <p class="label inbox" > operação invalida </p>`
        return;
    }
    regex = new RegExp("([0]*[0-3]{1})","g");
    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand} | 0${firstAtribute} | 0${secondAtribute} </p>`;
    aritmeticOperation();
}
function manipulationOfMemoryValidation(){}
function manipulationOfPCValidation(){}
function aritmeticOperation(){
    const regA = document.getElementsByClassName("registrador")[firstAtribute];
    const regB = document.getElementsByClassName("registrador")[secondAtribute];

    const regAValue = parseInt(regA.value);
    const regBValue = parseInt(regB.value);
    if(comand.toLowerCase() == "add"){
        regA.value = (regAValue+regBValue);
    }
    document.getElementById("flag-zero").innerHTML = "zero: "+ (parseInt( regA.value) == 0)
    document.getElementById("flag-negative").innerHTML = "negative: "+ (parseInt( regA.value) < 0)
}
function resetPc(){
    programCounter = 0;
    cxProgramCounterText.innerHTML = ` <p class="label inbox" > PC:  ${programCounter} </p>`;
}