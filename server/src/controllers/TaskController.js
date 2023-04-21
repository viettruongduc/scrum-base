const Task = require('../models/Task');

class TaskController {

  // [GET]
  index(req, res) {
    Task.find().then((data) => {
      res.send(data);
    })
  }

  // [POST]
  store(req, res,) {
    const data = req.body.data
    const index = Math.random().toString(36).substring(2, 10)

    const result = Task.create({
      id: index,
      status: data.status,
      items: {
        id: index,
        title: data.title,
        link: data.link,
        label: data.label,
        device: data.device,
        deadline: data.deadline,
      },
    })
    res.send(result).status(204)
  }

  // [PATCH]
  update(req, res, next) {
    const { body } = req
    Task.updateOne({ id: body.id }, { title: body.title }).exec()
    res.send().status(200)
  }
}

module.exports = new TaskController;