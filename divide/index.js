const board = document.querySelector('.board');
const stanby = document.querySelector('.stanby');
const boardArr = [];

let count = 0;
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j ++) {
        boardArr.push(count++);
        createBoard();    
    }
}
console.log(board);
console.log(boardArr);

for (let i = 0; i < 3; i++) {
    createNumberCard();
}
console.log(stanby)
console.log(stanby.childElementCount)


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



    numberCard.addEventListener('drag', function dragCard(ev) {}, false);
    numberCard.addEventListener('dragstart', dragCardStart, false);
    numberCard.addEventListener('dragend', dragCardEnd, false);
}

if (stanby.childElementCount >= 2) {
    // console.log(stanby.children[2])
    stanby.children[2].classList.add('active');
    stanby.children[2].setAttribute('draggable', true);

    lastElement();
}

if (stanby.childElementCount <= 3) {
    console.log('new')
    createNumberCard();
    lastElement();
}

function lastElement() {
    const keepCard = document.createElement('div');
    keepCard.classList.add('keep-card');
    
    stanby.appendChild(keepCard);

    keepCard.addEventListener('drop', dropCard, false);
    keepCard.addEventListener('dragenter', dragCardEnter, false);
    keepCard.addEventListener('dragleave', dragCardLeave, false);
    keepCard.addEventListener('dragover', dragCardOver, false);
}

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
        console.log(stanby.childElementCount);
    } else if (ev.target.className == 'keep-card') {
        ev.target.style.background = '';
        ev.target.classList.add('true');
        dragged.style.margin = '0 auto';

        dragged.parentNode.removeChild(dragged);
        ev.target.appendChild(dragged);
        console.log(ev.target);
    }
}



function directionsCheck(num, target) {
    const dropZone = document.querySelectorAll('.drop-zone');
    const id = Number(num);
    const direction = [id - 4, id - 1, id + 4, id + 1];
    const number = Number.parseInt(target.children[0].children[0].innerHTML);

    console.log(number)
    dropZone.forEach((item) => {
        for (let i = 0; i < direction.length; i++) {
            if (item.id == direction[i]) {
               if (item.className !== 'true') {
                   console.log(item)
               }
            }
        }
    });
}