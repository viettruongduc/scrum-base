const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: String,
  title: String,
  items: {
    id: String,
    title: String,
    link: String,
    device: String,
    deadline: String,
    label: String,
  },
  date: Date
});


const taskDB = mongoose.createConnection(process.env.ATLAS_URI).useDb(process.env.DB_NAME)
const Task = taskDB.model('Task', TaskSchema, process.env.COLLECTION_NAME)

module.exports = Task
