function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operand1 = 0;
let operator;

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
    ["(", ")", "%", "AC"],
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

const displayArea = document.querySelector(".display");
calcButtons.addEventListener("click", (e) => {
    const buttonPressed = e.target.textContent;
    if (!e.target.classList.contains("calc-button")) {
        return;
    }
    if (buttonPressed >= '0' && buttonPressed <= '9') {
        if (operator === undefined || operator === null) {
            operand1 *= 10;
            operand1 += +buttonPressed;
        } else {
            if (operators.includes(displayArea.textContent.at(-1))) {
                displayArea.textContent = "";
            }
        }
        displayArea.textContent += buttonPressed;
    } else if (operators.includes(buttonPressed)) {
        if (operators.includes(displayArea.textContent.at(-1))) {
            displayArea.textContent = displayArea.textContent.slice(0, -1);
        }
        displayArea.textContent += buttonPressed;
        operator = buttonPressed;
    } else if (buttonPressed === '=') {
        let operand2 = +displayArea.textContent;
        let result = operate(operand1, operator, operand2);
        console.log(operand1, operator, operand2, result);
        displayArea.textContent = result;
        operand1 = result;
        operator = null;
    }
});