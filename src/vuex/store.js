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
  },
  services: {
    insurances: [],
    airportServices: [],
    carServices: []
  }
}

const ADD_PASSENGER = (state) => {
  state.passengers.push({
    name: '',
    idType: 'ID_Type_01',
    cardNumber: '',
    birthday: '',
    type: 'ADU',
    validated: false
  })
  state.passengerTypes.ADU++
}
const mutations = {
  ADD_PASSENGER,
  UPDATE_PASSENGER_VALIDATED (state, validated) {
    validated ? state.passengerValidated++ : state.passengerValidated--
  },
  UPDATE_PASSENGER_TYPE (state, oldType, newType) {
    state.passengerTypes[oldType]--
    newType && state.passengerTypes[newType]++
  },
  DELETE_PASSENGE (state, passenger) {
    passenger.validated && state.passengerValidated--
    state.passengerTypes[passenger.type]--
    const index = state.passengers.indexOf(passenger)
    state.passengers.splice(index, 1)

    if (state.passengers.length === 0) {
      ADD_PASSENGER(state)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
