/* Styling slider */
const slider = document.getElementById('characterAmountRange')
const numb = document.getElementById('characterAmountNumber')
slider.addEventListener('input',()=>{
    let x = slider.value;
    let color = `linear-gradient(90deg, rgb(38,200,64) ${2*x}%, rgb(23,23,23) ${2*x}%)`;
    slider.style.background = color;
})
numb.addEventListener('input',()=>{
    let x = numb.value;
    let color = `linear-gradient(90deg, rgb(38,200,64) ${2*x}%, rgb(23,23,23) ${2*x}%)`;
    slider.style.background = color;
})
/*  */



/* Selectors */
const pwdDisplay = document.getElementById('pwdDisplay')
const copyIcon = document.getElementById('copyIconSpan')
const pwdGenIcon = document.getElementById('pwdGenIconSpan')

const characterAmountNumber = document.getElementById('characterAmountNumber')
const characterAmountRange = document.getElementById('characterAmountRange')

const form = document.getElementById('formDiv')
const easyToSayEl = document.getElementById('easyToSay')
const easyToReadEl = document.getElementById('easyToRead')
const allCharactersEl = document.getElementById('allCharacters')

const includeUpperCaseEl = document.getElementById('upperCase')
const includeLowerCaseEl = document.getElementById('lowerCase')
const includeNumbersEl = document.getElementById('numbers')
const includeSymbolsEl = document.getElementById('symbols')

const copyBtn = document.getElementById('copy')
const generateBtn = document.getElementById('generate')

const hideAlert = document.getElementsByClassName('alert')
const clsBtn = document.getElementsByClassName('close-btn')

const pwdStrengthOne = document.getElementById('pwdStrengthOne')
const pwdStrengthTwo = document.getElementById('pwdStrengthTwo')
const pwdStrengthThree = document.getElementById('pwdStrengthThree')
const pwdStrengthFour = document.getElementById('pwdStrengthFour')
const pwdStrengthFive = document.getElementById('pwdStrengthFive')
/* NonSelectors */
const UPPER_CHAR_CODES  = arrayLowToHigh(65, 90);
const LOWER_CHAR_CODES  = arrayLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayLowToHigh(33, 47)
                        .concat(arrayLowToHigh(58, 64))
                        .concat(arrayLowToHigh(91, 96))
                        .concat(arrayLowToHigh(123, 126))

/* EventListeners */    
pwdDisplay.addEventListener('keydown', (e)=>{
    if(e.code == 'Enter'){
        e.preventDefault()
    }
})
pwdDisplay.addEventListener('keyup', ()=>{ 
    passStrength()
})
characterAmountNumber.addEventListener('input',(e)=>{
    syncCharacterAmount(e);
    if(characterAmountNumber.value <= 50){
        listen();
        passStrength();
    }
})
characterAmountRange.addEventListener('input', (e)=>{
    syncCharacterAmount(e);
    listen();
    passStrength();
})

easyToSayEl.addEventListener('change', (e)=>{
    includeNumbersEl.disabled = true; 
    includeSymbolsEl.disabled = true;
    includeUpperCaseEl.checked = true;
    includeLowerCaseEl.checked = true;
    includeNumbersEl.checked = false;
    includeSymbolsEl.checked = false;
    listen();
    passStrength();
})
easyToReadEl.addEventListener('change', (e)=>{
    includeNumbersEl.disabled = false; 
    includeSymbolsEl.disabled = false;
    includeUpperCaseEl.checked = true;
    includeLowerCaseEl.checked = true;
    includeNumbersEl.checked = true;
    includeSymbolsEl.checked = true;
    listen();
    passStrength();
});
allCharactersEl.addEventListener('change', (e) => {
    includeNumbersEl.disabled = false; 
    includeSymbolsEl.disabled = false;
    includeUpperCaseEl.checked = true;
    includeLowerCaseEl.checked = true;
    includeNumbersEl.checked = true;
    includeSymbolsEl.checked = true;
    listen();
    passStrength();
})

includeUpperCaseEl.addEventListener('click', ()=>{
    listen()
    passStrength()
});
includeLowerCaseEl.addEventListener('click', ()=>{
    listen()
    passStrength()
});
includeNumbersEl.addEventListener('click', ()=>{
    listen()
    passStrength()
});
includeSymbolsEl.addEventListener('click', ()=>{
    listen()
    passStrength()
});

generateBtn.addEventListener('click', ()=>{
    listen();
    passStrength();
});

copyBtn.addEventListener('click', ()=>{ 
    alertFun();
})

pwdGenIcon.addEventListener('click', ()=>{
    listen();
})
copyIcon.addEventListener('click', ()=>{
    alertFun()
})

/* Functions */
function syncCharacterAmount(e){
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}

function arrayLowToHigh(low, high){
    const array =[];
    for(let i = low; i <= high; i++){
        array.push(i);
    }
    return array;
}


function listen(){
    characterAmount = characterAmountNumber.value;
    includeUpperCase = includeUpperCaseEl.checked;
    includeLowerCase = includeLowerCaseEl.checked;
    includeNumbers = includeNumbersEl.checked;
    includeSymbols = includeSymbolsEl.checked;
    const password = generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
    pwdDisplay.innerHTML = password;
}


