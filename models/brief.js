const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

const briefSchema = new mongoose.Schema({
  briefTitle: {
    type: String,
    required: true,
    minLength: [5, 'Brief title must be at least 5 characters long']
  },
  oneLiner: {
    type: String,
    required: true,
    minLength: [5, 'One liner must be  at leaser 5 characters long']
  },
  dueDate: {
    type: Date,
    required: true,
  },
  estimatedBudget : Number,
  briefCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  //using ref 'User becasue i m referencing to user model and it's exported as User
  task: String,
  brand: String,
  deliverables: String,
  publish: Boolean,
  view: Number,
  awarded: Boolean,
  isDeleted: Boolean,
})


const Brief = mongoose.model('Brief', briefSchema)

module.exports = Brief
