import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";


const app =express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());



//GET all todos
app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({error: "Datatbase Error"});
  } 
});

//Add todos
app.post("/api/todos", async (req, res) => {
  const {text} = req.body;

  if(!text || text.trim() === "") {
    return res.status(400).json({error: "Todo text require"});
  }

  try {
    const result = await pool.query("INSERT INTO todos (text) VALUES ($1) RETURNING *",[text]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({error: "Insertion Failed"});
  }
});

//Update todos
app.put("/api/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const {text} = req.body;

    if(!text || text.trim() === "") {
    return res.status(400).json({error: "Updated text require"});
  }

  try {
    const result = await pool.query("UPDATE todos SET text=$1 WHERE id=$2 RETURNING *",[text,id]);

    if (result.rows.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
    }

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({error: "Updation Failed"});
  }

});

//Delete todos
app.delete("/api/todos/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query("DELETE FROM todos WHERE id = $1",[id])
    res.status(204).end();

  } catch (err) {
    res.status(500).json({error: "Deletion Failed"});
  }

 
});


app.get("/", (req, res) => {
  res.send("Backend API Running");
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
