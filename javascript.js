let num1 = 0;
let operator = null;
let num2 = 0;
const output = document.querySelector(".output");
const calcButtons = document.querySelectorAll(".buttons div button");

calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            clear();
            num1 = 0;
            output.textContent = "0";
        }
        if (output.textContent.length < 11) {
            if (button.textContent === "DEL") del();
            if (button.className === "operator" && operator === null) {
                operator = button.textContent;
                console.log(operator)
            }
            if ((button.classList.contains("num") && output.textContent === "0") || button.classList.contains("num") && operator !== null && num2 === 0) {
                output.textContent = button.textContent
            } else if (button.classList.contains("num") && output.textContent !== "0") {
                output.textContent += button.textContent;
            }
            if (button.className === "equal" && operator !== null) {
                output.textContent = operate(operator, +num1, +num2);
                clear();
            }
            

    /*         
            if (button.className === "equal" && operator !== null && num1 !== null) {
                output.textContent = operate(operator, +num1, +num2);  
                operator = null;
                num1 = null;
                num2 = null;

            }
    */
        }
        if (button.classList.contains("num")) {
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

function clear() {
    num2 = 0;
    operator = null;
}

function del() {
    let sliced = output.textContent.slice(0, -1);
    if (output.textContent.length > 1) {
        output.textContent = sliced;
    } else if (output.textContent.length === 1) {
        output.textContent = "0"
    }
}

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