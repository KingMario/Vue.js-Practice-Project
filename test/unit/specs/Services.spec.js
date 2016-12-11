import Vue from 'vue'
import Vuex from 'vuex'
import Services from 'src/components/Services'
import store from 'src/vuex/store'
import servicesData from '../../../server-files/db.json'

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

describe('Services.vue', () => {
  const vm = new Vue({
    store,
    vuex: {
      getters: {
        passengers: state => state.passengers
      }
    },
    template: '<div><Services></Services></div>',
    components: {Services}
  }).$mount()

  const servicesVm = vm.$children[0]

  it('should have 3 children', () => {
    expect(servicesVm.$children.length).to.equal(3)
  })

  it(`should show ${servicesData.insurances.length} kinds of insurances`, () => {
    setTimeout(() => expect(servicesVm.$children[0].$el.querySelectorAll('input').length).to.equal(servicesData.insurances.length), 3000)
  })

  it(`should show ${servicesData.airportServices.length} kinds of airport services`, () => {
    setTimeout(() => expect(servicesVm.$children[1].$el.querySelectorAll('input').length).to.equal(servicesData.airportServices.length), 3000)
  })

  it(`should show ${servicesData.carServices.length} kinds of car services`, () => {
    setTimeout(() => expect(servicesVm.$children[2].$el.querySelectorAll('input').length).to.equal(servicesData.carServices.length), 3000)
  })
})
