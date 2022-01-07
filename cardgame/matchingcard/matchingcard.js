let list = [];
const board = document.querySelector('.board-border');

const game_start = document.querySelector('.game-start');
const difficulty = document.querySelector('.difficulty');
const level = document.querySelectorAll('.level');
const info = document.querySelector('.score i');
const bestScore = document.querySelector('.bestScore');
const score = document.querySelector('.myScore');

const playBtn = document.querySelector('.board-menu i');
const timeSecond = document.querySelector('.time');
const round = document.querySelector('.round');

// 게임 시작 이벤트 호출
level.forEach(item => {
    let difficultyName = item.className.slice(6, item.length);

    item.addEventListener('click', function(e) {
        info.style.display = 'none';
        board.id = difficultyName;
        console.log(difficultyName);
        gameLevel(difficultyName);
    });
});

// 카드 만들기
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


    // 카드 클릭
    card.addEventListener('click', function() {
        card.classList.add('cardRotate');
        card.classList.remove('backRotate');          
        setTimeout(checkSameCard, 500);
        console.log(list);     
    })

}

// 클릭 이벤트 정지
function stopClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    return false;
}

// 클릭 이벤트 정지 해제
function startClick() {
    const allCards = document.querySelectorAll('.card');
    for (let idx in allCards) {
        let el = allCards[idx];
        if (el.addEventListener) {
            el.removeEventListener('click', stopClick, true);
        }
    }  
}

// 카드 짝 맞추기
function checkSameCard() {
    const cards = document.querySelectorAll('.cardRotate');
    const allCards = document.querySelectorAll('.card');
    console.log(cards);

    if (cards.length >= 2) {
        for (let idx in allCards) {
            let el = allCards[idx];
            if (el.addEventListener) {
                el.addEventListener('click', stopClick, true);
            }
        }  
    } 
      
    // 카드 짝이 안 맞는 경우
    if (cards[0].id !== cards[1].id && cards.length === 2) {         
        cards.forEach(function(card) {
            card.classList.remove('cardRotate');
            card.classList.add('backRotate');
        }); 
        setTimeout(startClick, 200);
        second -= 4;
    } else if (cards.length === 2) {
        // 카드 짝이 맞는 경우
        cards.forEach(card => {       
            card.classList.remove('cardRotate');
            card.classList.add('clear');
            list.pop(card.id);
            card.style.visibility = 'hidden';  
            console.log(list.length )  
            if (list.length === 0) {
                console.log(list.length ) 
               let clearRound = round.innerHTML.slice(0,1);
               let num = Number.parseInt(clearRound) + 1;

               switch(board.id) {
                    case 'easy' : easyRound(num); break;
                    // case 'normal' : gameStart(6); break;
                    // case 'hard' : gameStart(8); break;
                }
            }
        });
        setTimeout(startClick, 200); 
        second += 3;
    }
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

// 타이머 설정
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

// 카드 개수에 따른 정렬 - margin&padding 수치 변환
function changeCss() {
     let card = document.querySelectorAll('.card');

    if (card.length === 4) {
        card.forEach(cardItem => {
            cardItem.style.margin = '60px 70px 10px 60px';
        })
        board.style.padding = '70px 100px'
    }

    if (card.length === 6) {
        card.forEach(cardItem => {
            cardItem.style.margin = '30px';
        })
        board.style.padding = '100px 55px'
    }

    if (card.length === 8) {
        card.forEach(cardItem => {
            cardItem.style.margin = '10px 10px 60px 10px';
        })
        board.style.padding = '100px 20px'
    }
} 

// 게임 시작 난이도 구별
function gameLevel(difficulty) {
    switch(difficulty) {
        case 'easy' : gameStart(4); break;
        case 'normal' : gameStart(6); break;
        case 'hard' : gameStart(8); break;
    }
}

// 게임 시작 시 초기화
function gameStart(level) {
    for (let i = 0; i < level; i++) {
        createCard();                        
    }

    playBtn.style.display = 'none';
    info.style.display = 'none';

    timeSecond.style.display = 'inline';
    bestScore.style.display = 'block';
    score.style.display = 'block';

    round.textContent = '1 Round';

    resetTime = setInterval(timer, 1000);
    random();
    changeCss();

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.classList.add('cardRotate'); 
        card.classList.remove('backRotate'); 
        if (card.addEventListener) {
            card.addEventListener('click', stopClick, true);
        }   
    });

    setTimeout(startClickEvent, 5000);    
}

