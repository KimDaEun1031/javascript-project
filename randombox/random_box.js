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

const PresentList = "PresentList";
let presentList = [];

// 선물 목록 요소 생성
function printPresent(cate, pren, pri, ran) {
    let present = document.createElement('li');
    let present_header = document.createElement('div');
    let present_number = document.createElement('span');
    let category = document.createElement('span');
    let closeBtn = document.createElement('button');
    let closeI = document.createElement('i');
    let present_name = document.createElement('marquee');
    let input_present = document.createElement('div');
    let price = document.createElement('input');
    let range = document.createElement('input');
    let range_value = document.createElement('span');
    let persent = document.createElement('span');

    //속성 추가
    range.setAttribute('type', 'range');
    range.setAttribute('max', '100');
    range.setAttribute('min', '0');
    range.setAttribute('value', '0');
    price.setAttribute('type', 'hidden');

    // 만든 요소에 클래스 & 아이디 추가
    present.classList.add('present');
    present.id = presentList.length + 1;
    present_header.classList.add('present-header');
    present_number.classList.add('present-number');
    category.classList.add('category');
    closeBtn.classList.add('closeBtn');
    closeI.classList.add('material-icons');
    present_name.classList.add('present-name');
    input_present.classList.add('input-persent');
    price.classList.add('price');
    range.classList.add('range');
    range_value.classList.add('range-value');

    //부자 정렬
    present.appendChild(present_header);
    present_header.appendChild(present_number);
    present_header.appendChild(category);
    present_header.appendChild(closeBtn);
    closeBtn.appendChild(closeI);
    present.appendChild(present_name);
    present.appendChild(input_present);
    input_present.appendChild(price);
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

    category.innerHTML = cate;
    present_name.innerHTML = pren;
    price.value = pri;

    // range
    let blank = document.querySelector('.range'); // 꽝
    let blankValue = document.querySelector('.range-value'); // 꽝 값
    range.value = 5;
    range_value.value = range.value;
    if (blank.value >= 5) {
        blank.value = blank.value - range.value;
        blankValue.innerHTML = blankValue.innerHTML - range.value;
    }
    range_value.innerHTML = range.value;

    ul.appendChild(present);
    closeModal();
    closeBtn.addEventListener('click', removePresent);
    range.addEventListener('input', rangeSlider);
}

// 선물 목록 요소 삭제
function removePresent(ev) {
    const target = ev.target;
    const parent = target.parentNode;
    const grandParent = parent.parentNode;
    const greatGrandParent = grandParent.parentNode;
    ul.removeChild(greatGrandParent);
    presentList = presentList.filter((pre) => pre.id !== Number(greatGrandParent.id));
    setPresent();
    location.reload();
}


// 선물 목록 요소 제작
function createPresent() {
    let mCategory = document.querySelector('#product-category').value;
    let mPresentName = document.querySelector('#product-name').value;
    let mPrice = document.querySelector('.price').value;
    let mRange = document.querySelector('.range').value;

    console.log(mRange);

    if (presentList.length < 20) {
        printPresent(mCategory, mPresentName ,mPrice, mRange);
        savePresent(mCategory, mPresentName ,mPrice, mRange);
    }

}

// 선물 목록 요소 저장
function savePresent(category, present_name, price, range) {
    // json 생성
    const presentObj = {
        category : category,
        present_name : present_name,
        price : price,
        range : range,
        id : presentList.length + 1,
    };
    presentList.push(presentObj);
    setPresent();
}

function setPresent() {
    localStorage.setItem(PresentList, JSON.stringify(presentList));  
}

// 저장한 선물 목록 요소 로드
function loadPresent() {
    const load_present = localStorage.getItem(PresentList);
    if (load_present !== null) {
        const parse = JSON.parse(load_present);
        for (let pre of parse) {
            const { category, present_name, price, range } = pre;
            printPresent(category, present_name, price, range);
            savePresent(category, present_name, price, range);
        }
    }
}
loadPresent();

let blank = document.querySelector('.range');
blank.addEventListener('input', blankRangeSlider);
// 추가한 선물 확률 조정
function rangeSlider(ev) {
    const target = ev.target;
    let brotherTarget = target.nextSibling;
    brotherTarget.innerHTML = target.value;
}

// 꽝 확률 조정
function blankRangeSlider(ev) {
    const target = ev.target;
    let brotherTarget = target.nextSibling;
    let oneMoreTarget = brotherTarget.nextSibling; 
    oneMoreTarget.innerHTML = target.value;  
}



