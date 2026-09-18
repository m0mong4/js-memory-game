firstCard =null
secondCard=null
lockBoard =false
moves=0
matchedCount =0 

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
    cards = shuffle(cards);

    const gameBoard = document.getElementById('game-board');

    cards.forEach((imgUrl) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = imgUrl;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => handleCardClick(card));
        gameBoard.appendChild(card);
    });
}

function andleCardClick(card){
    if (lockBoard) return;
    if (card===firstCard) return;
    if (card.classList.contains('matched')) return;
    if(firstCard===null){
        firstCard=card
        return;
    }
    secondCard=card
    lockBoard=true 
    move++;
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

initGame();