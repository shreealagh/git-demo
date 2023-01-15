const addBtn = document.getElementById('add-btn');
const todoInp = document.getElementById('todo-inp');
const list = document.getElementById('list');

var todos = JSON.parse(window.localStorage.getItem('todos') || '[]');

function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    todos = newTodos;
    syncToLocalStorage();
    render();
}


function render() {
    while (list.firstChild) {
        list.firstChild.remove();
    }
    for (let todo of todos) {
        const li = document.createElement('li');
       // adding a class to the li
        li.innerText = todo.task;
       
        const delbtn=document.createElement('button');
        delbtn.innerHTML='<i class="fa-solid fa-trash-can"></i>';
       delbtn.classList.add('trash');
       delbtn.addEventListener('click', () => deleteTodo(todo.id));
       
        li.append(delbtn);
        const tick=document.createElement('button');
        tick.innerHTML='<i class="fa-solid fa-circle-check"></i>';
        tick.classList.add('tick');
        tick.addEventListener('click',()=>{
           li.classList.toggle('strikeoff');
        })
      
        li.append(tick);
        li.classList.add('newli');
        list.append(li);
    }
}

function pushTodo(todo) {
    todos.push(todo);
}

function createTodo(newTaskText) {
    const newTodo = {
        id: todos.length ,
        task: newTaskText,
        isCompleted:false
    }
    pushTodo(newTodo);
    syncToLocalStorage();
    render();
}

function syncToLocalStorage() {
    window.localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', function () {
    const newTaskText = todoInp.value;
    if (newTaskText.trim().length === 0) {
        todoInp.classList.add('border','border-danger');
        alert('oyeeeeeeeeeeeeee pagal h kya tu oyeeeeeeee chup chup🤬🤬🤬🤬🤬');
        return;
    }
    createTodo(newTaskText);
    todoInp.value = "";
});


todoInp.addEventListener('keydown', function () {
    if (todoInp.classList.contains('border-danger')) {
        todoInp.classList.remove('border-danger');
    }
});

render();

