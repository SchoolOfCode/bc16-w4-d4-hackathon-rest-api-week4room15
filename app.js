import express from 'express';
import { v4 as uuidv4 } from "uuid";

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
    // create variable that = the reseult of the async function (must await)
    const todos = await getTodoList();
    // parse the result into a json object and send status code - 200
    res.status(200).json({ success: true, payload: todos });
  } catch (error) {
    res.status(500).json({ success: false, payload: `${error} unexpected error` });
  }
});


// in catch block - parse the result into a json object and send status code - server error code 500
