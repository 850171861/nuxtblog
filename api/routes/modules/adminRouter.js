import Router from '@koa/router'
import CategoryController from '../../api/CategoryController'
import TagController from '../../api/TagController'
import CommentsController from '../../api/CommentController'
import WarehouserController from '../../api/WarehouseController'
import ArticleController from '../../api/ArticleController'
import ErrorLogController from '../../api/ErrorLogController'
const router = new Router()

router.prefix('/admin')
// 新增分类
router.post('/addCategory', CategoryController.addCategory)
// 修改分类
router.post('/updateCategory', CategoryController.updateCategory)
// 分类删除
router.post('/deleteCategory', CategoryController.deleteCategory)

// 新增标签
router.post('/addTag', TagController.addTag)
// 修改标签
router.post('/updateTag', TagController.updateTag)
// 删除标签
router.post('/deleteTag', TagController.deleteTag)

// 删除评论
router.post('/deleteComment', CommentsController.deleteComment)

// 添加仓库
router.post('/addWarehouse', WarehouserController.addWarehouse)
// 修改仓库
router.post('/updateWarehouse', WarehouserController.updateWarehouse)
// 删除仓库
router.post('/deleteWarehouse', WarehouserController.deleteWarehouse)

// 上传图片
router.post('/uploadImg', ArticleController.uploadImg)

// 增加文章
router.post('/addArticle', ArticleController.addArticle)
// 修改文章
router.post('/updateArticle', ArticleController.updateArticle)
// 删除文章
router.post('/deleteArticle', ArticleController.deleteArticle)

// 获取错误日志
router.get('/getErrorLog', ErrorLogController.getErrorLog)
// 删除错误日志
router.post('/deleteErrorLog', ErrorLogController.deleteErrorLog)

export default router