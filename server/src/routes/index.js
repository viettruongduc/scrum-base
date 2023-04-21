const taskRouter = require('./Task')

const route = (app) => {
  app.use('', taskRouter)
}

module.exports = route