export default {
  state: {
    errorList: null
  },

  getters: {
    errorList: state => state.errorList
  },

  mutations: {
    addError: (state, error) => {
      state.profile = error
    },
    removeError: (state, error) => {
      state.profile = error
    }
  },

  addError: {
    addError: function(context, error) {
      context.commit('addError', error)
    },
    removeError: function(context, error) {
      context.commit('removeError', error)
    }
  }
}
