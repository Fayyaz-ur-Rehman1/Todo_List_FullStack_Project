//Selectors

let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo');


//EventListeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addtodo)
todoList.addEventListener("click", deletecheck)
filterOption.addEventListener('click', filterTodo)

//Functions

function addtodo(event) {

    //  prevent form submitting

    event.preventDefault();

    //  TODO DIV

    let tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    // Create LI

    let newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    tododiv.appendChild(newTodo);

    // ADD TODO TO LOCALSTROAGE 
    saveLocalTodos(todoInput.value);

    //   CHECK MARK BUTTON

    let completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    tododiv.appendChild(completedButton);

    // CHECK TRASH BUTTON

    let trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    // APPEND TO LIST

    todoList.appendChild(tododiv)

    // Clear Todo INPUT VALUE

    todoInput.value = ""
};

function deletecheck(e) {
    const item = e.target;
    //    DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        // Animation

        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove()
        })
    }



    // CHECK MARK

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {


        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;


            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }

                break;

            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // CHECK ---HEY DO I ARLEADY HAVE THINGS IN THERE
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {

    // CHECK ---HEY DO I ARLEADY HAVE THINGS IN THERE

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {

        //  TODO DIV

        let tododiv = document.createElement("div");
        tododiv.classList.add("todo");

        // Create LI

        let newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        tododiv.appendChild(newTodo);


        //   CHECK MARK BUTTON

        let completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        tododiv.appendChild(completedButton);

        // CHECK TRASH BUTTON

        let trashbutton = document.createElement("button");
        trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        trashbutton.classList.add("trash-btn");
        tododiv.appendChild(trashbutton);

        // APPEND TO LIST

        todoList.appendChild(tododiv)

    })
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}