// See http://mongoosejs.com/docs/models.html
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  // Basic fields
  id: { type: String },
  text: { type: String },
  // project: { type: String },
  // board: { type: String },

  // Misc
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

const taskModel = mongoose.model('project.task', taskSchema)

module.exports = taskModel
