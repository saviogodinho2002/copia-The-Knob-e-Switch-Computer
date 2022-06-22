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

const startOrStopButton = document.getElementById("button-start");

let stepsCallBacks = [];

let lastRegisterA = 0;
let lastRegisterB = 0;
let lastAluOperation = 0;

let comand;

let programCounter = 0;
const programCounterText = document.querySelector(".program-counter");
const cxReadedComand = document.querySelector("#caixa-comando-lido");
const interpretedComand = document.querySelector("#comando-interpretado");
const cxProgramCounter = document.getElementsByClassName("pc")[0];

const selectInterval = document.getElementById("time-select");

let routineCallback = 0;
let incrementProgramCounterCallBack = 0;

let time = 1000;
let timeInterval = (time*10) / 5;

let toMemory = false;

function changeInterval(){
    time = parseInt(selectInterval.options[selectInterval.selectedIndex].value);
    timeInterval = Math.floor((time*10) / 5);    
}