/* Main Logic For Generating Password */
function generatePassword(characterAmount, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols){
    let charCodes = [];
    if(includeUpperCase) {charCodes = charCodes.concat(UPPER_CHAR_CODES)};
    if(includeLowerCase) {charCodes = charCodes.concat(LOWER_CHAR_CODES)};
    if(includeNumbers) {charCodes = charCodes.concat(NUMBER_CHAR_CODES).concat(NUMBER_CHAR_CODES)};
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

function cpyToClip(){
    const textarea = document.createElement('textarea');
    const password = pwdDisplay.innerText;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}


/* ColoureFont for different Characters */
function colouredFont(res){
    if(res.length == 0){
        return res;
    }
    let alpha = res.match(/[a-zA-Z]/g);
    let syms = res.match(/[\x21-\x2F]|[\x3A-\x40]|[\x5B-\x60]|[\x7B-\x7E]/g)
    let nums = res.match(/[0-9]/g);
    let str = "";
    let i = 0;
    str = res.replace(/[\x21-\x2F]|[\x3A-\x40]|[\x5B-\x60]|[\x7B-\x7E]/g, ()=>{
        return `<span class="syms">${syms[i++]}</span>`
    })
    let result = "";
    let j = 0;
    result = str.replace(/[0-9]/g, ()=>{
        return `<span class="nums">${nums[j++]}</span>`
    });
    return result;
}

function alertFun(){
    if(pwdDisplay.innerText.length != 0){
        cpyToClip();
        hideAlert[0].classList.remove('hide');
        clsBtn[0].addEventListener('click', ()=>{
            hideAlert[0].classList.add('hide');
            clearTimeout(timeoutId);
        })
        timeoutId = setTimeout(function(){
            hideAlert[0].classList.add('hide');
        }, 2500);
    }
}

function passStrength(){
    const up = pwdDisplay.innerText.match(/[A-Z]/g)
    const lo = pwdDisplay.innerText.match(/[a-z]/g)
    const nu = pwdDisplay.innerText.match(/[0-9]/g)
    const sy = pwdDisplay.innerText.match(/[\x21-\x2F]|[\x3A-\x40]|[\x5B-\x60]|[\x7B-\x7E]/g)
    let inte = pwdDisplay.innerText;
    inte = inte.replace(/(\r\n|\n|\r)/gm,"")
    let len = inte.length;
    //Same element condition check
    let same = inte.charAt(0);
    let count = 0;
    for(i = 0; i < len; i++){
        if(inte.charAt(i) == same){
            count++;
        }
    }
    if(len == 0){
        remCls()
    }
    else if(count == len){
        remCls()
        pwdStrengthOne.classList.add('red')
    }
    else if((len >= 15 && up && lo && nu && sy) ||
        (len >= 18 && ((up && lo && (nu || sy)) || (lo && nu && (up || sy)) || (up && nu && (lo || sy)) || (up && sy && (nu || lo)) || (sy && lo && (nu || sy)) || (sy && nu && (up || lo)))) ||
        (len >= 21 && ((up && (lo || nu || sy)) || (lo && (up || nu || sy)) || (nu && (lo || up || sy)) || (sy && (lo || nu || up)))) ||
        (len >= 25)){
        remCls();
        pwdStrengthOne.classList.add('dark-green');
        pwdStrengthTwo.classList.add('dark-green');
        pwdStrengthThree.classList.add('dark-green');
        pwdStrengthFour.classList.add('dark-green');
        pwdStrengthFive.classList.add('dark-green');
    }
    else if((len >= 8 && up && lo && nu && sy) ||
            (len >= 10 && ((up && lo && (nu || sy)) || (lo && nu && (up || sy)) || (up && nu && (lo || sy)) || (up && sy && (nu || lo)) || (sy && lo && (nu || sy)) || (sy && nu && (up || lo)))) || 
            (len >= 12 && ((up && (lo || nu || sy)) || (lo && (up || nu || sy)) || (nu && (lo || up || sy)) || (sy && (lo || nu || up)))) ||
            (len >= 14)){
        remCls();
        pwdStrengthOne.classList.add('green');
        pwdStrengthTwo.classList.add('green');
        pwdStrengthThree.classList.add('green');
        pwdStrengthFour.classList.add('green');
    }
    else if((len >= 7 && up && lo && nu && sy) ||
    (len >= 8 && ((up && lo && (nu || sy)) || (lo && nu && (up || sy)) || (up && nu && (lo || sy)) || (up && sy && (nu || lo)) || (sy && lo && (nu || sy)) || (sy && nu && (up || lo)))) || 
    (len >= 9 && ((up && (lo || nu || sy)) || (lo && (up || nu || sy)) || (nu && (lo || up || sy)) || (sy && (lo || nu || up)))) ||
    (len >= 10)){
        remCls();
        pwdStrengthOne.classList.add('orange');
        pwdStrengthTwo.classList.add('orange');
        pwdStrengthThree.classList.add('orange');   
    }
    else if((len >= 6 && up && lo && nu && sy) ||
    (len >= 7 && ((up && lo && (nu || sy)) || (lo && nu && (up || sy)) || (up && nu && (lo || sy)) || (up && sy && (nu || lo)) || (sy && lo && (nu || sy)) || (sy && nu && (up || lo)))) || 
    (len >= 8 && ((up && (lo || nu || sy)) || (lo && (up || nu || sy)) || (nu && (lo || up || sy)) || (sy && (lo || nu || up)))) ||
    (len >= 9)){
        remCls()
        pwdStrengthOne.classList.add('light-red');
        pwdStrengthTwo.classList.add('light-red');
    }
    else if(len!=0){
        remCls()
        pwdStrengthOne.classList.add('red');
    }
    else{
        remCls()
    }
}

function remCls(){
    pwdStrengthOne.classList.remove('dark-green','green','orange','light-red','red');
    pwdStrengthTwo.classList.remove('dark-green','green','orange','light-red');
    pwdStrengthThree.classList.remove('dark-green','green','orange');
    pwdStrengthFour.classList.remove('dark-green','green');
    pwdStrengthFive.classList.remove('dark-green');
}



