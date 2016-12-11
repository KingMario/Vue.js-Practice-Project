import Vue from 'vue'
import Vuex from 'vuex'
import PassengerInfo from 'src/components/PassengerInfo'
import store from 'src/vuex/store'

Vue.use(Vuex)

window.flights = [{
  flightCode: 'CA1794',
  aircraft: '空中客车 A320',
  departInfo: {
    city: '呼和浩特',
    airport: '白塔国际机场',
    terminal: '',
    time: '2016-10-31 19:25'
  },
  arriveInfo: {
    city: '杭州',
    airport: '萧山国际机场',
    terminal: 'T1',
    time: '2016-10-31 21:50'
  },
  subclass: 'Y',
  supplier: {
    name: '上海华程西南旅行社有限公司',
    code: '08309722'
  }
}, {
  flightCode: 'CA1731',
  aircraft: '空中客车 A321',
  departInfo: {
    city: '杭州',
    airport: '萧山国际机场',
    terminal: 'T1',
    time: '2016-11-01 07:30'
  },
  arriveInfo: {
    city: '深圳',
    airport: '宝安国际机场',
    terminal: 'T3',
    time: '2016-11-01 09:50'
  },
  subclass: 'Y',
  supplier: {
    name: '上海华程西南旅行社有限公司',
    code: '08309722'
  }
}]

describe('PassengerInfo.vue', () => {
  const vm = new Vue({
    store,
    vuex: {
      getters: {
        passengers: state => state.passengers
      }
    },
    template: '<div><passenger-info :passenger="passengers[0]"></passenger-info></div>',
    components: { PassengerInfo }
  }).$mount()

  it('should count validated passenger 0', () => {
    expect(store.state.passengerValidated).to.equal(0)
  })
  it('should remain invalid with card number blank', () => {
    store.state.passengers[0].name = '马大哈'
    store.state.passengers[0].idType = 'ID_Type_07'
    expect(vm.$children[0].cardNumberValidated).to.equal('')
  })
  it('should check wrong ID card and return false', () => {
    store.state.passengers[0].cardNumber = '32102419800101010X'
    expect(vm.$children[0].cardNumberValidated).to.equal(false)
  })
  it('should check right ID card and return true', () => {
    store.state.passengers[0].cardNumber = '321024198001010108'
    expect(vm.$children[0].cardNumberValidated).to.equal(true)
  })
  it('should validate the passenger', () => {
    expect(vm.$children[0].validated).to.equal(true)
  })
  it('should update total validated passenger count', () => {
    vm.$children[0].updatePassengerValidated(true)
    expect(store.state.passengerValidated).to.equal(1)
  })
  it('should reduce validated count on deleting a validated passenger', () => {
    vm.$children[0].deletePassenger(store.state.passengers[0])
    expect(store.state.passengers.length).to.equal(1)
    expect(store.state.passengerValidated).to.equal(0)
  })
  it('should not reduce validated count on deleting a invalid passenger', () => {
    vm.$children[0].deletePassenger(store.state.passengers[0])
    expect(store.state.passengers.length).to.equal(1)
    expect(store.state.passengerValidated).to.equal(0)
  })
})
