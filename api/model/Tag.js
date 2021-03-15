import mongoose from '../config/dbConfig'

const Schema = mongoose.Schema

const tagsSchema = new Schema({
  name: { type: String },
  icon: { type: String },
  created: {
    type: Date
  },
  status: {
    type: Number
  }
})
tagsSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

const tagsModel = mongoose.model('tag', tagsSchema)

export default tagsModel
