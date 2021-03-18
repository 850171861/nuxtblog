import {
  hotArticle,
  getArticleList
} from '../api/article'

const state = () => ({
  hotArticle: [], // 热门文章
  articleList: [] // 文章列表
})

const mutations = {
  setHotArticle(state, value) {
    state.hotArticle = value.hotArticle
  },

  setArticleList(state, value) {
    state.articleList = []
    state.articleList = value.articleList
  }
}

const actions = {
  async setArticleList({
    commit,
    state
  }, obj) {
    const data = await getArticleList(obj)

    commit('setArticleList', {
      articleList: data
    })
  }
}

export default {
  state,
  mutations,
  actions
}
