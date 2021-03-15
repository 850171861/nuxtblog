import Router from '@koa/router'
import CommentController from '../../api/CommentController'

const router = new Router()

router.prefix('/api')

router.get('/getComment', CommentController.getComment)
router.post('/addComment', CommentController.addComment)

export default router
