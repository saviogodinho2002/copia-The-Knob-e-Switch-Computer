function readInstruction() { // analisador sintatico
    const currentAdress = document.getElementsByClassName("endereco")[programCounter];
    const textOfCurrentAdress = currentAdress.value;
    cxReadedComand.innerHTML = ` <p class="label inbox" >  ${textOfCurrentAdress} </p>`;

    let regex = new RegExp(regExpGeralValidation[0], "g");

    if (textOfCurrentAdress.match(regex) == null) {
        regex = new RegExp(regExpGeralValidation[1], "g");

        if (textOfCurrentAdress.match(regex) == null) {
            interrupt();
            return;
        }
    }

    /////
    regex = new RegExp(regExpCatchComand[0], "g");
    comand = textOfCurrentAdress.match(regex)[0];

    if (comandSet[0].includes(comand.toLowerCase())) {
        aritmeticValidation(textOfCurrentAdress);
        return;
    }

    regex = new RegExp(regExpCatchComand[1], "g");
    comand = textOfCurrentAdress.match(regex)[0];

    if (comandSet[1].includes(comand.toLowerCase())) {
        dataMovementValidation(textOfCurrentAdress);
        return;
    }

    regex = new RegExp(regExpCatchComand[2], "g");
    comand = textOfCurrentAdress.match(regex)[0];

    if (comandSet[2].includes(comand.toLowerCase())) {
        branchingValidation(textOfCurrentAdress);
        return;
    }

    regex = new RegExp(regExpCatchComand[3], "g");
    comand = textOfCurrentAdress.match(regex)[0];

    if (comandSet[3].includes(comand.toLowerCase())) {
        machineCycleControlValidation(textOfCurrentAdress)
        return;
    }

    interrupt();

}
function aritmeticValidation(instruction) {
    let regex = new RegExp(regExpParametersValidation[0], "g");

    // regex = new RegExp(regExpCatchParamters[0], "g");
    if (instruction.match(regex) == null) {
        interrupt();
    }

    regex = new RegExp(regExpCatchParamters[0], "g");

    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    thirdAtribute = parseInt(instruction.match(regex)[2]);

    setInterpretMicroInstruction(secondAtribute, thirdAtribute, comand.toLowerCase().trim(), thirdAtribute, 0);

    routine(secondAtribute, thirdAtribute, comandSet[0].indexOf(comand.toLowerCase().trim()), firstAtribute, null);
}
function dataMovementValidation(instruction) {

    const index = comandSet[1].indexOf(comand.toLowerCase());
    console.log(index)
    let regex = new RegExp(regExpParametersValidation[1][index], "g");

    if (instruction.match(regex) == null) {
        interrupt();
    }

    regex = new RegExp(regExpCatchParamters[1], "g");

    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);


    setInterpretMicroInstruction(
        index % 2 != 0 ? secondAtribute : 0, // registrador a
        0,          // registrador b
        index == 0 ? "add" : "load",         // aluintruction
        index != 1 ? firstAtribute : 0, //registrador de saida

        index % 2 == 0 ? secondAtribute : // endereco de memoria utilizado
            index == 3 ? 0 : firstAtribute
    );
    dataMovementOperation();

}
function branchingValidation(instruction) {

    let regex = new RegExp(regExpParametersValidation[2], "g");
   

    if (instruction.match(regex) == null) {
        interrupt();
    }

    regex = new RegExp(regExpCatchParamters[2], "g");

    firstAtribute = parseInt(instruction.match(regex)[0]);

    branchingOperation();
}

function machineCycleControlValidation(instruction) {
    let regex = new RegExp(("^\\s*" + comand.toLowerCase() + "\\s*$"), "g");

    if (!instruction.match(regex) == null) {
        interrupt();
        return;
    }

    machineCycleControlOperation();

}

function setInterpretMicroInstruction(aRegister, bRegister, aluOperation, outPutRegister, memoryAdress) {

    interpretedComand.innerText =
        `${aRegister.toString(2)} | ${bRegister.toString(2)} | ${(comandSet.flat().indexOf(aluOperation).toString(2))} | ${outPutRegister.toString(2)} | ${memoryAdress.toString(2)}

    `;

}

