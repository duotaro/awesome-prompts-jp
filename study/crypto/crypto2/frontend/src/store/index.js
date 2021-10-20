import { createStore } from 'vuex'

export default createStore({
  state: {
    oiData : {},
    frData : {},
    lsData : {},
    volData : {},
    btcMarketDataMap: new Map(),
    ethMarketDataMap: new Map()
  },
  mutations: {
    setOi(state, payload) {
      state.oiData = payload.data
    },
    setFr(state, payload) {
      state.frData = payload.data
    },
    setLs(state, payload) {
      state.lsData = payload.data
    },
    setVol(state, payload) {
      state.volData = payload.data
    },
    setMarketData(state, payload) {
      if(payload.marketName == 'BTC') {
        state.btcMarketDataMap = payload.data
      } else if(payload.marketName == 'ETH') {
        state.ethMarketDataMap = payload.data
      }
    }
  },
  actions: {
    setOi({ commit }, payload) {
      commit('setOi', payload)
    },
    setFr({ commit }, payload) {
      commit('setFr', payload)
    },
    setLs({ commit }, payload) {
      commit('setLs', payload)
    },
    setVol({ commit }, payload) {
      commit('setVol', payload)
    },
    setMarketData({ commit, state }, payload) {
      const marketName = payload.marketName;
      // marketNameに該当するデータを取得する
      let marketData = null;
      if(marketName == 'BTC') {
        marketData = state.btcMarketDataMap
      } else if(marketName == 'ETH') {
        marketData = state.ethMarketDataMap
      }
      let result = marketData ? marketData : new Map()
      for(const item of payload.data){
        result.set(item.time/1000, item)
      }
      commit('setMarketData', {marketName: marketName, data: result})
    }
  },
  modules: {
  }
})
