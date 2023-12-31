export class Todo {
    static runningId = 1;
    constructor(description) {
        this.id = Todo.runningId++;
        this.description = description;
        this.isDone = false;
    }

    getTodo() {
        return { id: this.id, description: this.description, isDone: this.isDone };
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }
}

export default class TodoList {
    constructor() {
        this.todos = [];
    }

    setTodos(todos) {
        this.todos = todos;
    }

    addTodo(desc) {
        const newTodo = new Todo(desc);
        this.todos.push(newTodo);
        return newTodo.id;
    }

    toggleTodoCompleted(id) {
        const todo = this.findTodo(id);
        if (todo) {
            todo.isDone = !todo.isDone;
        }
    }

    findTodo(searchId) {
        return this.todos.find(todo => todo.id === searchId);
    }

    findIndexTodo(searchId) {
        return this.todos.findIndex(todo => todo.id === searchId);
    }

    removeTodo(removeId) {
        const index = this.findIndexTodo(removeId);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }

    getTodos() {
        return this.todos;
    }

    getCompletedCount() {
        return this.todos.filter(todo => todo.isDone).length;
    }
}