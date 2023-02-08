// Dom elements

// Display
const dataPreviousOperand = document.querySelector("[data-previous-operand]");
const dataCurrentOperand = document.querySelector("[data-current-operand]");

// Buttons
const numbersButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equals]"); // Si no tenemos que acceder ni a un id ni a una clase debemos usar el selector de atributos []

// Constructor
class Calculator {
  constructor(dataPreviousOperand,dataCurrentOperand) {
    this.previousOperand = dataPreviousOperand;
    this.currentOperand = dataCurrentOperand;

    this.allClear();
  }

  allClear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  deleteDigit() {
    // agrega el digito
    this.current = this.current.slice(0, -1);
  }

  appendDigit(digit) {
    // que no haya multiples puntos
    if (digit === "." && this.current.includes(".")) return;

    // que no haya multiples ceros
    if (digit === "0" && this.current === "0") return;

    // si el digito es "." y no hay ningun digito, añadir el 0
    if (digit === "." && this.current === "") this.current = "0";

    // al string lo conviero a numbero y luego a string para limpiar los ceros.
    this.current += digit; 
  }
  
  selectOperator(operation) {
    // si el operando actual esta vacio y la operacion es un "-" se lo agrego al digito.
     if (this.current === "" && operation === "-") {
      this.appendDigit(operation);
      return;
    } 

    if (this.current === "") return;

    // si el operador previo no esta vacio, calcula, por lo tanto, se van encadenando los calculos con los operadores.
    if (this.previous !== "") this.calculate();

    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  calculate() {
    let result;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
    }

    this.current = result.toString();
    this.operation = undefined;
    this.previous = "";
  }

  updateDisplay() {
    this.currentOperand.innerText = this.current;
    if (this.operation !== undefined) {
      this.previousOperand.innerText = `${this.previous} ${this.operation}`
    } else {
      this.previousOperand.innerText = "";
    }
  }
}

const calculator = new Calculator(dataPreviousOperand,dataCurrentOperand);

// Events
allClearButton.addEventListener("click", button => {
  calculator.allClear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
  calculator.deleteDigit();
  calculator.updateDisplay();
})

numbersButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendDigit(button.innerText);
    calculator.updateDisplay();
  })
})

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.selectOperator(button.innerText);
    calculator.updateDisplay();
  })
})

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
})