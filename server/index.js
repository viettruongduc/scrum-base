const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./src/routes')
require('dotenv').config()

// set port number
const PORT = 4000

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

mongoose.createConnection(process.env.ATLAS_URI)

route(app)

app.listen(PORT, () => {
	console.log(`Example app listening on PORT ${PORT}`)
})

