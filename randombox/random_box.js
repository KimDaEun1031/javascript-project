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

const label = document.querySelector('.img_label');

// modal 이미지 파일 추가 시 preview
$(document).ready(function(){
    var fileTarget = $('.upload-hidden');
 
     fileTarget.on('change', function(){
         if(window.FileReader){
             // 파일명 추출
             var filename = $(this)[0].files[0].name;
            //  console.log(this)
         } 
 
         else {
             // Old IE 파일명 추출
             var filename = $(this).val().split('/').pop().split('\\').pop();
            //  console.log(filename)
         };
 
         $(this).siblings('.upload-name').val(filename);
     });
 
     //preview image 
     var imgTarget = $('.upload-hidden');
 
     imgTarget.on('change', function(){
         var parent = $(this).parent();
         parent.children('.upload-display').remove();
 
         if(window.FileReader){
             //image 파일만
             if (!$(this)[0].files[0].type.match(/image\//)) return;
             
             var reader = new FileReader();
             reader.onload = function(e){
                 var src = e.target.result;
                 parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"><label for="input_file" class="pre_label"><i class="material-icons">add</i></label></div></div>');
                 label.style.display = 'none';
                 document.querySelector('.file-name').value = src;
                //  console.log(document.querySelector('.file-name').value)
             }
             reader.readAsDataURL($(this)[0].files[0]);
         }
 
         else {
             $(this)[0].select();
             $(this)[0].blur();
             var imgSrc = document.selection.createRange().text;
             parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"><label for="input_file" class="pre_label"><i class="material-icons">add</i></label></div></div>');
             label.style.display = 'none';
 
             var img = $(this).siblings('.upload-display').find('img');
             img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";        
         }      
     });
});

// 메인 화면 UI 변경
const nonList = document.querySelector('.nonList');
const draw_box = document.querySelector('.draw-box');
const draws = document.querySelectorAll('.draw');

const loading = document.querySelector('.load-wrapp');
const present_card = document.querySelector('.present-card');
const card_front = document.querySelector('.card-front');
const card_back = document.querySelector('.card-back');
const noBlank = document.querySelector('.card-front .noBlank');
const cardBlank = document.querySelector('.card-front .blank');

draws.forEach(draw => draw.addEventListener('click', randomBox))

function randomBox() {
    draw_box.style.display = 'none';
    loading.style.display = 'inline';
    present_card.style.display = 'none';
    cardBlank.style.display = 'none';
    noBlank.style.display = 'none'; 

    // 뽑기
    let random = Math.floor((Math.random() * 101) + 1);
    let ran = [];

    presentList.filter(pre => ran.push(Object.values(pre)[5]))
    let randomId = Math.floor((Math.random() * ran.length) + 1);
    console.log(random)
    if (1 <= random && random <= 50) {
        setTimeout(function() {
            $(".cardRotate").addClass("backRotate").removeClass("cardRotate");
            loading.style.display = 'none';  
            cardBlank.style.display = 'none'; 
            present_card.style.display = 'inline-block';
            noBlank.style.display = 'inline'
    
            const present_image = document.querySelector('.upload-hidden img');
            const present_name = document.querySelector('.presentCard-name');
            const present_price = document.querySelector('.presentCard-price');
    
            let preId = presentList.filter((pre) => pre.id === randomId);
            let obj = Object.values(preId["0"]);
            
            present_image.src = obj[4];
            present_name.value = obj[1];
            present_price.value = obj[2];
        }, 2000)   
    } 
    else {
        setTimeout(function() {
            $(".cardRotate").addClass("backRotate").removeClass("cardRotate");
            loading.style.display = 'none';
            present_card.style.display = 'inline-block';
            noBlank.style.display = 'none'; 
            cardBlank.style.display = 'flex';           
        }, 2000)   
    }  
}

$(".present-card").on('click',function(){
    $(".cardRotate").addClass("backRotate").removeClass("cardRotate");
    $(this).addClass("cardRotate").removeClass("backRotate");
});


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
    if (blank.value >= 5 || range.value === 0) {
        range.value = 5;
        range_value.value = range.value;
        blank.value = blank.value - range.value;
        blankValue.innerHTML = blankValue.innerHTML - range.value;
    }
    range_value.innerHTML = range.value;

    let max = 100;

    ul.appendChild(present);
    closeModal();
    closeBtn.addEventListener('click', removePresent);

    // 선물 실시간 조정
    range.addEventListener('input', function(ev) {
        const target = ev.target;  
        let brotherTarget = target.nextSibling;
        let initTemp =  5;
        let temp = brotherTarget.innerHTML;
        brotherTarget.innerHTML = target.value;
        
        let children = ul.children;
        // console.log(children[1])
        // let sum = [...children].reduce((acc, cur) => acc + Number(cur.children[2].children[1].value), 0);
        // console.log(sum)
        // console.log(ele.children[2].children[1].value)
        // let targetNum = parseInt(brotherTarget.innerHTML);
        // let blankNum = parseInt(blankValue.innerHTML);
        // if (sum > max) {
        //     setTimeout(function() {
        //         target.value = temp;
        //         brotherTarget.innerHTML = temp;
        //     }, 500);     
        
        // }
        // const target = ev.target;
    });

    if (ul.children.length >= 2)  {
        nonList.style.display = 'none';
        draw_box.style.display = 'inline';
    } else {
        nonList.style.display = 'inline';
        draw_box.style.display = 'none';
    }
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
    let mRange = document.querySelector('#range').value;
    let mImg = document.querySelector('.file-name').value;

    if (presentList.length < 20) {
        printPresent(mCategory, mPresentName ,mPrice, mRange);
        savePresent(mCategory, mPresentName ,mPrice, mRange, mImg);
    }

}

// 선물 목록 요소 저장
function savePresent(category, present_name, price, range, preview) {
    // json 생성
    const presentObj = {
        category : category,
        present_name : present_name,
        price : price,
        range : range,
        preview : preview,
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
            const { category, present_name, price, range, preview } = pre;
            printPresent(category, present_name, price, range);
            savePresent(category, present_name, price, range, preview);
        }
    }
}
loadPresent();



let blank = document.querySelector('.range');
blank.addEventListener('input', blankRangeSlider);

// 꽝 확률 조정
function blankRangeSlider(ev) {
    const target = ev.target;
    let brotherTarget = target.nextSibling;
    let oneMoreTarget = brotherTarget.nextSibling; 
    oneMoreTarget.innerHTML = target.value;  
}
