<template>
  <div class="m-t m-b">
    <insurance :insurances="insurances" keep-alive></insurance>
    <hr>
    <airport-service :airport-services="airportServices" keep-alive></airport-service>
    <hr>
    <car-service :car-services="carServices"></car-service>
  </div>
</template>

<script type="text/ecmascript-6">
  import Promise from 'promise-polyfill'

  if (!window.Promise) {
    window.Promise = Promise
  }
  import 'whatwg-fetch'

  import Insurance from './Insurance'
  import AirportService from './AirportService'
  import CarService from './CarService'

  export default {
    data () {
      return {
        insurances: [],
        airportServices: [],
        carServices: []
      }
    },
    props: [],
    vuex: {
      getters: {
        passengerValidated: state => state.passengerValidated,
        passengerCount: state => state.passengers.length,
        passengerTypes: state => state.passengerTypes,
        services: state => state.services
      }
    },
    route: {
      activate ({redirect, next}) {
        this.passengerValidated === this.passengerCount ? next() : redirect('/')
      }
    },
    components: {
      Insurance,
      AirportService,
      CarService
    },
    created () {
      /* global fetch:false */
      fetch('/api/insurances').then((response) => {
        return response.json()
      }).then((json) => {
        this.insurances = json
      }).catch((ex) => {
        console.log('parsing insurances failed', ex)
      })

      fetch('/api/airportServices').then((response) => {
        return response.json()
      }).then((json) => {
        this.airportServices = json
      }).catch((ex) => {
        console.log('parsing airport services failed', ex)
      })

      fetch('/api/carServices').then((response) => {
        return response.json()
      }).then((json) => {
        this.carServices = json
      }).catch((ex) => {
        console.log('parsing car services failed', ex)
      })
    }
  }
</script>
