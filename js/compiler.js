function readInstruction() { // analisador sintatico
    const currentAdress = document.getElementsByClassName("endereco")[programCounter];
    const textOfCurrentAdress = currentAdress.value;
    cxReadedComand.innerHTML = ` <p class="label inbox" >  ${textOfCurrentAdress} </p>`;

    let regex = new RegExp( regExpSyntaxValidation[0], "g");

    if (textOfCurrentAdress.match(regex) != null) { //add e os caralho
        aritmeticValidation(textOfCurrentAdress);
        return;
    }

    for (const regexValid of regExpSyntaxValidation[1]) { //load e store
        regex = new RegExp(regexValid, "g");
        if (textOfCurrentAdress.match(regex) != null) {
            dataMovementValidation(textOfCurrentAdress);
            return;
        }
    }

    regex = new RegExp(regExpSyntaxValidation[2], "g");

    if (textOfCurrentAdress.match(regex) != null) { //saltos condicionais
        branchingValidation(textOfCurrentAdress);
        return;
    }
    regex = new RegExp(regExpSyntaxValidation[3],"g");
    
    if(textOfCurrentAdress.match(regex)){
        machineCycleControlValidation(textOfCurrentAdress)

        return;
    }
    interrupt();

}
function aritmeticValidation(instruction) {
    let regex = new RegExp(regExpCatchComand[0], "g");
    comand = instruction.match(regex)[0];

    if (!comandSet[0].includes(comand.toLowerCase())) {
        interrupt();
        return;
    }

    regex = new RegExp(regExpCatchParamters[0], "g");

    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    thirdAtribute = parseInt(instruction.match(regex)[2]);
    interpretedComand.innerText = `${comand.toLowerCase()} | 0${firstAtribute} | 0${secondAtribute} | 0${thirdAtribute} `;

    routine(secondAtribute, thirdAtribute, comandSet[0].indexOf(comand.toLowerCase().trim()), firstAtribute, null);
}
function dataMovementValidation(instruction) {
    let regex = new RegExp(regExpCatchComand[1], "g");

    comand = instruction.match(regex)[0].trim();

    if (!comandSet[1].includes(comand.toLowerCase())) {
        interrupt();
        return;
    }

    regex = new RegExp(regExpCatchParamters[1], "g");
    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);

    interpretedComand.innerText = `${comand.toLowerCase()} | ${(firstAtribute < 10 ? "0" : "") + firstAtribute} | ${(secondAtribute < 10 ? "0" : "") + secondAtribute}`;
    dataMovementOperation();

}
function branchingValidation(instruction) {

    let regex = new RegExp(regExpCatchComand[2], "g");
    comand = instruction.match(regex)[0].trim();

    if (!comandSet[2].includes(comand.toLowerCase())) {
        interrupt();
        return;
    }

    regex = new RegExp(regExpCatchParamters[2], "g");
    firstAtribute = parseInt(instruction.match(regex)[0]);
    interpretedComand.innerText = `${comand.toLowerCase()} | ${firstAtribute < 9 ? 0 : ""}${firstAtribute} `;
    branchingOperation();
}

function machineCycleControlValidation(instruction){
    let regex = new RegExp(regExpCatchComand[3],"g");
    comand = instruction.match(regex)[0].trim();
    
    console.log(comand);
    if ( !comandSet[3].includes(comand.toLowerCase()) ) {
        interrupt();
        return;
    }
     
    machineCycleControlOperation();

}

