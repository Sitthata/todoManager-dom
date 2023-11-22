import TodoList from "./todo";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listTodo = document.getElementById("listTodo")

const todoList = new TodoList;

addBtn.addEventListener('click', () => {
    let todoValue = todoInput.value;

    if (!todoValue.trim()) alert("Enter todo to proceed!")
    todoList.addTodo(todoValue);
    todoInput.value = '';
    renderTodo();
});

listTodo.addEventListener('click', (e) => {
    const target = e.target;
    const action = target.dataset.action;
    const id = parseInt(target.dataset.id);

    switch(action) {
        case 'remove': 
            removeTodo(id);
            break;
        case 'toggle': 
            toggle(target);
            break;
    }
})

const removeTodo = (id) => {
    todoList.removeTodo(id);
    renderTodo();
}

const toggle = (target) => {
    target.classList.toggle('todo-completed');
    target.textContent = target.classList.contains('todo-completed') ? "Done" : "Not Done";
}

const renderTodo = () => {
    const todos = todoList.getTodos();
    let html = ''
    const isComplete = false;
    const completedClass = isComplete ? 'todo-completed' : '';
    todos.forEach(todo => {
        html += 
        `
        <div class="todoItem ${completedClass}" id="${todo.id}">
            <p>${todo.description}</p>
            <button data-action="toggle" data-id="${todo.id}">Not done</button>
            <button data-action="remove" data-id="${todo.id}">remove</button>
         </div>
        `
    });
    listTodo.innerHTML = html;
}