const User = require('../models').User;
const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {
	const user = new User();
	const { fname, lname, email, password } = req.body;
	if (!fname || !lname || !email || !password) {
		return res.json({
			success: false,
			error: 'Not all fields have been completed'
		});
	}
	bcrypt.hash(password, 10).then(hash => {
		user.fname = fname;
		user.lname = lname;
		user.email = email;
		user.password = hash;
		user.save(err => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true });
		});
	});
};

exports.createFoodRecord = (req, res) => {
	const { foodData, trackDate } = req.body;
	const { userId } = req.params;
	User.findById(userId, (error, user) => {
		user.food.push({
			recordDate: trackDate,
			grain: foodData.grain,
			wholeGrain: foodData.wholeGrain,
			fruit: foodData.fruit,
			veggies: foodData.veggies,
			dairy: foodData.dairy,
			meats: foodData.meats,
			seedsLegumes: foodData.seedsLegumes,
			fatsSweets: foodData.fatsSweets
		});
		user.save(err => {
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
};

exports.updateFoodRecord = (req, res) => {
	const { foodData } = req.body;
	const { userId, foodRecordId } = req.params;
	User.findById(userId, (error, user) => {
		console.log(error)
		const record = user.food.id(foodRecordId);
		record.grain = foodData.grain;
		record.wholeGrain = foodData.wholeGrain;
		record.fruit = foodData.fruit;
		record.veggies = foodData.veggies;
		record.dairy = foodData.dairy;
		record.meats = foodData.meats;
		record.seedsLegumes = foodData.seedsLegumes;
		record.fatsSweets = foodData.fatsSweets;
		user.save(err => {
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
};

module.exports = exports;
