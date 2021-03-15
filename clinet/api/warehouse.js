import axios from '@/utils/request'

const getWarehouse = () => axios.get('/getWarehouse')

export {
  getWarehouse
}
