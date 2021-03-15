import combineRoutes from 'koa-combine-routers'

// 引入路由
import articleRouter from './modules/articleRouter'
import categoryRouter from './modules/categoryRouter'
import labelRouter from './modules/tagRouter'
import commentRouter from './modules/commentRouter'
import warehouse from './modules/warehouse'
import userRouter from './modules/userRouter'
import adminRouter from './modules/adminRouter'
// 使用combineRoutes组合多个路由的实例
export default combineRoutes(
  articleRouter,
  categoryRouter,
  labelRouter,
  commentRouter,
  warehouse,
  userRouter,
  adminRouter
)
