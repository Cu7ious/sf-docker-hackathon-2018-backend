// See http://mongoosejs.com/docs/models.html
const mongoose = require('mongoose')
// const taskSchema = require('../task')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  // Basic fields
  id: { type: String },
  name: { type: String},
  boards: { type: Object, default: {
                ToDo: [],
                InProgress: [],
                Done: []
        }
  },
  // Misc
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

const projectModel = mongoose.model('project', projectSchema)

module.exports = projectModel
