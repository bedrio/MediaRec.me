const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 3001
const pool = require('./db');

app.get('/auth', async(req, res) => {
	try {
		const users = await pool.query("SELECT * FROM USERS ;");
		res.json(users.rows);
	} catch (error) {
		console.error("bruh");
	}    
});
  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});