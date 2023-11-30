import TodoList from "./todo";
const createTodoElement = require("createTodoElement");

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listTodo = document.getElementById("listTodo");
const done = document.getElementById("done");
const notDone = document.getElementById("notDone");

// create a new todoList
const todoList = new TodoList();

// Storage
window.addEventListener("DOMContentLoaded", () => {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    const parsedTodos = JSON.parse(storedTodos);
    todoList.setTodos(parsedTodos);
  }

  renderTodo();
});

addBtn.addEventListener("click", () => {
  function addTodo(todoValue) {
    const todoId = todoList.addTodo(todoValue);
    const addedTodo = todoList.findTodo(todoId);
    const todoElement = createTodoElement(addedTodo);
    listTodo.appendChild(todoElement);
  }
  console.log(todoList.getTodos());
  let todoValue = todoInput.value;
  if (!todoValue.trim()) alert("Enter todo to proceed!");
  addTodo(todoValue);
  todoInput.value = "";
  updateCounters();
});

const renderTodo = () => {
  todoList.getTodos().forEach((todo) => {
    const todoUi = createTodoElement(todo);
    listTodo.appendChild(todoUi);
  });
};

const toggle = (todo, toggleButton) => {
  todoList.toggleTodoCompleted(todo.id);
  toggleButton.textContent = todo.isDone ? "Done" : "Not Done";
  updateCounters();
};

const remove = (todo) => {
  todoList.removeTodo(todo.id);
  const todoElement = document.getElementById(todo.id);
  if (todoElement) {
    todoElement.parentNode.removeChild(todoElement);
  }
  updateCounters();
};

const createTodoElement = (todo) => {
  const currentTodo = todoList.findTodo(todo.id);
  const div = document.createElement("div");
  div.setAttribute("id", todo.id);

  const p = document.createElement("p");
  p.textContent = todo.description;

  const toggleButton = document.createElement("button");
  const toggleAttribute = document.createAttribute("id");
  toggleAttribute.value = todo.id;
  toggleButton.setAttributeNode(toggleAttribute);
  toggleButton.addEventListener("click", () =>
    toggle(currentTodo, toggleButton)
  );
  toggleButton.textContent = currentTodo.isDone ? "Done" : "Not Done";

  const deleteButton = document.createElement("button");
  const deleteAttribute = document.createAttribute("id");
  deleteAttribute.value = todo.id;
  deleteButton.setAttributeNode(deleteAttribute);
  deleteButton.textContent = "remove";
  deleteButton.addEventListener("click", () => remove(todo));

  div.appendChild(p);
  div.appendChild(toggleButton);
  div.appendChild(deleteButton);
  return div;
};

const updateCounters = () => {
  done.textContent = `Number of Done: ${todoList.getCompletedCount()}`;
  notDone.textContent = `Number of not Done: ${
    todoList.getTodos().length - todoList.getCompletedCount()
  }`;
};

// Save todos in local storage before user reload or close browser
window.addEventListener("beforeunload", () => {
  localStorage.setItem("todos", JSON.stringify(todoList.getTodos()));
});
