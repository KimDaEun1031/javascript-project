var todo_box = document.querySelector('.todo-input');
        var todo_list = document.querySelector('.todo-list');
        var saveBtn = document.querySelector('.save');

        const ToDoList = "ToDoList";
        let toDoList = [];
        

        function deleteTodo(event) {
            const target = event.target;
            const iconBox = target.parentNode;
            const parentLi = iconBox.parentNode;
            // ul 안 li 없애기
            todo_list.remove(parentLi);
            // local storage에 남은 값 없애기 li id 값 가져와서 비교 후 없애기
            toDoList = toDoList.filter((toDo) => toDo.id !== Number(parentLi.id));
            saveTodoList();
            // 새로고침
            location.reload();
        }

        function createTodo(event) {     
            var todo = todo_box.value;
            // 값이 비어있지 않다면 ok
            if (todo !== '') {
                printTodo(todo);
                saveTodo(todo)
            }           
            todo_box.value = '';
        }

        function saveTodoList() {
            localStorage.setItem(ToDoList, JSON.stringify(toDoList));
        }

        function saveTodo(toDo) {
            // json 생성
            const ToDoObj = {
                text : toDo,
                id : toDoList.length + 1,
            };
            // 배열 안에 json 넣어주기
            toDoList.push(ToDoObj);
            // 로컬스토리지에 넣어주기 - json으로 변환하지 않으면 object로 나옴
            saveTodoList()
        }

        function loadTodo() {
            //로컬 스토리지에서 가져오기
            const loadTodo_List = localStorage.getItem(ToDoList);
            if (loadTodo_List !== null) {
                // json으로 다시 만들어주기
                const parseTodo_List = JSON.parse(loadTodo_List);
                for (let toDo of parseTodo_List) {
                    const { text } = toDo;
                    printTodo(text);
                    saveTodo(text)
                }
            }
        }
        loadTodo();

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
            li.id = toDoList.length + 1;

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

            // 이벤트 추가
            i.addEventListener('click', deleteTodo);
            i_clone.addEventListener('click', deleteTodo);

            span.innerHTML = todo;
            todo_list.appendChild(li);
        }