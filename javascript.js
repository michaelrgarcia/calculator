const calcButtons = document.querySelectorAll(".buttons div button");
const output = document.querySelector(".output");
let num1 = 0;
let operator = null;
let num2 = 0;
let expressionReset =  false;

calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            num1 = 0;            
            num2 = 0;
            operator = null;
            output.textContent = "0";
        }
        if (output.textContent.length < 11) {
            if (button.textContent === "DEL") {
                let sliced = output.textContent.slice(0, -1);
                if (output.textContent.length > 1) {
                    output.textContent = sliced;
                } else if (output.textContent.length === 1) {
                    output.textContent = "0"
                }
            }
            if (button.classList.contains("operator") && operator === null) {
                operator = button.textContent;
                button.classList.remove("unselected");
                button.classList.add("selected");
                console.log(operator)
            }
            if ((button.classList.contains("num") && output.textContent === "0") || (button.classList.contains("num") && operator !== null && num2 === 0) || button.classList.contains("num") && expressionReset === true) {
                output.textContent = button.textContent;
            } else if (button.classList.contains("num") && output.textContent !== "0") {
                output.textContent += button.textContent;
            }
            if (button.className === "equal" && operator !== null) {
                output.textContent = operate(operator, +num1, +num2);
                num1 = output.textContent;
                num2 = 0;
                operator = null;
                expressionReset = true;
            }
        }
        if (button.classList.contains("num")) {
            if (operator === null) {
                num1 = output.textContent
                console.log(num1);
                expressionReset = false;
            } else {
                const operators = document.querySelectorAll(".buttons div .operator")
                operators.forEach((button) => {
                    if (button.classList.contains("selected")) {
                        button.classList.remove("selected");
                        button.classList.add("unselected");
                    } 
                });
                num2 = output.textContent;
                console.log(num2);
            }
        }
    });
});

function equal() {

}

function operate(op, a, b) {
    if (op === "/" && a === 0 && b === 0) return "no";
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