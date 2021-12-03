const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 3001
const pool = require('./db');

// Check login info
app.get('/auth', async(req, res) => {
	try {
		const users = await pool.query("SELECT * FROM USERS ;");
		res.json(users.rows);
	} catch (error) {
		console.error("bruh");
	}
});

// Create a new user
app.post('/auth', async(req, res) => {
	try {
		const {name, email} = req.body;
		const newUser = await pool.query(`INSERT INTO USERS (email, name, profile_pic, friends) VALUES('${email}','${name}','default.jpg', ARRAY['']);`);
		res.json(newUser);
	} catch (error) {
		res.json(error);
	}
});
  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});