// 클릭 이벤트 정지 해제
function startClickEvent() {
    const allCards = document.querySelectorAll('.card');
    for (let idx in allCards) {
        let el = allCards[idx];
        if (el.addEventListener) {
            el.removeEventListener('click', stopClick, true);
            el.classList.add('backRotate');
            el.classList.remove('cardRotate');
            
        }
    }  
}

// easy 난이도
function easyRound(level) {
    switch(level) {
        case 2 : {
            easyMode(4, level);
            break;
        }

        case 3 : case 4 : case 5 : {
            easyMode(8, level);
            break;
        }

        case 6 : case 7 : case 8 : case 9 : case 10 : {
            easyMode(16, level);
            break;
        }

        default : {
            easyMode(20, level);
            break;
        }
    }
}

function easyMode(piece, r) {
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }

    for (let i = 0; i < piece; i++) {
        createCard();                        
    }
    round.textContent = `${r} Round`;
    random();
    changeCss();

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.classList.add('cardRotate'); 
        card.classList.remove('backRotate'); 
        if (card.addEventListener) {
            card.addEventListener('click', stopClick, true);
        }   
    });

    setTimeout(startClickEvent, 5000);    
}

// normal 난이도

// hard 난이도


// 게임 종료 시 초기화
function init() {
    time.innerHTML = 60;
    second = 60;
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }
    list = [];
    game_start.style.display = 'inline';
    info.style.display = 'block';

    playBtn.style.display = 'inline';
    timeSecond.style.display = 'none';
    bestScore.style.display = 'none';
    score.style.display = 'none';

    round.textContent = 'Matching Card';
    board.style.padding = '80px'
    board.id = 'not choice';
    clearInterval(resetTime);
}


// 게임 끝내기 버튼 (임시)
const reset = document.querySelector('.setting');
reset.addEventListener('click', init);

// 게임 정보 modal
const modal = document.querySelector('.modal');
const modal_btn = document.querySelector('.score i');
const close_btn = document.querySelector('.close-modal');

close_btn.addEventListener('click', closeInfoModal);
modal_btn.addEventListener('click', openInfoModal);

// 정보 modal close
function closeInfoModal() {
    modal.style.display = "none";
}

// 정보 modal open
function openInfoModal() {
    modal.style.display = "inline";
}

// 게임 설정 modal
const setting_btn = document.querySelector('.setting');
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

// 설정 modal on/off
function toggleBtn() {
    setting_btn.classList.toggle('open');
    if (setting_btn.className.split(' ')[1] === 'open') {
        setting_modal.style.display = 'inline';
    } else {
        setting_modal.style.display = 'none';
    }
}

// range 실시간
function handleRangeUpdate() {
    bgm[this.name] = this.value;
}

// 새로고침 시 배경음악 플레이
function playMusic(ev) {
    ev.preventDefault();
    bgm.play();
}

// 음량 조절 - mut
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

// 배경음악 재생 여부
const bgmPlayer = document.querySelector('.board-menu i');
bgmPlayer.addEventListener('click', bgmPlay);

function bgmPlay() {
    bgmPlayer.classList.toggle('play');
    if (this.className.split(' ')[1] === 'play') {
        bgmPlayer.textContent = "pause";
        bgmPlayer.style.margin = "10px"
        bgm.play();
    } else {
        bgmPlayer.textContent = "▶️";
        bgmPlayer.style.margin = "10px 10px 30px 10px"
        bgm.pause();
    }
}