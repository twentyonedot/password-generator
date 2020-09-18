/* Selectors */
const characterAmountNumber = document.getElementById('characterAmountNumber');
const characterAmountRange = document.getElementById('characterAmountRange');

const easyToSayEl = document.getElementById('easyToSay');
const easyToReadEl = document.getElementById('easyToRead');
const allCharactersEl = document.getElementById('allCharacters');

const includeUpperCaseEl = document.getElementById('upperCase');
const includeLowerCaseEl = document.getElementById('lowerCase');
const includeNumbersEl = document.getElementById('numbers');
const includeSymbolsEl = document.getElementById('symbols');

const form = document.getElementById('final-form');

const UPPER_CHAR_CODES = arrayLowToHigh(65, 90);

const LOWER_CHAR_CODES = arrayLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayLowToHigh(33, 47)
                  .concat(arrayLowToHigh(58, 64))
                  .concat(arrayLowToHigh(91, 96))
                  .concat(arrayLowToHigh(123, 126));
const passwordDisplay = document.getElementById('rand-pass');



const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

const generateIcon = document.getElementById('pwd-gen-icon');
const copyIcon = document.getElementById('copy-icon');

const pwdStrength1 = document.getElementById('pwd-strength-one');
const pwdStrength2 = document.getElementById('pwd-strength-two');
const pwdStrength3 = document.getElementById('pwd-strength-three');
const pwdStrength4 = document.getElementById('pwd-strength-four');
const pwdStrength5 = document.getElementById('pwd-strength-five');

const divShowHide = document.getElementsByClassName('alert');
const closeButton = document.getElementsByClassName('close-btn');

const divS1 = document.getElementById('pwd-strength-one');
const divS2 = document.getElementById('pwd-strength-two');
const divS3 = document.getElementById('pwd-strength-three');
const divS4 = document.getElementById('pwd-strength-four');
const divS5 = document.getElementById('pwd-strength-five');



/* EventListeners */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    characterAmount = characterAmountNumber.value;
    includeUpperCase = includeUpperCaseEl.checked;
    includeLowerCase = includeLowerCaseEl.checked;
    includeNumbers = includeNumbersEl.checked;
    includeSymbols = includeSymbolsEl.checked;
    const password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
    passwordDisplay.innerText = password;
});

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

characterAmountNumber.addEventListener('submit', listen);
characterAmountRange.addEventListener('input', listen);

easyToSayEl.addEventListener('change', (e) =>{
    includeNumbersEl.disabled = true; 
    includeSymbolsEl.disabled = true;
    includeUpperCaseEl.checked = true;
    includeLowerCaseEl.checked = true;
    includeNumbersEl.checked = false;
    includeSymbolsEl.checked = false;
    listen();
});
easyToReadEl.addEventListener('change', listen);
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

generateBtn.addEventListener('click', ()=>{
    listen();
    passStrength();
});
copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.innerText.length != 0){
        cpyToClip();
        divShowHide[0].classList.remove('hide');
        divShowHide[0].classList.add('show');
        setTimeout(function(){
            divShowHide[0].classList.add('hide');
            divShowHide[0].classList.remove('show');
        }, 3000);
    }
});

generateIcon.addEventListener('click', listen);
copyIcon.addEventListener('click', ()=>{
    if(passwordDisplay.innerText.length != 0){
        cpyToClip();
        divShowHide[0].classList.remove('hide');
        divShowHide[0].classList.add('show');
        closeButton[0].addEventListener('click', ()=>{
            divShowHide[0].classList.add('hide');
            divShowHide[0].classList.remove('show');
        })
        closeButton[0].addEventListener('click', ()=>{
            divShowHide[0].classList.add('hide');
            divShowHide[0].classList.remove('show');
        })
        setTimeout(function(){
            divShowHide[0].classList.add('hide');
            divShowHide[0].classList.remove('show');
        }, 3000);
    }
});



/* Functions */
function syncCharacterAmount(e){
    const value = e.target.value;

    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}


function listen(){
    characterAmount = characterAmountNumber.value;
    includeUpperCase = includeUpperCaseEl.checked;
    includeLowerCase = includeLowerCaseEl.checked;
    includeNumbers = includeNumbersEl.checked;
    includeSymbols = includeSymbolsEl.checked;
    const password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
    passwordDisplay.innerHTML = password;
}


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
        specialcase = specialcase.replace(/I/g, 'J').replace(/l/g, 'm').replace(/L/g, 'M').replace(/i/g, 'j').replace(/1/g, '2').replace(/0/g,'9').replace(/o/g,'p').replace(/O/g, 'P');
        let ans = colouredFont(specialcase);
        return ans;
    }
    let res = passwordCharacters.join('');
    return colouredFont(res);
}

function arrayLowToHigh(low, high){
    const array =[];
    for(let i = low; i <= high; i++){
        array.push(i);
    }
    return array;
}

function cpyToClip(){
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.innerText;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}

function colouredFont(res){
    if(res.length == 0){
        return res;
    }
    let alpha = res.match(/[a-zA-Z]/g);
    let nums = res.match(/[0-9]/g);

    let str = "";
    let i = 0;
    str = res.replace(/[a-zA-Z]/g, ()=>{
        return `<span class="blaaack">${alpha[i++]}</span>`
    });
    let result = "";
    let j = 0;
    result = str.replace(/[0-9]/g, ()=>{
        return `<span class="reed">${nums[j++]}</span>`
    });
    return result;
}

function passStrength(){
    const pass = passwordDisplay.innerText;
    const lowerAlpha = pass.match(/[a-z]/);
    const upperAlpha = pass.match(/[A-Z]/);
    const numb = pass.match(/[0-9]/);
    const sym = pass.match(/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/);

    if(lowerAlpha!==null && upperAlpha!==null && numb!==null && pass.length > 12 && sym!==null){
        divS1.classList.add('green');
        divS2.classList.add('green');
        divS3.classList.add('green');
        divS4.classList.add('green');
        divS5.classList.add('green');
    }
    else{
        divS1.classList.remove('green');
        divS2.classList.remove('green');
        divS3.classList.remove('green');
        divS4.classList.remove('green');
        divS5.classList.remove('green');
    }
    console.log(pass.length);
    if(pass.length < 7){
        divS1.classList.add('red');
    }
    else{
        divS1.classList.remove('red');
    }
}

