import TodoList from "./todo";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listTodo = document.getElementById("listTodo");
const done = document.getElementById("done");
const notDone = document.getElementById("notDone");

const todoList = new TodoList();

addBtn.addEventListener("click", () => {
  let todoValue = todoInput.value;

  if (!todoValue.trim()) alert("Enter todo to proceed!");
  todoList.addTodo(todoValue);
  todoInput.value = "";
  renderTodo();
});

listTodo.addEventListener("click", (e) => {
  const target = e.target;
  const action = target.dataset.action;
  const id = parseInt(target.dataset.id);

  switch (action) {
    case "remove":
      removeTodo(id);
      break;
    case "toggle":
      toggle(id, target);
      break;
  }
  renderTodo();
});

const removeTodo = (id) => {
  todoList.removeTodo(id);
};

const toggle = (id) => {
  todoList.toggleTodoCompleted(id);
};

const renderTodo = () => {
  const todos = todoList.getTodos();
  let html = "";
  todos.forEach((todo) => {
    const buttonText = todo.isDone ? "Done" : "Not Done";
    html += `
        <div class="todoItem" id="${todo.id}">
            <p>${todo.description}</p>
            <button data-action="toggle" data-id="${todo.id} id="${todo.id}">${buttonText}</button>
            <button data-action="remove" data-id="${todo.id}">remove</button>
         </div>
        `;
  });
  listTodo.innerHTML = html;
  done.textContent = `Number of Done: ${todoList.getCompletedCount()}`;
  notDone.textContent = `Number of not Done: ${
    todoList.getTodos().length - todoList.getCompletedCount()
  }`;
};
