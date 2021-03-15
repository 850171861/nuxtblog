import Router from '@koa/router'
import UserController from '../../api/UserController'

const router = new Router()

router.prefix('/login')

router.post('/login', UserController.login)

export default router
