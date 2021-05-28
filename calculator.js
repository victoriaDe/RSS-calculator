const numbers = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const errorMessage = "ERROR";

numbers.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperationFunction(button.innerText);
        calculator.updateDisplay();
    })
});
equalsBtn.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});
clearBtn.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});
deleteBtn.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});

class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === errorMessage) {
            this.clear();
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    appendNumber(number) {
        if (isNaN(this.currentOperand) && this.currentOperand !== "." && !this.currentOperand.startsWith("-")) {
            this.clear();
        }
        if (number === "." && this.currentOperand.toString().includes(".")) return;
        if (this.currentOperand.toString().length < 16) {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperationFunction(operation) {
        if (this.currentOperand === "" && operation !== "√" && operation !== "-") return;
        if (this.currentOperand === errorMessage) {
            this.clear();
        }

        if (this.operation === "√" && operation === "-" && this.previousOperand === "") {

        } else {
            this.compute();
        }

        if ((this.operation === "*" || this.operation === "/" || this.operation === "√" || this.operation === "^") && operation === "-") {
            this.currentOperand = "-";
        } else {
            this.operation = operation;
            this.previousOperand = this.currentOperand === errorMessage ? "" : this.currentOperand;
            this.currentOperand = "";
        }
    }

    compute() {
        let computation;
        let previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (this.operation !== "√" && isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = isNaN(previous) ? 0 : previous + current;
                break;

            case "-":
                computation = isNaN(previous) ? -current : previous - current;
                break;

            case "*":
                computation = isNaN(previous) ? 0 : previous * current;
                break;

            case "/":
                if (current === 0 || isNaN(previous)) {
                    computation = errorMessage;
                } else {
                    computation = previous / current;
                }
                break;

            case "√":
                if (!previous) {
                    previous = 1;
                }
                if (isNaN(current) || current < 0) {
                    computation = errorMessage;
                } else {
                    computation = previous * Math.sqrt(current);
                }
                break;

            case "^":
                !previous ? computation = 0 : computation = Math.pow(previous, current);
                break;

            default:
                return;
        }

        if (computation.toString().length > 10) {
            if (computation.toString().includes(".")) {
                computation = Number(computation.toString().slice(0, 11));
            } else {
                computation = Number(computation.toString().slice(0, 10));
            }
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        if (this.operation != null) {
            if (isNaN(this.previousOperand)) {
                this.previousOperandText.innerText = `${this.previousOperand}`;
            } else {
                this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
            }
        } else {
            this.previousOperandText.innerText = "";
        }
    }

}

const calculator = new Calculator(previousOperandText, currentOperandText);

