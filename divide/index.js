const board = document.querySelector('.board');
const stanby = document.querySelector('.stanby');
const score = document.querySelector('.score');
const boardArr = [];
const cardArr = [];

let count = 0;
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j ++) {
        boardArr.push(count++);
        createBoard();    
    }
}

for (let i = 0; i < 3; i++) {
    cardArr.push(1);
    createNumberCard();
}

function createBoard() {
    const dragZone = document.createElement('div');

    dragZone.classList.add('drop-zone');
    dragZone.id = boardArr.length - 1;

    board.appendChild(dragZone);

    dragZone.addEventListener('dragover', dragCardOver, false);
    dragZone.addEventListener('dragenter', dragCardEnter, false);
    dragZone.addEventListener('dragleave', dragCardLeave, false);
    dragZone.addEventListener('drop', dropCard, false);
}

function createNumberCard() {
    const numberCard = document.createElement('div');
    const item = document.createElement('div');

    numberCard.classList.add('number-card');
    item.classList.add('item');
    numberCard.setAttribute('draggable', false); 
    
    let random = Math.floor(Math.random() * 10) + 2;
    item.innerHTML = random;

    numberCard.appendChild(item);
    stanby.appendChild(numberCard);

    if (cardArr.length >= 3) {
        stanby.children[1].classList.add('active');
        stanby.children[1].setAttribute('draggable', true);
    }

    numberCard.addEventListener('drag', function dragCard() {}, false);
    numberCard.addEventListener('dragstart', dragCardStart, false);
    numberCard.addEventListener('dragend', dragCardEnd, false);
}

const KeepCard = document.querySelector('.keep-card');

KeepCard.addEventListener('drop', dropCard, false);
KeepCard.addEventListener('dragenter', dragCardEnter, false);
KeepCard.addEventListener('dragleave', dragCardLeave, false);
KeepCard.addEventListener('dragover', dragCardOver, false);

// number-card
let dragged;

function dragCardStart(ev) {
    dragged = ev.target;
    ev.target.style.opacity = 0.5;
}

function dragCardEnd(ev) {
    ev.target.style.opacity = '';
}

// board drop-zone
function dragCardOver(ev) {
    ev.preventDefault();
}

function dragCardEnter(ev) {
    if (ev.target.className == 'drop-zone') {
        ev.target.style.background = 'black'
    }
}

function dragCardLeave(ev) {
    if (ev.target.className == 'drop-zone') {
        ev.target.style.background = '';
    }
}

function dropCard(ev) {
    ev.preventDefault();

    if (ev.target.className == 'drop-zone') {
        ev.target.style.background = '';
        ev.target.classList.add('true');
        dragged.style.margin = '0 auto';

        dragged.setAttribute('draggable', false);
        dragged.parentNode.removeChild(dragged);
        ev.target.appendChild(dragged);

        directionsCheck(ev.target.id, ev.target);
        if (dragged.className.split(' ')[2] !== 'keep') {
            cardArr.pop();
        } else {
            dragged.classList.remove('keep');
            KeepCard.classList.remove('true');
        }

        if (cardArr.length <= 2) {
            cardArr.push(1);
            createNumberCard();
        }

        if (cardArr.length >= 3) {
            stanby.children[1].classList.add('active');
            stanby.children[1].setAttribute('draggable', true);
        }

    } else if (ev.target.className == 'keep-card') {
        ev.target.style.background = '';
        ev.target.classList.add('true');
        dragged.style.margin = '0 auto';
        dragged.classList.add('keep');

        dragged.parentNode.removeChild(dragged);
        ev.target.appendChild(dragged);

        cardArr.pop();

        if (cardArr.length <= 2) {
            cardArr.push(1);
            createNumberCard();
        }

        if (cardArr.length >= 3) {
            stanby.children[1].classList.add('active');
            stanby.children[1].setAttribute('draggable', true);
        }
    }
}

function directionsCheck(num, target) {
    const dropZone = document.querySelectorAll('.drop-zone');
    const id = Number(num);
    const direction = [id - 4, id - 1, id + 4, id + 1];
    const number = Number.parseInt(target.children[0].children[0].innerHTML);

    dropZone.forEach((item) => {
        for (let i = 0; i < direction.length; i++) {
            if (item.id == direction[i]) {
                if (item.className.split(' ')[1] !== undefined) {
                    let itemNumber = Number.parseInt(item.children[0].children[0].innerHTML);

                    if (number >= itemNumber) {
                        if (number % itemNumber === 0) {
                            let result = number / itemNumber;

                            if (result === 1) {
                                score.innerHTML = Number(score.innerHTML) + number + itemNumber; 
                                item.removeChild(item.children[0]);
                                target.removeChild(target.children[0]);
                                item.classList.remove('true');
                                target.classList.remove('true');
                            } else {
                                score.innerHTML = Number(score.innerHTML) + result; 
                                item.classList.remove('true');
                                item.removeChild(item.children[0]);
                                target.children[0].children[0].innerHTML = result;
                            }
                        }
                    } else if (number < itemNumber){

                        if (itemNumber % number === 0) {
                            
                            let result1 = itemNumber / number;
                            score.innerHTML = Number(score.innerHTML) + result1; 
                            target.classList.remove('true');

                            target.removeChild(target.children[0]);
                            item.children[0].children[0].innerHTML = result1;
                        }
                    }
                }    
            }
        }
    });
}