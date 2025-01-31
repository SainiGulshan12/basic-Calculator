let display = document.getElementById('input-box');  //Stored the ID of input field in a variable.
let currentInput = '';   // To store the current input string
let memory = 0; // To store the memory value

//Remove extra spaces
function delExtraSpace(){
    currentInput =currentInput.trim(); 
}

// Clear the display and reset the current input
function clearDisplay() {
    currentInput = '';
    display.value = currentInput;   // Display the result
}

 // Remove the last character
function delDisplay(){
    currentInput = currentInput.slice(0,-1);
    display.value = currentInput;
}

// Append a number to the current input
function appendNumber(number) {
    delExtraSpace();
    currentInput += number;
    display.value = currentInput;
}

// Append an operator (+, -, *, /) to the current input
function operators(operat) {
    delExtraSpace();
    if (currentInput === '' || /[+\-*/]$/.test(currentInput.trim())) {
        return;
    }
    currentInput += '' +operat+ '';
    display.value = currentInput;
}

// Evaluate the expression entered by the user
function equal() {
    try {
        delExtraSpace();
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
    }
    catch(error){
        display.value = 'Error';    // If there's an error in the expression, display "Error"
        currentInput = '';  // Reset the current input
    }
}

// Memory functions
function memoryAdd() {
    delExtraSpace();
    memory += parseFloat(currentInput) || 0;    // Add the current input to memory (default to 0 if invalid)
    currentInput = '';      
    display.value = 'M+';
}

function memorySubtract() {
    delExtraSpace();
    memory -= parseFloat(currentInput) || 0;    // Subtract the current input to memory (default to 0 if invalid)
    currentInput = '';
    display.value = 'M-';
}

function memoryRecall() {
    currentInput = memory.toString();   // Set the current input to the memory value 
    display.value = currentInput;       //Display it in the input box
}

function memoryClear() {
    memory = 0;     //Clear memory
    display.value = 'MC';
}

// Keyboard input handling 

document.addEventListener('keydown',(event)=>{
    let key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    }
    else if(key === '+' ||key === '-'||key === '*'||key === '/'){
        operators(key);
    }
    else if(key === 'Enter'){
        equal(key);
    }
    else if(key === 'Backspace'){
        delDisplay(key);
    }
    // If 'm' is pressed, recall memory
    else if(key.toLowerCase() === 'm'){
        memoryRecall(key);
    }
    else if(key === 'Escape'){
        clearDisplay(key);
    }
});