const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

const TaskController = require('./src/app/controllers/TaskController')

const Task = require('./src/app/models/Task');

// Add headers before the routes are defined
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.listen(PORT, () => {
	console.log(`Example app listening on PORT ${PORT}`)
})

// app.get('/', TaskController.index)

app.get("/", async (req, res) => {
	try {
		const tasks = await Task.find();
		// await tasks.forEach(console.log);
		res.send(tasks);
	} catch (err) {
		console.log(err);
	}
});

app.post("/", async (req, res) => {
	const fetchID = () => Math.random().toString(36).substring(2, 10);
	const body = req.body;
	let result = await Task.create({
		id: fetchID(),
		title: 'completed',
		items: {
			id: fetchID(),
			title: 'login page',
		},
	})
	res.send(result).status(204);
});

