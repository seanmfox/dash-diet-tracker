const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./models').User;
const userRoutes = require('./routes/users');
const jwt = require('jsonwebtoken');
// const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

require('dotenv').config();

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3001;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

router.post('/usersignin/', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		// we should throw an error. we can do this check on the front end
		return res.json({
			success: false,
			error: 'You must provide a email and password'
		});
	}
	User.findOne({ email: email.toLowerCase() }, (err, doc) => {
		if (!doc)
			return res.json({
				success: false,
				error: 'The email or password do not match.  Please try again.'
			});
		return bcrypt.compare(password, doc.password).then(response => {
			if (!response)
				return res.json({
					success: false,
					error: 'The email or password do not match.  Please try again.'
				});
			return res.json({
				token: jwt.sign(
					{
						userId: doc._id,
					},
					process.env.SECRET_KEY
				),
				success: true,
				user: {
					userId: doc._id,
					fname: doc.fname,
					lname: doc.lname,
					email: doc.email,
					food: doc.food,
					exercise: doc.exercise
				}
			});
		});
	});
});

//Authenticate user if already signed in
router.get('/authuser', (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		User.findById(decoded.userId, (err, user) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({
				success: true,
				user: {
					userId: user._id,
					fname: user.fname,
					lname: user.lname,
					email: user.email,
					food: user.food,
					exercise: user.exercise
				}
			});
		});
	});
});

app.use('/api', router);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(`${__dirname}/../frontend/build`));

	// Handle React routing, return all requests to React app
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
	});
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
