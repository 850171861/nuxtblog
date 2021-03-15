const state = () => ({
  tagList: []
})
const mutations = {
  setTagList (state, value) {
    state.tagList = value.tagList
  }
}

export default {
  state,
  mutations
}
