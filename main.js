let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');
let output = document.getElementById('output');
let equal = document.getElementById('equals');
let clear = document.getElementById('clear');
let reset = document.getElementById('reset');
let decimalPoint = document.getElementById('decimal');

let number1 = '';
let number2 = '';
let operator = '';
let step = 1;

reset.addEventListener('click', allClear);
equal.addEventListener('click', getEquals);
equal.addEventListener('click', newVal);
clear.addEventListener('click', deleteElement);
window.addEventListener('keydown', keyboardInputs);


function getNumber(number) {
    const currentNumber = (step === 1) ? number1 : number2;
    if (number === '.' && currentNumber.includes('.')) return;

    number = String(number)

    if(equal.disabled === true){
        allClear();
        equal.disabled = false;
    }

    if (step === 1) {
        number1 += number;
        output.textContent += number;
    }
    if (step === 2) {
        number2 += number;
        output.textContent += number;
    }
    console.log(number1);
    console.log(number2);
}

function getOperation(operation) {

    if (number1 === '') return;

    if (step === 2) {
        getEquals();
    }

    if (step === 1) {
        operator = operation;
        output.textContent += operation;
        console.log(operation);
        step++;
    }
}


function getEquals() {
    if (number1 === '' || operator === '' || number2 === '') return;

    solution = String(calculate(number1, number2, operator));
    if (solution === 'undefined') return;

    number1 = solution;
    number2 = '';
    output.textContent = number1;
    console.log(number1);
    step--;
}


function deleteElement() {
    const lastElement = output.textContent.at(-1);
    output.textContent = output.textContent.toString().slice(0, -1);

    if (lastElement === '+' || lastElement === '-' || lastElement === '/' || lastElement === '*') {
        operator = '';
        step--;
    }
    else if (step === 2) {
        number2 = number2.slice(0, -1);
    }
    else if (step === 1) {
        number1 = number1.slice(0, -1);
    }
}


function allClear() {
    output.textContent = '';
    number1 = '';
    number2 = '';
    operator = '';
    step = 1;
    equal.disabled = false;
}

function newVal(){
    equal.disabled = true
}

function keyboardInputs(e){
    if(e.key >=0 && e.key<=9) getNumber(e.key);
    if(e.key === '.') getNumber(e.key);
    if(e.key === 'Backspace') deleteElement();
    if(e.key === '=' ||  e.key === 'Enter') getEquals();
    if(e.key === '/'|| e.key === '*'|| e.key === '-'||e.key === '+') getOperation(e.key);

}


function calculate(a, b, operator) {

    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+': return a + b;

        case '-': return a - b;

        case '*': return a * b;

        case '/':
            if (b === 0) {
                alert('Cant divide by zero');
                break;

            }
            else {
                return (a / b);
            }
    }
}