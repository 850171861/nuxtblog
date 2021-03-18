import {
  tagList
} from '@/api/tag'
import {
  categoryList
} from '@/api/category'
import {
  hotArticle
} from '@/api/article'
import {
  getcomment
} from '@/api/comment'
export const actions = {
  async nuxtServerInit({
    commit
  }, {
    req
  }) {
    { // 获取标签列表
      const {
        data
      } = await tagList({
        status: 1
      })
      commit('tag/setTagList', {
        tagList: data
      })
    }
    // 获取分类列表
    {
      const {
        data
      } = await categoryList({
        status: 1
      })

      commit('category/setCategoryList', {
        categoryList: data
      })
    }

    //  获热门文章前10篇
    {
      const {
        data
      } = await hotArticle()
      commit('article/setHotArticle', {
        hotArticle: data
      })
    }

    // 获取评论列表
    // {
    //   const { data } = await getcomment()
    //   commit('comment/setCommentList', { commentList: data })
    // }
  }
}
