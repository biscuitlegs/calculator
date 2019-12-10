function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (true) {
        case operator === '+':
            return add(num1, num2);
        case operator === '-':
            return subtract(num1, num2);
        case operator === '*':
            return multiply(num1, num2);
        case operator === '/':
            return divide(num1, num2);
    }
}

function updateDisplay(e) {
    if (e.target.id === '=') {

        if ((operate(operatorValue, +firstNumValue, +secondNumValue)) === Infinity) {
            clearValues();
            display.textContent = 'Can\'t crash me!'
            return;
        };

        if (!secondNumValue) {
            clearValues();
            display.textContent = 'ERROR';
            return;
        }

        operationResult = roundNumber(operate(operatorValue, +firstNumValue, +secondNumValue));
        display.textContent = operationResult;
        
        firstNumValue = '';
        secondNumValue = '';
        operatorValue = '';
        displayValue = '';
        return;
    }

    if (e.target.id === '.' && displayValue.includes('.')) {
        return;
    }
    display.textContent += `${e.target.id}`;
    displayValue = display.textContent;
    console.log(`displayValue: ${displayValue}`);
}

function getFirstNum() {
    const operatorsCheck = /[+*/-]/g;
    const currentCalculation = displayValue.slice(0, -1);
   
    if (operatorsCheck.test(currentCalculation) === true) {
        const secondNum = displayValue.slice(finalOperatorIndex +1 , -1);

        if (operate(previousOperator, +firstNumValue, +secondNum) === Infinity) {
            display.textContent = 'Can\'t crash me!'
            return;
        }
        firstNumValue = operate(previousOperator, +firstNumValue, +secondNum);
        finalOperatorIndex = displayValue.lastIndexOf(operatorValue);
        console.log(`firstNumValue: ${firstNumValue}`, `finalOperatorIndex: ${finalOperatorIndex}`);
        return;
    }
    finalOperatorIndex = displayValue.indexOf(operatorValue);
    firstNumValue = displayValue.slice(0, finalOperatorIndex);
    console.log(`firstNumValue: ${firstNumValue}`, 'finalOperatorIndex:' + finalOperatorIndex);
}

function getSecondNum(e) {
    finalOperatorIndex = displayValue.lastIndexOf(operatorValue);
    secondNumValue = displayValue.slice(finalOperatorIndex + 1, displayValue.length);
    console.log(`secondNumValue: ${secondNumValue}`);
}

function getOperator(e) {
    previousOperator = operatorValue;
    operatorValue = e.target.id;
    console.log(`operatorValue: ${operatorValue}`, `previousOperator: ${previousOperator}`);
}

function clearValues() {
    firstNumValue = '';
    secondNumValue = '';
    operatorValue = '';
    displayValue = '';
    display.textContent = '';
}

function roundNumber(num) {
    return Math.round((num*100000))/100000;
}


let finalOperatorIndex;
let operationResult;
let displayValue;
let firstNumValue;
let secondNumValue;
let previousOperator;
let operatorValue;
const display = document.querySelector('.display-content')
const displayContent = document.querySelector('.display-content').textContent;


const numButtons = document.querySelectorAll('.num');
numButtons.forEach(button =>
    button.addEventListener('click', updateDisplay));

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button =>
    button.addEventListener('click', updateDisplay));
operatorButtons.forEach(button =>
    button.addEventListener('click', getOperator));
operatorButtons.forEach(button =>
    button.addEventListener('click', getFirstNum));


const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', getSecondNum);
equalsButton.addEventListener('click', updateDisplay);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearValues);

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', updateDisplay);