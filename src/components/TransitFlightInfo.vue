<template>
  <div class="text-center flight-info">
    <supplier :flight="flights[0]" v-if="flights[0].supplier"></supplier>
    <flight-header :flight="flights[0]"
                   :arrive-city="flights[1].arriveInfo.city"></flight-header>
    <flight-code-info :class="{'m-b-0': !transitExpanded}" :flight="flights[0]"></flight-code-info>
    <flight-code-info class="m-t-0" :flight="flights[1]" v-if="!transitExpanded"></flight-code-info>
    <flight-detail :flight="flights[0]"
                   :leg="1"
                   :transit-expanded="transitExpanded"
                   :transit-time="transitTime"
                   :transit-flight="flights[1]"></flight-detail>
    <div class="transit-info" v-if="transitExpanded">{{flights[0].arriveInfo.city}}中转<span
      class="glyphicon glyphicon-time"></span>{{transitTime}}
    </div>
    <flight-code-info :flight="flights[1]" v-if="transitExpanded"></flight-code-info>
    <flight-detail :flight="flights[1]"
                   :leg="2"
                   :first-depart-date-time="flights[0].departInfo.time"
                   v-if="transitExpanded"></flight-detail>
    <div class="transit-expand-toggle" @click="transitExpanded = !transitExpanded">
      <span class="glyphicon m-t m-b"
            :class="transitExpanded ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Supplier from './FlightInfoCommon/Supplier.vue'
  import FlightHeader from './FlightInfoCommon/FlightHeader.vue'
  import FlightCodeInfo from './FlightInfoCommon/FlightCodeInfo.vue'
  import FlightDetail from './FlightInfoCommon/FlightDetail.vue'

  import {flightInfoValidator, getDuration} from '../js/flightInfo/flightInfoFns'

  export default {
    data () {
      return {
        transitExpanded: false
      }
    },
    computed: {
      transitTime () {
        return getDuration(new Date(this.flights[0].arriveInfo.time),
          new Date(this.flights[1].departInfo.time))
      }
    },
    props: {
      flights: {
        required: true,
        type: Array,
        validator: flightInfoValidator
      }
    },
    components: {
      Supplier,
      FlightHeader,
      FlightCodeInfo,
      FlightDetail
    }
  }
</script>
