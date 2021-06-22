const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		marks1: { type: Number, required: true },
		marks2: { type: Number, required: true },
		marks3: { type: Number, required: true },
		total: { type: Number, required: true },
		average: { type: Number, required: true },



	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
