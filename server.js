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
	console.log("Jo hego count ko number",count)
	let m1avg = 0;
	let m2avg = 0;
	let m3avg = 0;
	
	for(let i=0; i<count; i++){
		m1avg = m1avg + data[i].marks1;
		m2avg = m2avg + data[i].marks2;
		m3avg = m3avg + data[i].marks3;
	}
	m1avg = m1avg/count;
	m2avg = m2avg/count;
	m3avg = m3avg/count;


	const winner = data[0]
	res.json({winner,m1avg,m2avg,m3avg})
	})



app.post('/saveData', async (req, res) => {
	const { username,email, marks1,marks2,marks3} = req.body
	const total = marks1+marks2+marks3;
	const average = total/3;

	try {
		const response = await User.create({
			username,
			email,
			marks1,
			marks2,
			marks3,
			total,
			average
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})
