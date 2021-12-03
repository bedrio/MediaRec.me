const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 3001
const pool = require('./db');

// LOGIN
app.get('/auth/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const user = await pool.query(`SELECT *
                                       FROM USERS
                                       WHERE email = '${id}'`);
		res.json(user.rows);
	} catch (error) {
		res.json(error);
	}
});

// Create a new user - SIGNUP
app.post('/auth', async (req, res) => {
	try {
		const {name, email, color} = req.body;
		const newUser = await pool.query(`INSERT INTO USERS (email, name, profile_pic, friends)
                                          VALUES ('${email}', '${name}', '${color}', ARRAY['']);`);
		res.json(newUser.rows);
	} catch (error) {
		res.json(error);
	}
});

// Add new friend
app.put('/auth/edit/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {friends} = req.body;

		let str = ""
		let friendsCpy = friends.toString().split(",")
		friendsCpy.forEach(frnd => {
			str += "'" + frnd + "',"
		})
		str = str.slice(0, -1)


		const user = await pool.query(`UPDATE USERS
                                       SET friends = ARRAY[${str}]
                                       WHERE email = '${id}';`);
		console.log(user.rows);
		res.json(user.rows);
	} catch (error) {
		res.json(error);
	}
});

// get all user media
app.get('/media/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const media = await pool.query(`SELECT *
                                        FROM recommendation
                                        WHERE email = '${id}'`);
		res.json(media.rows);
	} catch (error) {
		res.json(error);
	}
});

// Create media
app.post('/media/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const newMedia = req.body;
		console.log(newMedia)
		const media = await pool.query(`INSERT INTO RECOMMENDATION (show_id, title, description, email,
                                                                    recommender_rating, community_rating,
                                                                    recommender_review, category, tags)
                                        VALUES (${newMedia.showID}, '${newMedia.name}', '${newMedia.summary}', '${id}',
                                                ${newMedia.recRating}, ${newMedia.comRating}, '${newMedia.recReview}',
                                                '${newMedia.category}', ARRAY['']);`);
		res.json(media.rows);
	} catch (error) {
		console.log(error)
		res.json(error);
	}
});

app.put('/media/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const newMedia = req.body;
		console.log(newMedia)
		const media = await pool.query(`UPDATE recommendation
                                        SET title='${newMedia.name}',
                                            description='${newMedia.summary}',
                                            recommender_rating=${newMedia.recRating},
                                            community_rating=${newMedia.comRating},
                                            recommender_review='${newMedia.recReview}',
                                            category='${newMedia.category}',
                                            tags=ARRAY['']
                                        WHERE show_id = ${id};`);
		res.json(media.rows);
	} catch (error) {
		console.log(error)
		res.json(error);
	}
});

app.delete('/media/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const media = await pool.query(`DELETE
                                        from RECOMMENDATION
                                        WHERE show_id = ${id};`);
		res.json(media.rows);
	} catch (error) {
		console.log(error)
		res.json(error);
	}
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
});