import Router from '@koa/router'
import TagController from '../../api/TagController'

const router = new Router()

router.prefix('/api')

router.get('/taglist', TagController.getTagList)

export default router
