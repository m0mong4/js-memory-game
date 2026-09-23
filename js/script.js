let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;

const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer-display');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');

const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

const images = [];

for (let i = 0; i < 8; i++) {
  const url = `https://picsum.photos/id/${imgStart + i}/${dimension}/${dimension}`;
  images.push(url);
  
}

let cards = [...images, ...images];

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame(){
    gameBoard.innerHTML = '';

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedCount = 0;
    seconds = 0;

    clearInterval(timerInterval);
    timerInterval = null;

  
    timerDisplay.textContent = formatTime(seconds);
    resultDisplay.textContent = '';

    cards = shuffle(cards);

    cards.forEach((imgUrl) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = imgUrl;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => handleCardClick(card));
        gameBoard.appendChild(card);
    });
    startTimer();
}
restartButton.addEventListener('click', initGame);

function revealCard(card) {
    const img = document.createElement('img');
    img.src = card.dataset.value;
    card.appendChild(img);
}

function handleCardClick(card){
    if (lockBoard) return;
    if (card===firstCard) return;
    if (card.classList.contains('matched')) return;
    revealCard(card);
    if(firstCard===null){
        firstCard=card
        return;
    }
    
    secondCard=card
    lockBoard=true 
    moves++;
    checkMatch();
}

function checkMatch(){
    if (firstCard.dataset.value===secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCount++;
        firstCard = null;
        secondCard= null;
        lockBoard = false;
        checkVictory();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            firstCard = null;
            secondCard = null;
            lockBoard =false;
        }, 800);
    }
}

function formatTime(sec){
    const minutes=Math.floor(sec/60);
    const secondesrestantes=sec%60;
    const mm=String(minutes).padStart (2,'0');
    const ss=String(secondesrestantes).padStart (2,'0');

    return `${mm}:${ss}`;
}

function startTimer(){
    timerInterval=setInterval(() => { 
        seconds++
        timerDisplay.textContent=formatTime(seconds)
     }, 1000);
}

function checkVictory(){
    if( matchedCount === cards.length/ 2){
        clearInterval(timerInterval);
        resultDisplay.textContent=`Bravo ! Partie terminée en ${moves} coups et ${formatTime(seconds)}.`;
        
    }
}


initGame();