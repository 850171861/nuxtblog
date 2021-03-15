import Router from '@koa/router'
import ArticleController from '../../api/ArticleController'

const router = new Router()

router.prefix('/api')

router.get('/articlelist', ArticleController.getArticleList)
router.get('/getArticleInfo', ArticleController.getArticleInfo)
router.get('/hotArticle', ArticleController.hotArticle)
router.get('/getArchive', ArticleController.getArchive)





export default router
