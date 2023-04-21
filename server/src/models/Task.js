const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: String,
  status: String,
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


const Task = mongoose.model('Task', TaskSchema, 'task')

module.exports = Task
