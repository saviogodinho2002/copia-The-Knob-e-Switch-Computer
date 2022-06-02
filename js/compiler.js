
function readInstruction() { // analisador sintatico
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
    interrupt();

}
function aritmeticValidation(instruction) {//TODO: passar trabalho para a operation
    let regex = new RegExp("([a-zA-Z]{2,3})", "g");
    comand = instruction.match(regex)[0];

    if (!comandSet[0].includes(comand.toLowerCase())) {
        interrupt();
        return;
    }

    regex = new RegExp("([0]*[0-3]{1})", "g");

    firstAtribute = parseInt(instruction.match(regex)[0]);
    secondAtribute = parseInt(instruction.match(regex)[1]);
    thirdAtribute = parseInt(instruction.match(regex)[2]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | 0${firstAtribute} | 0${secondAtribute} | 0${thirdAtribute} </p>`;

    routine(secondAtribute, thirdAtribute, comandSet[0].indexOf(comand.toLowerCase().trim()), firstAtribute, null);
}
function dataMovementValidation(instruction) {
    let regex = new RegExp("([a-zA-Z]{3,5})", "g");

    comand = instruction.match(regex)[0].trim();

    if (!comandSet[1].includes(comand.toLowerCase())) {
        interrupt();
        return;
    }
    regex = null;
    const regexExps = ["([a-zA-Z]{4}\\s+R[0-3]\\s+[0-9]{1,2})", "[a-zA-Z]\\s+([0-9]{1,2}\\s+R[0-3])", "([a-zA-Z]{3,4}\\s+R[0-3]\\s+R[0-3])", "([a-zA-Z]{3}\\s+R[0-3]\\s+[0-9]{1,2})"];


    for (let i = 0; i < 4; i++) {
        regex = new RegExp(regexExps[i], "g");
        if (instruction.match(regex) != null) {
            regex = new RegExp("([0-9]{1,2})", "g");
            firstAtribute = parseInt(instruction.match(regex)[0]);
            secondAtribute = parseInt(instruction.match(regex)[1]);

            cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | ${(firstAtribute < 10 ? "0" : "") + firstAtribute} | ${(secondAtribute < 10 ? "0" : "") + secondAtribute} </p>`;
            dataMovementOperation();
            return;
        }
    }

    interrupt();
    return;
}
function branchingValidation(instruction) {

    let regex = new RegExp("([a-zA-Z]{3,6})", "g");
    comand = instruction.match(regex)[0].trim();

    if (!comandSet[2].includes(comand.toLowerCase())) {
        interrupt();
        return;
    }

    regex = new RegExp("([0-9]{1,2})", "g");
    firstAtribute = parseInt(instruction.match(regex)[0]);
    cxInterpretedComand.innerHTML = ` <p class="label inbox" > ${comand.toLowerCase()} | ${firstAtribute < 9 ? 0 : ""}${firstAtribute} </p>`;
    branchingOperation();
}

