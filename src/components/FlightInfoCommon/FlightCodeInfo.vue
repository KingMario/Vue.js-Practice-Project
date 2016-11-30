<template>
  <div class="flight-title">
    <div class="flight-title-single" v-if="!flight.sharedFlightCode">
      <flight-code-title :flight-code="flight.flightCode"></flight-code-title>
      {{ flight.aircraft }} {{ subclasses[flight.subclass] }}
    </div>
    <div class="flight-title-group" v-else>
      <div>
        <flight-code-title :flight-code="flight.flightCode"></flight-code-title>
        {{ flight.aircraft }} {{ subclasses[flight.subclass] }}
      </div>
      <div class="shared-flight-title">
        实际乘坐
        <flight-code-title :flight-code="flight.sharedFlightCode"></flight-code-title>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FlightCodeTitle from './FlightCodeTitle.vue'
  import {subclasses} from '../../js/flightInfo/flightInfoConsts'

  export default {
    data () {
      return {
        subclasses
      }
    },
    props: ['flight'],
    components: {
      FlightCodeTitle
    }
  }
</script>
