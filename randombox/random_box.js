// 버튼 누르면 선물 추가
const addPresent01 = document.querySelector('.add-list');
const addPresent02 = document.querySelector('.nonList');

addPresent01.addEventListener('click', openModal);
addPresent02.addEventListener('click', openModal);

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', function(ev) {
    modal.style.display = 'none';
})

function openModal() {
    modal.style.display = 'inline';
};

const ul = document.querySelector('#present-list');

let categoryValue = function(value) {
    document.querySelector('#product-category').value = value;
}

let rangeValue = function(value) {
    document.querySelector('.range').value = value;
}

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
    let range_value = document.createElement('input');
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
    range_value.setAttribute('type', 'text');

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
    range_value.value = document.querySelector('.range').value;

    ul.appendChild(present);
}

