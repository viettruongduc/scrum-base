const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = 4000;
require('dotenv').config();

const Task = require('./src/app/models/Task');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.listen(PORT, () => {
	console.log(`Example app listening on PORT ${PORT}`)
})

app.get("/", async (req, res) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (err) {
		console.log(err);
	}
});

app.post("/", async (req, res) => {
	const fetchID = () => Math.random().toString(36).substring(2, 10);
	const data = req.body.data
	const index = fetchID()
	let result = await Task.create({
		id: index,
		title: data.status,
		items: {
			id: index,
			title: data.title,
			link: data.link,
			label: data.label,
			device: data.device,
			deadline: data.deadline,
		},
	})
	res.send(result).status(204);
});

app.patch("/", async (req, res) => {
	try {
		const { body } = req;
		await Task.updateOne({ id: body.id }, { title: body.title }).exec()
	} catch (err) {
		console.log(err);
	}
});