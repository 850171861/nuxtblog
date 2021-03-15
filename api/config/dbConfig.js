import mongoose from 'mongoose'
const dbPort = 'mongodb://42.194.181.187:27017/blogdb'

// 创建连接
mongoose.connect(dbPort, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + dbPort);
})

// 连接异常
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err)
})

// 断开连接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

export default mongoose