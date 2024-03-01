import express from 'express';
import { v4 as uuidv4 } from "uuid";
import { getTodoList, addTodo } from "./models/todos.js";

const app = express();
app.use(express.json());

const port = 3000;
app.listen (port, () => {
    console.log(`Server is listening on port ${port}.`)
})


// create get request to endpoint /todos
// pass second argument as an async function
app.get("/todos", async function (req, res) {
  // Try catch block containing the below...
  try {
    // create variable that = the result of the async function (must await)
    const todos = await getTodoList();
    // parse the result into a json object and send status code - 200
    res.status(200).json({ success: true, payload: todos });
  } catch (error) {
    // in catch block - parse the result into a json object and send status code - server error code 500
    res.status(500).json({ success: false, payload: `${error} unexpected error` });
  }
});

// create post request to endpoint /todos
// pass second argument as an async function
app.post("/todos", async function (req, res) {
  // Try catch block containing the below...
  try {
    //Get the request body
    const { toDo, completed } = req.body;
    const newTodo = {id: uuidv4(), toDo, completed}
    // create variable that = the result of the async function (must await)
    const todo = await addTodo(newTodo);
    //If client input is incorrect, throw error
    if(!toDo || toDo.trim() === "" || !completed || completed.trim() === ""){
      throw new Error('Todo List properties incorrect');
    }
    // parse the result into a json object and send status code - 201
    res.status(201).json({ success: true, payload: todo });
  } catch (error) {
    //Dynamically return correct error status and message
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, payload : error.message || 'Internal server error' });
  }
});

