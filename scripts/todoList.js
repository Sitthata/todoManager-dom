import TodoList, { Todo } from "./todo";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listTodo = document.getElementById("listTodo")

const todoList = new TodoList;

addBtn.addEventListener('click', () => {
    const todoValue = todoInput.value;

    if (todoValue.trim() === "") alert("Enter todo to proceed!")

    todoList.addTodo(todoValue);
    todoList.value = "";
    renderTodo();
});

const renderTodo = () => {
    const todos = todoList.getTodos();
    let html = ''
    todos.forEach(todo => {
        html += 
        `
        <div class="todoItem" id="newId">
            <p>${todo.description}</p>
            <button>Not done</button>
            <button>remove</button>
         </div>
        `
    });
    listTodo.innerHTML = html;
}