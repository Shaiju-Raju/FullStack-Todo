import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);


//GET all todos
router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.id
  try {
    const result = await pool.query("SELECT * FROM todos WHERE user_id=$1 ORDER BY id DESC" ,
        [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({error: "Datatbase Error"});
  } 
});

//Add todos
router.post("/", authMiddleware, async (req, res) => {
  const {text} = req.body;
  const userId = req.user.id

  if(!text || text.trim() === "") {
    return res.status(400).json({error: "Todo text require"});
  }

  try {
    const result = await pool.query("INSERT INTO todos (text, user_id) VALUES ($1, $2) RETURNING *",[text, userId]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({error: "Insertion Failed"});
  }
});

//Update todos
router.put("/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const {text} = req.body;
  const userId = req.user.id

    if(!text || text.trim() === "") {
    return res.status(400).json({error: "Updated text require"});
  }

  try {
    const result = await pool.query("UPDATE todos SET text=$1 WHERE id=$2 AND user_id= $3 RETURNING *",[text,id, userId]);

    if (result.rows.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({error: "Updation Failed"});
  }

});

//Delete todos
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const userId = req.user.id

  try {
    const result = await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2",[id, userId]);
    res.status(204).end();

  } catch (err) {
    res.status(500).json({error: "Deletion Failed"});
  }

 
});


export default router;