const game_container = document.querySelector('.game-container');
const game_rule = document.querySelector('.game-rule');
const modal = document.querySelector('.modal');
const input = document.querySelector('.input-number');

const startBtn = document.querySelector('.start');
const infoBtn = document.querySelector('.info');
const restartBtn = document.querySelector('.restart');
const esc_modal = document.querySelector('.esc');

// 세자리수 랜덤값
let random_number = 0;

// 게임 실행 횟수
let round = document.querySelector('.round');
let gameRound = 10;

// 게임 실행
startBtn.addEventListener('click', function(ev) {
    startBtn.style.display = 'none';
    game_container.style.display = 'inline';
    game_rule.style.display = 'inline';
    random_number = Math.floor(Math.random() * 999) + 100;
console.log(random_number);
})

// 게임 초기화
restartBtn.addEventListener('click', gameRestart);

// modal 실행
infoBtn.addEventListener('click', function(ev) {
    modal.style.display = 'inline';   
})

// modal 종료
esc_modal.addEventListener('click', function (ev) {
    modal.style.display = 'none';    
})


// 입력 시마다 실행
function gameStart(ev) {
    let userNumber = input.value;
    // 입력값이 3자리수가 아닌 경우 경고, 게임이 실행되지 않음
    if (userNumber.length !== 3 || userNumber.length === '') {        
        alert("3자리 숫자를 적어주세요.");     
        input.value = null;  
    } else {
        // 게임 실행 횟수가 0번 남았다면 종료
        if (gameRound !== 0) {
            gameRound--;
            round.textContent = "남은 기회 " + gameRound +"회";
        }            
    }

    if (gameRound <= 0) {
        restartBtn.style.display = 'inline'
    }
}

// 게임 초기화 restart
function gameRestart() {
    gameRound = 10;
    round.textContent = "남은 기회 " + gameRound +"회";
    input.value = null;
    startBtn.style.display = 'inline';
    game_container.style.display = 'none';
    game_rule.style.display = 'none';
}