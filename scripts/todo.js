export class Todo {
    static runningId = 1;
    constructor(description) {
        this.id = Todo.runningId++;
        this.description = description;
    }

    getTodo() {
        return { id: this.id, description: this.description };
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }
}

export default class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(desc) {
        const newTodo = new Todo(desc);
        this.todos.push(newTodo);
        return newTodo.id;
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
}