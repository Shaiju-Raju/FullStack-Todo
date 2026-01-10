import express from "express";

const app =express();
const PORT = 3000;

app.use(express.json())

let todos = [];

//GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

//Add todos
app.post("/api/todos", (req, res) => {
  const {text} = req.body;

  if(!text || text.trim() === "") {
    return res.status(400).json({error: "Todo text require"});
  }

  const newTodo = {
    id: Date.now(),
    text: text.trim()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo)
});

//Update todos
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const {text} = req.body;

    if(!text || text.trim() === "") {
    return res.status(400).json({error: "Updated text require"});
  }

  const todo = todos.find(t => t.id === id);

  if(!todo) {
    return res.status(400).json({error: "Todo not found"});
  };

  todo.text = text.trim();
  res.json(todo);
});

//Delete todos
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const initialLength = todos.length;

  todos = todos.filter(t => t.id !== id);

  if(initialLength === todos.length) {
    return res.status(404).json({error: "Todo not found"});
  }

  res.json({message: "todo Delete successfully"});
});


app.get("/", (req, res) => {
  res.send("Backend API Running");
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
