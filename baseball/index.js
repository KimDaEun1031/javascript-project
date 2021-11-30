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

// 게임 실행 시 결과 정보
let span = document.querySelector('span');
let result = document.querySelector('.result');

// 게임 실행
startBtn.addEventListener('click', function(ev) {
    startBtn.style.display = 'none';
    game_container.style.display = 'inline';
    game_rule.style.display = 'inline';
    random_number = Math.floor(Math.random() * 888) + 100;
    console.log(random_number)
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
            let str = String(random_number);
            let arr = [];
            for (var i = 0; i < userNumber.length; i++) {
                // 위치 감지
                if (userNumber[i] !== str[i]) {
                    for (var j = 0; j < userNumber.length; j++) {
                        // 랜덤값에 같은 숫자가 있나 체크
                        if (userNumber[j] !== str[i]) {
                            arr[i] = false;
                        } else {
                            arr[i] = 'ball';
                            break;
                        }                           
                    }
                } else {
                    arr[i] = true;
                }
            }

            let strike = 0;
            let ball = 0;
            let out = 0;
            for (var h = 0; h < userNumber.length; h++) {
                if (arr[h] === true) {
                    strike += 1;
                } else if (arr[h] === 'ball') {
                    ball += 1;
                } else {
                    out += 1;
                }
            }

            if (out === 3) {
                gameRound--;
                span.textContent = '아웃';
                result.textContent = '😞틀렷습니다!'
            } else if (strike === 3) {
                span.textContent = 'S' + strike + ' B0';
                result.textContent = '😊맞췄습니다!'
                restartBtn.style.display = 'inline'
                input.readOnly = true;
            } else {
                gameRound--;
                span.textContent = 'S' + strike + ' B' + ball;
                result.textContent = '😞틀렷습니다!'
            }  
            round.textContent = "남은 기회 " + gameRound +"회";
        }            
    }

    if (gameRound <= 0) {
        restartBtn.style.display = 'inline'
        input.readOnly = true;
    }
}

// 게임 초기화 restart
function gameRestart() {
    gameRound = 10;
    random_number = 0;
    round.textContent = "남은 기회 " + gameRound +"회";
    span.textContent = '진행 중';
    result.textContent = '3자릿수를 입력해 주세요.';
    input.value = null;
    input.readOnly = false;
    startBtn.style.display = 'inline';
    restartBtn.style.display = 'none';
    game_container.style.display = 'none';
    game_rule.style.display = 'none';
}