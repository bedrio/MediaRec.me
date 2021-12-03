const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 3001
const pool = require('./db');

// Check login info
app.get('/auth/:id', async(req, res) => {
	try {
		const {id} = req.params;
		const user = await pool.query(`SELECT * FROM USERS WHERE email = '${id}'`);
		res.json(user.rows);
	} catch (error) {
		res.json(error);
	}
});

// Create a new user
app.post('/auth', async(req, res) => {
	try {
		const {name, email} = req.body;
		const newUser = await pool.query(`INSERT INTO USERS (email, name, profile_pic, friends) VALUES('${email}','${name}','default.jpg', ARRAY['']);`);
		res.json(newUser.rows);
	} catch (error) {
		res.json(error);
	}
});

app.put('/auth/edit/:id', async(req, res) => {
	try {
		const {email} = req.params;
		const {friends} = req.body;
		const user = await pool.query(`UPDATE users SET friends = ARRAY[${friends}] WHERE email='${email}';`);
		console.log(user);
		res.json(user.rows);
	} catch (error) {
		res.json(error);
	}
});

// get all user media
app.get('/media/:id', async(req, res) => {
	try {
		const {id} = req.params;
		const media = await pool.query(`SELECT * FROM recommendation WHERE email = '${id}'`);
		res.json(media.rows);
	} catch (error) {
		res.json(error);
	}
});

// make media
app.post('/media', async(req, res) => {
	try {
		const {id} = req.params;
		const media = await pool.query(`SELECT * FROM recommendation WHERE email = '${id}'`);
		res.json(media.rows);
	} catch (error) {
		res.json(error);
	}
});
  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});