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

    console.log(num, typeof num);
    return num.toExponential(maxDigits - 5);

}

let operand1 = 0;
let operator;
let operand2 = 0;
let afterEquals = false;

function operate(operand1, operator, operand2) {
    switch (operator) {
        case ("+"):
            return add(operand1, operand2);
        case ("-"):
            return subtract(operand1, operand2);
        case ("x"):
            return multiply(operand1, operand2);
        case ("÷"):
            return divide(operand1, operand2);
        default:
            break;
    }
}

let buttons = 
[
    ["(", ")", "AC", "DEL"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
];

let operators = [
    '+', '-', 'x', '÷'
];

const calculator = document.querySelector(".calculator");
const calcButtons = document.querySelector(".buttons");
function createButtons() {
    for (let i = 0; i < buttons.length; i++) {
        let row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < buttons[i].length; j++) {
            let button = document.createElement("div");
            button.classList.toggle("calc-button");
            button.textContent = buttons[i][j];
            row.append(button);
        }
        calcButtons.append(row);
    }
}

createButtons();

const displayArea = document.querySelector(".display-curr");
const displayPrevArea = document.querySelector(".display-prev");

calcButtons.addEventListener("click", (e) => {
    const buttonPressed = e.target.textContent;
    if (!e.target.classList.contains("calc-button")) {
        return;
    }
    performClick(buttonPressed);
});

function evaluateExpression() {
    let result = operate(operand1, operator, operand2);
    displayArea.textContent = result;
    operand1 = +result;
    operator = null;
    operand2 = 0;
}

let isAfterOperation = false;

function performClick(buttonPressed) {
    if (buttonPressed >= '0' && buttonPressed <= '9') {
        if (afterEquals) {
            reset();
        }
        operand2 *= 10;
        operand2 += +buttonPressed;

        if (displayArea.textContent.split('0').length - 1 === displayArea.textContent.length) {
            displayArea.textContent = "";
        }

        if (isAfterOperation) {
            displayArea.textContent = buttonPressed;
            isAfterOperation = false;
        } else {
            displayArea.textContent += buttonPressed;
        }
    } else if (operators.includes(buttonPressed)) {
        
        afterEquals = false;
        if (operator === undefined || operator === null) {
            operator = '+';
        }
        if (isAfterOperation) {
            displayPrevArea.textContent = displayPrevArea.textContent.slice(0, -1);
        } else {
            evaluateExpression();
            displayPrevArea.textContent = displayArea.textContent;
            isAfterOperation = true;
        }
        displayPrevArea.textContent += buttonPressed;
        operator = buttonPressed;
    } else if (buttonPressed === '=') {
        displayPrevArea.textContent += displayArea.textContent;
        displayPrevArea.textContent += '=';
        evaluateExpression();
        operand2 = operand1;
        operand1 = 0;
        operator = null;
        afterEquals = true;
    } else if (buttonPressed === 'AC') {
        reset();
    }
}

function reset() {
    operand1 = 0;
    operator = null;
    displayArea.textContent = '0';
    displayPrevArea.textContent = '0';
    afterEquals = false;
    isAfterOperation = false;
}