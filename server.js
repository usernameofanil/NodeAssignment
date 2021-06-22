const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')


mongoose.connect('mongodb+srv://root:root@cluster0.rpg7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use(bodyParser.json())




app.get('/getData',async(req,res)=>{	
	const data = await User.find().sort([['total',-1]]);
	const count = await User.countDocuments()
	console.log("Number of students",count)
	let first_round_avg = 0;
	let second_round_avg = 0;
	let third_round_avg = 0;
	
	for(let i=0; i<count; i++){
		first_round_avg = first_round_avg + data[i].first_round;
		second_round_avg = second_round_avg + data[i].second_round;
		third_round_avg = third_round_avg + data[i].third_round;
	}
	first_round_avg = first_round_avg/count;
	second_round_avg = second_round_avg/count;
	third_round_avg = third_round_avg/count;


	const winner = data[0]
	res.json({winner,first_round_avg,second_round_avg,third_round_avg})
	})



app.post('/saveData', async (req, res) => {
	const { name,email, first_round,second_round,third_round} = req.body
	const total = first_round+second_round+third_round;
	const average = total/3;

	try {
		const response = await User.create({
			name,
			email,
			first_round,
			second_round,
			third_round,
			total,
			average
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username or email already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})
