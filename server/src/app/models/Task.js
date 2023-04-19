const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema({
  id: String,
  title: String,
  items: {
    id: String,
    title: String,
  },
  date: Date
});

// module.exports = mongoose.model('Task', Task)


const taskDB = mongoose.createConnection('mongodb+srv://task-management:mBpbpR0oFvshoghP@task-management.yrlbnwg.mongodb.net/?retryWrites=true&w=majority').useDb('task-management')
const Task = taskDB.model('Task', TaskSchema, 'task')

module.exports = Task
