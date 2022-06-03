
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

    cxReadedComand.value = 0;
    
}
function verifyIfVoidString(element) {
    element.value = element.value == "" ? 0 : element.value;
}

function gerateMemAdress() {
    let htmlFirstSection = "";
    let htmlSecondSection = "";
   
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