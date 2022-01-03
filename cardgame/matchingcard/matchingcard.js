let list = [];
const board = document.querySelector('.board-border');

const game_start = document.querySelector('.game-start');
const difficulty = document.querySelector('.difficulty');
const level = document.querySelectorAll('.level');

console.log(difficulty)
level.forEach(item => {
    let difficultyName = item.className.slice(6, item.length);
    console.log(item)
    item.addEventListener('click', function(e) {
        console.log(difficultyName);
        if (difficultyName === 'easy') {
            for (let i = 0; i < 4; i++) {
                createCard();             
            }
            console.log(board);
            console.log(list);   

            resetTime = setInterval(timer, 1000);
            changeCss();
        }

        if (difficultyName === 'normal') {
            for (let i = 0; i < 6; i++) {
                createCard();
            }
            console.log(list);   
            resetTime = setInterval(timer, 1000);
            changeCss();
        }

        if (difficultyName === 'hard') {
            for (let i = 0; i < 8; i++) {
                createCard();
            }
            console.log(list);   
            resetTime = setInterval(timer, 1000);
            changeCss();
        }
    });
    
});

let clickCard = [];

function createCard() {
    const card = document.createElement('div');
    const card_front = document.createElement('div');
    const card_back = document.createElement('div');
    const img = document.createElement('img')

    // 클래스 & 아이디 추가
    card.classList.add('card');
    card_front.classList.add('card-front');
    card_back.classList.add('card-back');
    if (list.length % 2 === 0) {
        card.id = list.length + 1;
    } else {
        card.id = list.length;
    }
    

    // 속성 추가
    img.setAttribute('src', './image/card-front-img01.jpg');
    img.setAttribute('alt', '카드');

    // 부자 정렬
    card.appendChild(card_front);
    card.appendChild(card_back);
    card_front.appendChild(img);

    board.appendChild(card);
    game_start.style.display = 'none';
    list.push(card.id);

    card.addEventListener('click', function() {
        console.log(card);
        card.classList.add('cardRotate');
        card.classList.remove('backRotate');
        clickCard.push(card.id);
        checkSameCard(card);
        console.log(clickCard)      
    })
   
}

function checkSameCard(card) {
    if (clickCard[0] !== clickCard[1] && clickCard.length === 2) {
        card.classList.add('backRotate');
        card.classList.remove('cardRotate');
        console.log(clickCard);
        clickCard.splice(0, clickCard.length);
    }
    console.log(clickCard);
}

const time = document.querySelector('.second');
let second = Number(time.innerHTML);  
let resetTime = null;

function timer() {  
    if (second > 0) {
        second -= 1;
        time.innerHTML = second;
    } else {
        init();
    }
}

function init() {
    time.innerHTML = 60;
    second = 60;
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }
    game_start.style.display = 'inline';
    board.style.padding = '100px'
    clearInterval(resetTime)
}

function changeCss() {
     let card = document.querySelectorAll('.card');

    if (card.length === 4) {
        card.forEach(cardItem => {
            cardItem.style.margin = '60px';
        })
        board.style.padding = '100px'
    }

    if (card.length === 6) {
        card.forEach(cardItem => {
            cardItem.style.margin = '30px';
        })
        board.style.padding = '55px'
    }

    if (card.length === 8) {
        card.forEach(cardItem => {
            cardItem.style.margin = '10px';
        })
        board.style.padding = '20px'
    }
} 

// 게임 끝내기 버튼 (임시)
const reset = document.querySelector('.pause');
reset.addEventListener('click', init);

