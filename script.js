let maxDigits = 14;

function add(a, b) {
    return round(a + b);
}

function subtract(a, b) {
    return round(a - b);
}

function multiply(a, b) {
    return round(a * b);
}

function divide(a, b) {
    return round(a / b);
}

function round(num) {
    let strNum = String(num);
    if (strNum.length <= maxDigits) {
        return num;
    }

    return num.toExponential(maxDigits - 5);
}

let operand1 = 0;
let operator = '+';
let operand2 = 0;
let afterEquals = false;

function operate(operand1, operator, operand2) {
    switch (operator) {
        case ('+'):
            return add(operand1, operand2);
        case ('-'):
            return subtract(operand1, operand2);
        case ('x'):
            return multiply(operand1, operand2);
        case ('÷'):
            return divide(operand1, operand2);
        default:
            break;
    }
}

let buttons = 
[
    ['(', ')', 'AC', 'DEL'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', 'x'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+']
];

let operators = [
    '+', '-', 'x', '÷'
];

const calculator = document.querySelector('.calculator');
const calcButtons = document.querySelector('.buttons');
function createButtons() {
    for (let i = 0; i < buttons.length; i++) {
        let row = document.createElement('div');
        row.classList.toggle('row');
        for (let j = 0; j < buttons[i].length; j++) {
            let button = document.createElement('div');
            button.classList.toggle('calc-button');
            button.textContent = buttons[i][j];
            if (buttons[i][j] === 'AC' || buttons[i][j] === 'DEL') {
                button.classList.toggle('del-button');
            } else if (operators.includes(buttons[i][j])) {
                button.classList.toggle('operator-button');
            } else if (buttons[i][j] === '=') {
                button.classList.toggle('equals-button');
            } else if (buttons[i][j] === '(' || buttons[i][j] === ')') {
                button.classList.toggle('parentheses-button');
            }
            row.append(button);
        }
        calcButtons.append(row);
    }
}

createButtons();

const displayArea = document.querySelector('.display-curr');
const displayPrevArea = document.querySelector('.display-prev');

calcButtons.addEventListener('click', (e) => {
    const buttonPressed = e.target.textContent;
    if (!e.target.classList.contains('calc-button')) {
        return;
    }
    performClick(buttonPressed);
});

function evaluateExpression() {
    console.log(parseFloat(operand1), parseFloat(operand2));
    hasDecimal = false;
    currDecimal = 1;
    let result = operate(parseFloat(operand1), operator, parseFloat(operand2));
    displayArea.textContent = result;
    operand1 = parseFloat(result);
    operator = null;
    operand2 = 0;
}

function hasLeadingZeros(string) {
    return string.split('0').length - 1 === string.length;
}

let isAfterOperation = false;
let hasDecimal = false;
let currDecimal = 1;

function performClick(buttonPressed) {
    if (buttonPressed >= '0' && buttonPressed <= '9') {
        if (afterEquals) {
            reset();
        }
        if (hasDecimal) {
            operand2 += currDecimal * (+buttonPressed);
            currDecimal *= 0.1;
        } else {
            operand2 *= 10;
            operand2 += +buttonPressed;
        }

        if (hasLeadingZeros(displayArea.textContent)) {
            displayArea.textContent = '';
        }

        if (isAfterOperation) {
            displayArea.textContent = buttonPressed;
            isAfterOperation = false;
        } else {
            displayArea.textContent += buttonPressed;
        }
    } else if (operators.includes(buttonPressed)) {
        if (isAfterOperation) {
            displayPrevArea.textContent = displayPrevArea.textContent.slice(0, -1);
        } else if (afterEquals) {
            displayPrevArea.textContent = displayArea.textContent;
            displayArea.textContent = '0';
            operand1 = operand2;
            operand2 = 0;
        } else {
            evaluateExpression();
            displayPrevArea.textContent = displayArea.textContent;
            isAfterOperation = true;
        }
        afterEquals = false;
        displayPrevArea.textContent += buttonPressed;
        operator = buttonPressed;
    } else if (buttonPressed === '=') {
        if (hasLeadingZeros(displayPrevArea.textContent)) {
            displayPrevArea.textContent = '';
        }
        displayPrevArea.textContent += displayArea.textContent;
        displayPrevArea.textContent += '=';
        evaluateExpression();
        operand2 = operand1;
        operand1 = 0;
        operator = null;
        afterEquals = true;
    } else if (buttonPressed === 'AC') {
        reset();
    } else if (buttonPressed === '.' && !hasDecimal) {
        if (afterEquals) {
            reset();
        }
        hasDecimal = true;
        currDecimal *= 0.1;
        if (hasLeadingZeros(displayArea.textContent)) {
            displayArea.textContent = '0';
        }
        isAfterOperation = false;
        displayArea.textContent += '.';
    }
}

function reset() {
    operand1 = 0;
    operand2 = 0;
    operator = '+';
    displayArea.textContent = '0';
    displayPrevArea.textContent = '0';
    afterEquals = false;
    isAfterOperation = false;
    hasDecimal = false;
    currDecimal = 1;
}

document.addEventListener('keypress', (e) => {
    for (let row of buttons) {
        for (let button of row) {
            if (button === e.key) {
                performClick(button);
                break;
            }
        }
    }
    if (e.key === '*') {
        performClick('x');
    } else if (e.key === '/') {
        performClick('÷');
    } else if (e.key === 'Enter') {
        performClick('=');
    }
});