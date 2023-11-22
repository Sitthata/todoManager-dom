import TodoList from "./todo";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listTodo = document.getElementById("listTodo");
const done = document.getElementById("done");
const notDone = document.getElementById("notDone");

// create a new todoList
const todoList = new TodoList();

addBtn.addEventListener("click", () => {
  function addTodo(todoValue) {
    const todoId = todoList.addTodo(todoValue);
    const addedTodo = todoList.findTodo(todoId);
    const todoElement = createTodoElement(addedTodo);
    listTodo.appendChild(todoElement);
  }

  let todoValue = todoInput.value;
  if (!todoValue.trim()) alert("Enter todo to proceed!");
  addTodo(todoValue);
});

const createTodoElement = (todo) => {
  const div = document.createElement("div");
  div.className = "todoItem";
  div.id = `todo-${todo.id}`;

  const p = document.createElement("p");
  p.textContent = todo.description;

  const toggleButton = document.createElement("button");
  toggleButton.setAttribute("data-action", "toggle");
  toggleButton.setAttribute("data-id", todo.id);
  toggleButton.textContent = todo.isDone ? "Done" : "Not Done";
  toggleButton.addEventListener("click", () => toggle(todo.id));

  const removeButton = document.createElement("button");
  removeButton.setAttribute("data-action", "remove");
  removeButton.setAttribute("data-id", todo.id);
  removeButton.textContent = "remove";
  removeButton.addEventListener("click", () => removeTodo(todo.id));

  div.appendChild(p);
  div.appendChild(toggleButton);
  div.appendChild(removeButton);

  return div;
};

const updateCounters = () => {
    done.textContent = `Number of Done: ${todoList.getCompletedCount()}`;
    notDone.textContent = `Number of not Done: ${
      todoList.getTodos().length - todoList.getCompletedCount()
    }`;
  };