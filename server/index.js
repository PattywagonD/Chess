const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const expensesRouter = require('./routes/expenses')

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../client`))
app.use(morgan('tiny'))

app.use('/expenses', expensesRouter)

app.use((req, res, next) => {
	if (req.error) {
		// Came from controller
		switch(req.error.name) {
		case 'ValidationError':
			res.status(422).json({
				message: req.error.message
			})
		break
		default:
		res.status(500).send()
		}
	} else {
		// We fell through
		res.status(404).send()
	}
})

mongoose.connect('mongodb://localhost:27017/pattywagondata')
	.then(() => {
		app.listen(3000)
	})
