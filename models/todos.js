import data from "../data/todos.json" assert {type : "json"};

//Create helper function which returns the whole array
export async function getTodoList() {
    return data;
}

//Create helper function which returns the Todo
export async function addTodo(todo) {
    const todos = await getTodoList();
    todos.push(todo);
    return todo;
} 

// create helper function to get todo by id
export async function getTodoById(id) {
    const todo = data.find((todo) => todo.id === id);
    return todo;
}

// create helper function to delete todo, by id
export async function deleteTodo(id) {
    const todos = await getTodoList();

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
        return;
    }

    const deletedTodo = todos.splice(todoIndex, 1);

    return deletedTodo;
}