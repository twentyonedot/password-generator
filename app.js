const characterAmountNumber = document.getElementById('characterAmountNumber');
const characterAmountRange = document.getElementById('characterAmountRange');
const easyToSayEl = document.getElementById('easyToSay');
const easyToReadEl = document.getElementById('easyToRead');
const allCharactersEl = document.getElementById('allCharacters');

const includeUpperCaseEl = document.getElementById('upperCase')
const includeLowerCaseEl = document.getElementById('lowerCase')
const includeNumbersEl = document.getElementById('numbers')
const includeSymbolsEl = document.getElementById('symbols')
const form = document.getElementById('final-form');
const UPPER_CHAR_CODES = arrayLowToHigh(65, 90);

const LOWER_CHAR_CODES = arrayLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayLowToHigh(33, 47)
                  .concat(arrayLowToHigh(58, 64))
                  .concat(arrayLowToHigh(91, 96))
                  .concat(arrayLowToHigh(123, 126));
const passwordDisplay = document.getElementById('rand-pass');

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);


function syncCharacterAmount(e){
    const value = e.target.value;

    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    characterAmount = characterAmountNumber.value;
    includeUpperCase = includeUpperCaseEl.checked;
    includeLowerCase = includeLowerCaseEl.checked;
    includeNumbers = includeNumbersEl.checked;
    includeSymbols = includeSymbolsEl.checked;
    const password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
    passwordDisplay.value = password;
});

characterAmountNumber.addEventListener('input', listen);
characterAmountRange.addEventListener('input', listen);

function listen(){
    characterAmount = characterAmountNumber.value;
    includeUpperCase = includeUpperCaseEl.checked;
    includeLowerCase = includeLowerCaseEl.checked;
    includeNumbers = includeNumbersEl.checked;
    includeSymbols = includeSymbolsEl.checked;
    const password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
    
    passwordDisplay.value = password;
}


easyToSayEl.addEventListener('change', (e) =>{
    includeNumbersEl.disabled = true; 
    includeSymbolsEl.disabled = true;
    includeUpperCaseEl.checked = true;
    includeLowerCaseEl.checked = true;
    includeNumbersEl.checked = false;
    includeSymbolsEl.checked = false;
    listen();
});

/* easyToReadEl.addEventListener('change' ) */

allCharactersEl.addEventListener('change', (e) => {
    includeNumbersEl.disabled = false; 
    includeSymbolsEl.disabled = false;
    includeUpperCaseEl.checked = true;
    includeLowerCaseEl.checked = true;
    includeNumbersEl.checked = true;
    includeSymbolsEl.checked = true;
    listen();
})

includeUpperCaseEl.addEventListener('click', listen);
includeLowerCaseEl.addEventListener('click', listen);
includeNumbersEl.addEventListener('click', listen);
includeSymbolsEl.addEventListener('click', listen);
easyToReadEl.addEventListener('change', listen);



function generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols){
    let charCodes = [];
    if(includeUpperCase) {charCodes = charCodes.concat(UPPER_CHAR_CODES)};
    
    if(includeLowerCase) {charCodes = charCodes.concat(LOWER_CHAR_CODES)};
    if(includeNumbers) {charCodes = charCodes.concat(NUMBER_CHAR_CODES)};
    if(includeSymbols) {charCodes = charCodes.concat(SYMBOL_CHAR_CODES)};
    const passwordCharacters = [];
    for(let i = 0; i < characterAmount; i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    let specialcase = '';
    
    
    if(easyToReadEl.checked === true){

        specialcase = passwordCharacters.join('');
        console.log(specialcase);
        specialcase = specialcase.replace(/I/g, '').replace(/l/g, '').replace(/L/g, '').replace(/i/g, '').replace(/1/g, '').replace(/0/g,'').replace(/o/g,'').replace(/O/g, '').replace(/|/g, '');
        console.log(specialcase);
        return specialcase;
    }
    return passwordCharacters.join('');
}

function arrayLowToHigh(low, high){
    const array =[];
    for(let i = low; i <= high; i++){
        array.push(i);
    }
    return array;
}

