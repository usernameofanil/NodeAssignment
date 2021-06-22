const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		first_round: { type: Number, required: true },
		second_round: { type: Number, required: true },
		third_round: { type: Number, required: true },
		total: { type: Number, required: true },
		average: { type: Number, required: true },



	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
