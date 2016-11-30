<template>
  <div class="text-center flight-info">
    <supplier :flight="flights[0]" v-if="flights[0].supplier"></supplier>
    <flight-header :flight="flights[0]"
                   :arrive-city="flights[0].arriveInfo.city"></flight-header>
    <flight-code-info :flight="flights[0]"></flight-code-info>
    <flight-detail :flight="flights[0]"></flight-detail>
  </div>
</template>

<script type="text/ecmascript-6">
  import Supplier from './FlightInfoCommon/Supplier.vue'
  import FlightHeader from './FlightInfoCommon/FlightHeader.vue'
  import FlightCodeInfo from './FlightInfoCommon/FlightCodeInfo.vue'
  import FlightDetail from './FlightInfoCommon/FlightDetail.vue'

  import {flightInfoValidator} from '../js/flightInfo/flightInfoFns'

  export default {
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

<style lang="less" rel="stylesheet/less" scoped>

</style>
