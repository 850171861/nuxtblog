import mongoose from '../config/dbConfig'

const Schema = mongoose.Schema

const WarehouseSchema = new Schema({
  created: {
    type: Date
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  url: {
    type: String
  }
})

WarehouseSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

const WarehouseModel = mongoose.model('warehouse', WarehouseSchema)

export default WarehouseModel
