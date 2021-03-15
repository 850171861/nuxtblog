import Router from '@koa/router'
import WarehouseController from '../../api/WarehouseController'


const router = new Router()
router.prefix('/api')

router.get('/getWarehouse', WarehouseController.getWarehouse)

export default router
