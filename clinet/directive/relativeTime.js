import Vue from 'vue'
import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
moment.extend(relativeTime)

const filters = {
  moment(date) {
    // 超过7天，显示日期
    if (moment(date).isBefore(moment().subtract(7, 'days'))) {
      return moment(date).format('YYYY-MM-DD')
    } else {
      // 1小前，xx小时前，X天前
      return moment(date).locale('zh-cn').from(moment())
    }
  }
}

export default filters
