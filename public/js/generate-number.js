
import { getRandomNumber } from './utils'; 

const generateNumberButton = document.querySelector('.generate-number');
const checkNumber = document.querySelector('.check-number');
const attemptsCountNode = document.querySelector('.attempts span');
const contentNode = document.querySelector('.content');
const resetButton = document.querySelector('.reset-button');
const generatedNumNode = document.querySelector('.generated-number');
const successMessageNode = document.querySelector('.success-message');

let rundomNumber = null;
let attemptCount = 0;
let allAttemptCount = 0;

const showFirstHelpMessage = (currentNumber, rundomNumber) => { 
    const firstHelpMessage = document.querySelector('.help-message-first');

    if (currentNumber === rundomNumber) {
        successMessageNode.style.display = 'block';
        successMessageNode.textContent = `Вы угадали число ${rundomNumber}!!! Количество попыток ${allAttemptCount}.`;
        resetButton.style.display = 'block';
        contentNode.style.display = 'none';
    } else if (currentNumber > rundomNumber) {
        firstHelpMessage.textContent = 'Загаданное число меньше.';
        firstHelpMessage.style.display = 'block';
    } else {
        firstHelpMessage.textContent = 'Загаданное число больше.';
        firstHelpMessage.style.display = 'block';
    };
}

const showSecondHelpMessage = (rundomNumber, attemptCount) => { 
    const secondHelpMessage = document.querySelector('.help-message-second');
    const isEvenNumber = rundomNumber % 2 === 0;
    if (attemptCount % 3 === 0) {
        secondHelpMessage.style.display = 'block';
        secondHelpMessage.textContent = isEvenNumber ? 'Число четное.' : 'Число нечетное.';
    } else {
        secondHelpMessage.style.display = 'none';
    };
}

const showWarningMessage = (currentNumber) => {
    const warningMessage = document.querySelector('.warning-message');

    if (currentNumber > 100 || currentNumber < 1) {
        warningMessage.style.display = 'block';
    } else {
        warningMessage.style.display = 'none';
    };
}

const onClickGenerateNumberButton = () => { 
    rundomNumber = getRandomNumber();

    generateNumberButton.disabled = true;
    generatedNumNode.style.display = 'block';
    contentNode.style.display = 'block';
}

const onClickCheckNumberButton = () => {
    attemptCount++;
    allAttemptCount++;
    const inputValue = document.querySelector('.input').value;
    const currentNumber = Number(inputValue);

    showFirstHelpMessage(currentNumber, rundomNumber);
    showSecondHelpMessage(rundomNumber, attemptCount);
    showWarningMessage(currentNumber);

    attemptsCountNode.textContent = `${attemptCount}`;
};

const onClickResetResult = () => {
    generateNumberButton.disabled = false;
    document.querySelector('.input').value = '';
    attemptCount = 0;
    allAttemptCount = 0;
    attemptsCountNode.textContent = `${allAttemptCount}`;
    generatedNumNode.style.display = 'none';
    successMessageNode.style.display = 'none';
    resetButton.style.display = 'none';

    const messagesCollection = contentNode.querySelectorAll('p');
    for (let message of messagesCollection) { 
        message.style.display = 'none';
    }
}

const initGame = () => { 
    generateNumberButton.addEventListener('click', onClickGenerateNumberButton);

    checkNumber.addEventListener('click', onClickCheckNumberButton);

    resetButton.addEventListener('click', onClickResetResult);

    document.querySelector('.input').addEventListener('input', (e) => { 
        if (e.target.value.length > 0) {
            checkNumber.disabled = false;
        } else { 
            checkNumber.disabled = true;
        }
    });
}

export default initGame;