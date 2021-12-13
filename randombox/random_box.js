// 버튼 누르면 선물 추가
const addPresent01 = document.querySelector('.add-list');
const addPresent02 = document.querySelector('.nonList');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');

addPresent01.addEventListener('click', openModal);
addPresent02.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal)

function openModal() {
    modal.style.display = 'inline';
};

function closeModal() {
    modal.style.display = 'none';
}

let ul = document.querySelector('#present-list');

// 카테고리 값 변경
let categoryValue = function(value) {
    document.querySelector('#product-category').value = value;
}

// 확률 값 변경
let rangeSlider = function(ev) {
    let div = $('.persent');
    let range = $('.range');
    let range_value = $('.range-value');
    console.

    div.each(function() {
        range_value.each(function() {
            var value = $(this).prev().attr('range_value');                 
            $(this).html(value);
        });

        range.on('input', function() {
            $(this).next(range_value).html(this.value);
            document.querySelector('.range').value = this.value;
        });
    });
};
rangeSlider();


// 선물 목록 요소 생성
function printPresent() {
    let present = document.createElement('li');
    let present_header = document.createElement('div');
    let present_number = document.createElement('span');
    let category = document.createElement('span');
    let closeBtn = document.createElement('button');
    let closeI = document.createElement('i');
    let present_name = document.createElement('marquee');
    let input_present = document.createElement('div');
    let range = document.createElement('input');
    let range_value = document.createElement('span');
    let persent = document.createElement('span');

    // 만든 요소에 클래스 추가
    present.classList.add('present');
    present_header.classList.add('present-header');
    present_number.classList.add('present-number');
    category.classList.add('category');
    closeBtn.classList.add('closeBtn');
    closeI.classList.add('material-icons');
    present_name.classList.add('present-name');
    input_present.classList.add('input-persent');
    range.classList.add('range');
    range_value.classList.add('range-value');

    //속성 추가
    range.setAttribute('type', 'range');
    range.setAttribute('max', '100');
    range.setAttribute('min', '0');
    // range_value.setAttribute('type', 'text');

    //부자 정렬
    present.appendChild(present_header);
    present_header.appendChild(present_number);
    present_header.appendChild(category);
    present_header.appendChild(closeBtn);
    closeBtn.appendChild(closeI);
    present.appendChild(present_name);
    present.appendChild(input_present);
    input_present.appendChild(range);
    input_present.appendChild(range_value);
    input_present.appendChild(persent);

    // 내용 추가
    persent.textContent = '%';
    closeI.textContent = 'close';

    // 번호 추가
    let li = ul.getElementsByTagName('li');
    for (var i = 1; i <= li.length; i++) {
        present_number.textContent = i;
    }

    category.textContent = document.querySelector('#product-category').value;
    present_name.textContent = document.querySelector('#product-name').value;
    range.value = document.querySelector('.range').value;
    
    range_value.innerHTML = document.querySelector('.range').value;
    console.log(range_value);

    ul.appendChild(present);
    closeModal();
    closeBtn.addEventListener('click', removePresent);
}

// 선물 목록 요소 삭제
function removePresent(ev) {
    const target = ev.target;
    const parent = target.parentNode;
    const grandParent = parent.parentNode;
    const greatGrandParent = grandParent.parentNode;
    ul.removeChild(greatGrandParent);
}

