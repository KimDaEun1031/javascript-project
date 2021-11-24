var todo_box = document.querySelector('.todo-input');
var todo_list = document.querySelector('.todo-list');

function saveTodo() {     
    var todo_value = todo_box.value;
    printTodo(todo_value);
    todo_box. value = '';
}

function printTodo(todo) {
    var li = document.createElement('li');
    var checkBox = document.createElement('input');
    var label = document.createElement('label');
    var span = document.createElement('span');
    var icon_box = document.createElement('div');
    var i = document.createElement('i');
    
    // 만든 요소에 클래스와 아이디 추가하기
    li.classList.add('list-box');
    icon_box.classList.add('icon-box');
    i.classList.add('material-icons');
    checkBox.id = 'todoCheck';

    // 태그 추가
    checkBox.setAttribute('type', 'checkbox');
    label.setAttribute('for', 'todoCheck');

    var i_clone = i.cloneNode();

    // 자식 요소로 넣기
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(icon_box);
    icon_box.appendChild(i);
    icon_box.appendChild(i_clone);

    // i 아이콘 설정
    i.textContent = 'create';
    i_clone.textContent = 'delete'

    span.innerHTML = todo;
    todo_list.appendChild(li);
}