import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

/*****************SIGNUP API **************/
router.post("/signup", async (req, res  ) => {
    const {email, password} = req.body;

//Validate Input

if(!email || !password) {
    return res.status(400).json({error: "Email Passwrod Require"});
};


if (password.lengt < 6) {
    return res.status(400).json({error: "Password must be at least 6 characters"});
};

try {
    const userExists = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    );

if (userExists.rows.length > 0) {
    return res.status(409).json({error: "User already exists"});
};

// Hasing Password
const saltRounds = 10;
const passwordHash = await bcrypt.hash(password, saltRounds);


// Insert User
const result = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
    [email,passwordHash]
);

// Response

res.status(201).json({
    message: "User created successfully",
    user: result.rows[0]
});

} catch (err) {
    console.error(err);
    res.status(500).json({error: "Signup Failed"});
}    
});


/*****************LOGIN API **************/

router.post("/login", async (req, res) => {
    const {email, password} = req.body;


// Validate input
if (!email || !password) {
    return res.status(400).json({ error: "Email & Password required" });
}

try {
    //Find User
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

if(result.rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
}

const user = result.rows[0];

//Compare Password
const isMatch = await bcrypt.compare(password,user.password_hash);

if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
}

// 🔐 CREATE JWT
const token = jwt.sign(
    { id: user.id, email: user.email },   // payload
    process.env.JWT_SECRET,               // secret
    { expiresIn: "1h" }                    // expiry
 );


//Success
res.status(200).json({
    message: "Login Successful",
    token,
    user: {
        id: user.id,
        email: user.email
    }
});

} catch (err) {
    console.error(err);
    res.status(500).json({error: "login Failed"});
}

})



export default router;