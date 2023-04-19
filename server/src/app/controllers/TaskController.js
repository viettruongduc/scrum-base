
// const Task = new Schema({
//   author: ObjectId,
//   title: String,
//   body: String,
//   date: Date
// });

const Task = require('../models/Task');

// import Task from '../../models/Task';

class TaskController {

  index(req, res) {
    try {
      Task.find({}, function (err, tasks) {
        if (!err) res.json(tasks);
        res.status(400).json({ message: 'Task not found' })
      })

    } catch (error) {
      console.error(error);
    }
  }

  // store(req, res, next) {

  // }
}

// Task. 


module.exports = new TaskController;