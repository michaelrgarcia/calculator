let num1 = null;
let operator = null;
let num2 = null;
let reset = false;
const output = document.querySelector(".output");
const calcButtons = document.querySelectorAll(".buttons div button");

calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            num1 = null;
            num2 = null;
            operator = null;
            output.textContent = "0";
        } 
        if (output.textContent.length < 11) {
            let sliced = output.textContent.slice(0, -1);
            if (button.textContent === "DEL" && output.textContent.length > 1) {
                output.textContent = sliced;
            } else if (button.textContent === "DEL" && output.textContent.length === 1) {
                output.textContent = "0"
            }
            if (button.className === "operator") {
                operator = button.textContent;
                button.style.background = "black"
                reset = true;
            } 
                if ((button.classList.contains("num") && output.textContent === "0") || reset === true) {
                    output.textContent = button.textContent;
                    reset = false;
                } else if (button.classList.contains("num") && output.textContent.length >= 1)  {
                    output.textContent += button.textContent;
                }  
            if (button.className === "equal" && operator !== null && num1 !== null) {
                output.textContent = operate(operator, +num1, +num2);  
                operator = null;
                num1 = null;
                num2 = null;

            }
            if (operator === null) {
                num1 = output.textContent
                console.log(num1);
            } else {
                num2 = output.textContent;
                console.log(num2);
            }
        }
    });
});

function operate(op, a, b) {
    if (op == "+") return add(a, b);
    if (op == "-") return subtract(a, b);
    if (op == "*") return multiply(a, b);
    if (op == "/") return divide(a, b);
}

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