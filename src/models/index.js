const config = require('config')
const mongoose = require('mongoose')
const projectModel = require('./project')
const taskModel = require('./project')

const { MONGO_URL } = config

mongoose.connect(MONGO_URL, { useMongoClient: true })
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log(`Connected to DB: ${MONGO_URL}`)
})

module.exports = {
  project: projectModel,
  task: taskModel
}
