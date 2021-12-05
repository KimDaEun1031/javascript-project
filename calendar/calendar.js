let day = document.querySelector('.t-day');
let nDay = document.querySelector('.n-day');
let month_year = document.querySelector('.month-year');

const arrow_before = document.querySelector('.before');
const arrow_after = document.querySelector('.after');

const date = new Date();

let week = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'];

day.textContent = whatDay(date);
nDay.textContent = date.getDate();
month_year.textContent = WhatMonth(date) + ' ' + date.getFullYear();

function whatDay(date) {   
    let dayCheck = week[date.getDay()];
    return dayCheck;
}

function WhatMonth(date) {
    let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let monthCheck = month[date.getMonth()];
    return monthCheck;
}

const tbody = document.querySelector('tbody');

let year = date.getFullYear();
let month = date.getMonth();
let firstDay = new Date(year, month, 1);
let today = new Date();
var pageFirst = firstDay;
let pageYear;
let leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
let notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];

if(firstDay.getFullYear() % 4 === 0){
    pageYear = leapYear;
}else{
    pageYear = notLeapYear;
}

function showCalendar(){
    let monthCnt = 100;
    let cnt = 1;
    for(var i = 0; i < 6; i++){
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);   
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < firstDay.getDay()) || cnt > pageYear[firstDay.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);     
            }else{
                var $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);                
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        tbody.appendChild($tr);
    }
}
    
showCalendar();

function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

function prev(){
    if(pageFirst.getMonth() === 1){
        pageFirst = new Date(firstDay.getFullYear()-1, 12, 1);
        firstDay = pageFirst;
        if(firstDay.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(firstDay.getFullYear(), firstDay.getMonth()-1, 1);
        firstDay = pageFirst;
    }
    today = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
    month_year.textContent = WhatMonth(firstDay) + ' ' + firstDay.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');  
    clickStart();
}

function next(){
    if(pageFirst.getMonth() === 12){
        pageFirst = new Date(firstDay.getFullYear()+1, 1, 1);
        firstDay = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(firstDay.getFullYear(), firstDay.getMonth()+1, 1);
        firstDay = pageFirst;
    }
    today = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    month_year.textContent = WhatMonth(firstDay) + ' ' + firstDay.getFullYear();
    removeCalendar();
    showCalendar(); 
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');  
    clickStart();
}

function showMain(){
    day.textContent = whatDay(date);
    nDay.textContent = date.getDate();
}

var clickedDate1 = document.getElementById(date.getDate());
clickedDate1.classList.add('active');
var tdGroup = [];

function clickStart(){
    for(let i = 1; i <= pageYear[firstDay.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
    console.log(tdGroup);
}

clickStart();

function changeToday(e){
    for(let i = 1; i <= pageYear[firstDay.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(firstDay.getFullYear(), firstDay.getMonth(), clickedDate1.id);
    showMain();
    day.textContent = week[today.getDay()];
    nDay.textContent = today.getDate();
}