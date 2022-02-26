const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const resetButton = document.querySelector('.reset');

function addTodo(event){
    event.preventDefault();

    if (todoInput.value.length == 0){
        alert("Поле ввода пусто");
        return;
    }

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const doneButton = document.createElement("button");
    doneButton.innerHTML = 'done';
    doneButton.classList.add("done-btn");
    todoDiv.appendChild(doneButton)
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'delete';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // const dateDiv = document.createElement('div');
    // dateDiv.innerText = (new Date()).toUTCString();
    // dateDiv.classList.add('todo-date');
    // todoDiv.appendChild(dateDiv)

    todoList.appendChild(todoDiv);
    todoInput.value = '';

    updateLocalStorageData()
}

function interactTodo(event){
    const item = event.target
    const todo = item.parentElement
    if (item.classList[0] === "delete-btn"){
        todo.remove()
    }
    if (item.classList[0] === "done-btn"){
        todo.classList.toggle('done')
        todo.children[0].classList.toggle('done-li')
    }
    updateLocalStorageData()
}

function filterTodo(event){
    const todos = todoList.children;
    for (var i = 0; i < todos.length; i++) {
        switch(event.target.value){
            case 'all':
                todos[i].style.display = "flex";
                break;
            case 'done':
                if(todos[i].classList.contains('done')){
                    todos[i].style.display = "flex";
                }
                else{
                    todos[i].style.display = "none";
                }
                break;
            case 'active':
                if(!todos[i].classList.contains('done')){
                    todos[i].style.display = "flex";
                }
                else{
                    todos[i].style.display = "none";
                }
                break;
        }
    }
}

function updateLocalStorageData(){
    const todos = document.querySelectorAll(".todo");
    let jsonData = [];
    todos.forEach(function(todo){
        jsonData.push({
            "text": todo.children[0].innerText,
            "active": !todo.classList.contains("done")
        })
    });
    console.log(jsonData)
    localStorage.setItem("todos", JSON.stringify(jsonData))
}

function pullLocalStorageData(){
    let jsonData = localStorage.getItem("todos");
    jsonData = JSON.parse(jsonData);
    jsonData.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo["text"];
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const doneButton = document.createElement("button");
        doneButton.innerHTML = 'done';
        doneButton.classList.add("done-btn");
        todoDiv.appendChild(doneButton)
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = 'delete';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        // const dateDiv = document.createElement('div');
        // dateDiv.innerText = (new Date()).toUTCString();
        // dateDiv.classList.add('todo-date');
        // todoDiv.appendChild(dateDiv)

        todoList.appendChild(todoDiv);
        
        if(!todo["active"]){
            todoDiv.classList.toggle('done')
            todoDiv.children[0].classList.toggle('done-li')
        }
    });
}

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', interactTodo);
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', pullLocalStorageData)
resetButton.addEventListener('click', function(event){
    localStorage.removeItem('todos')
});