const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
	recordDate: Date,
	grain: Number,
	wholeGrain: Number,
	fruit: Number,
	veggies: Number,
	dairy: Number,
	meats: Number,
	seedsLegumes: Number,
	fatsSweets: Number
});

const ActivitySchema = new Schema({
	activityType: String,
	activityDuration: Number,
	activityDate: Date
})

const UserSchema = new Schema(
	{
		fname: String,
		lname: String,
		email: { type: String, sparse: true, lowercase: true },
		password: { type: String },
		food: [FoodSchema],
		exercise: [ActivitySchema]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
