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
