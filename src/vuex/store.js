import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  passengers: [{
    name: '',
    idType: 'ID_Type_01',
    cardNumber: '',
    birthday: '',
    type: 'ADU',
    validated: false
  }],
  passengerValidated: 0,
  passengerTypes: {
    ADU: 1,
    CHI: 0,
    BAB: 0
  }
}

const mutations = {
  ADD_PASSENGER (state, passenger) {
    state.passengers.push(passenger)
    state.passengerTypes[passenger.type]++
  }
}

export default new Vuex.Store({
  state,
  mutations
})
