const state = {
  cartCount: 0
};

const mutations = {
  setCartCount(state, num) {
    state.cartCount = num;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}