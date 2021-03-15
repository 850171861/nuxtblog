import Router from '@koa/router'
import CategoryController from '../../api/CategoryController'

const router = new Router()

router.prefix('/api')

router.get('/categorylist', CategoryController.getCategoryList)

export default router