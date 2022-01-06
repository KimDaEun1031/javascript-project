let list = [];
const board = document.querySelector('.board-border');

const game_start = document.querySelector('.game-start');
const difficulty = document.querySelector('.difficulty');
const level = document.querySelectorAll('.level');
const info = document.querySelector('.score i');

console.log(difficulty)
level.forEach(item => {
    let difficultyName = item.className.slice(6, item.length);

    item.addEventListener('click', function(e) {
        info.style.display = 'none';
        console.log(difficultyName);
        if (difficultyName === 'easy') {
            for (let i = 0; i < 4; i++) {
                createCard();                        
            }
            random();
            console.log(board);
            console.log(list);   

            resetTime = setInterval(timer, 1000);
            changeCss();
        }

        if (difficultyName === 'normal') {
            for (let i = 0; i < 6; i++) {
                createCard();
            }
            random();
            resetTime = setInterval(timer, 1000);
            changeCss();
        }

        if (difficultyName === 'hard') {
            for (let i = 0; i < 8; i++) {
                createCard();
            }
            random();
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
    if (card.id == 1) {
        img.setAttribute('src', './image/card-front-img01.jpg');
        img.setAttribute('alt', '카드');
    } else if (card.id == 3) {
        img.setAttribute('src', './image/card-front-img02.jpg');
        img.setAttribute('alt', '카드');
    } else if (card.id == 5) {
        img.setAttribute('src', './image/card-front-img03.jpg');
        img.setAttribute('alt', '카드');
    } else if (card.id == 7) {
        img.setAttribute('src', './image/card-front-img04.jpg');
        img.setAttribute('alt', '카드');
    } else if (card.id == 9) {
        img.setAttribute('src', './image/card-front-img05.jpg');
        img.setAttribute('alt', '카드');
    }
    

    // 부자 정렬
    card.appendChild(card_front);
    card.appendChild(card_back);
    card_front.appendChild(img);

    board.appendChild(card);
    game_start.style.display = 'none';
    list.push(card.id);

    card.addEventListener('click', function() {
        card.classList.add('cardRotate');
        card.classList.remove('backRotate');       
        setTimeout(checkSameCard, 2000);
        console.log(board)      
    })

}

function checkSameCard() {
    const cards = document.querySelectorAll('.cardRotate');

    // 카드 짝이 안 맞는 경우
    if (cards[0].id !== cards[1].id && cards.length === 2) { 
        cards.forEach(function(card) {
            card.classList.remove('cardRotate');
            card.classList.add('backRotate');
        });  
        second -= 4;
    } else {
        // 카드 짝이 맞는 경우
        cards.forEach(card => {
            card.style.visibility = 'hidden';
            card.classList.remove('cardRotate');
            card.classList.add('backRotate');
            list.pop(card.id);
        });
        second += 3
    }

    console.log(list)
}

// 랜덤 배치
function random() {
    const cards = document.querySelectorAll('.card');
    let arr = Array.prototype.slice.call(cards, 0);

    arr.sort(() => Math.random() - 0.5);

    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }

    arr.forEach(card => board.appendChild(card));
    console.log(board)
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

// 게임 종료
function init() {
    time.innerHTML = 60;
    second = 60;
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }
    list = [];
    game_start.style.display = 'inline';
    info.style.display = 'block';
    board.style.padding = '80px'
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

// 게임 정보 modal
const modal = document.querySelector('.modal');
const modal_btn = document.querySelector('.score');
const close_btn = document.querySelector('.close-modal');

close_btn.addEventListener('click', closeInfoModal);
modal_btn.addEventListener('click', openInfoModal);

function closeInfoModal() {
    modal.style.display = "none";
}

function openInfoModal() {
    modal.style.display = "inline";
}

// 게임 설정 modal
const setting_btn = document.querySelector('.pause');
const setting_modal = document.querySelector('.speech-bubble');
const bgm = document.querySelector('.bgmplayer');
const ranges = document.querySelectorAll('.player__slider');
const volumBtns = document.querySelectorAll('.setting-content i');
console.log(volumBtns)

setting_btn.addEventListener('click', toggleBtn);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

volumBtns.forEach(volum => volum.addEventListener('click', musicMut));

window.addEventListener('beforeunload', playMusic);

function toggleBtn() {
    setting_btn.classList.toggle('open');
    if (setting_btn.className.split(' ')[1] === 'open') {
        setting_modal.style.display = 'inline';
    } else {
        setting_modal.style.display = 'none';
    }
}

function handleRangeUpdate() {
    bgm[this.name] = this.value;
}

function playMusic(ev) {
    ev.preventDefault();
    bgm.play();
}

function musicMut() {
    this.classList.toggle('mut');

    if (this.className.split(' ')[1] === 'mut') {
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i].id == 'bgm') {
                ranges[0].value = 0;
                break;
            } else {
                ranges[1].value = 0;
                break;
            }
        }
            
        bgm.volume = 0.0;
        this.innerHTML = 'volume_off';
    } else {
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i].id == 'bgm') {
                ranges[0].value = 0.5;
                break;
            } else {
                ranges[1].value = 0.5;
                break;
            }
        }

        bgm.volume = 0.5;
        bgm.play();
        this.innerHTML = 'volume_up';
    }
}
