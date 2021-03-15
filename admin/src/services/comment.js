import {
    COMMENT,
    DELETE_COMMENT
} from '@/services/api'
import {
    request,
    METHOD
} from '@/utils/request'

// 获取评论数据
export async function comment() {
    return request(COMMENT, METHOD.GET)
}
// 删除评论数据
export async function deleteComment(data) {
    return request(DELETE_COMMENT, METHOD.POST, data)
}
