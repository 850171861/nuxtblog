const state = () => ({
  categoryList: []
})
const mutations = {
  setCategoryList (state, value) {
    state.categoryList = value.categoryList
  }
}

export default {
  state,
  mutations
}
