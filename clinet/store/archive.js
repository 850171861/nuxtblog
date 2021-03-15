import {
  getArchive
} from '@/api/archive'

const state = () => ({
  total: 0,
  archiveList: []
})

const mutations = {
  setArchive (state, value) {
    state.total = value.data.total
    state.data
  }
}

const actions = {
  async setArchive ({
    commit
  }) {
    const {
      data
    } = await getArchive()
    commit('setArchive', {
      archiveList: data
    })
  }
}
export default {
  state,
  mutations,
  actions
}
