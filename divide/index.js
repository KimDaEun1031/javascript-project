const board = document.querySelector('.board');

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j ++) {
        let random = Math.floor(Math.random() * 100) + 2; 
        if (j % 2 == 1) {
            board.innerHTML += `<div class="item-border active"><div class="item">${random}</div></div>`;
        } else {
            board.innerHTML += `<div class="item-border"><div class="item"></div></div>`;
        }
    }
}