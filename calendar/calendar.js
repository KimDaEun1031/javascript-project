let day = document.querySelector('.t-day');
let nDay = document.querySelector('.n-day');
let month_year = document.querySelector('.month-year');

const arrow_before = document.querySelector('.before');
const arrow_after = document.querySelector('.after');

const date = new Date('2012-05-14 10:20:30');

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
const tr = document.createElement('tr');
const clone_tr_1 = tr.cloneNode();
const clone_tr_2 = tr.cloneNode();
const clone_tr_3 = tr.cloneNode();
const clone_tr_4 = tr.cloneNode();
const clone_tr_5 = tr.cloneNode();
const clone_tr_6 = tr.cloneNode();

let year = date.getFullYear();
let month = date.getMonth();
let lastDay = new Date(year, month+1, 0);

tbody.appendChild(tr);
tbody.appendChild(clone_tr_1);
tbody.appendChild(clone_tr_2);
tbody.appendChild(clone_tr_3);
tbody.appendChild(clone_tr_4);
tbody.appendChild(clone_tr_5);
tbody.appendChild(clone_tr_6);

// for (let idx = 1; idx < 7; idx++) {
//     let elName = "clone_tr_" + idx;
//     (new Function(elName))();
//     console.log(elName);
//     tbody.appendChild(elName);
// }

for (let index = 0; index < 7; index++) {
    tr.innerHTML += "<th class='day'>" + week[index] + "</th>"
}

let num = 1;

for (let i = 1; i <= 6; i++) {
    let elName = "clone_tr_" + i;
    (new Function(elName))();

    for (let j = 1; j <= 6; j++) {
        elName.innerHTML += "<td>" + num + "</td>";
        num++
    } 
    // tbody.innerHTML += "<td>" + i + "</td>"
}

console.log(document.querySelector('table'));