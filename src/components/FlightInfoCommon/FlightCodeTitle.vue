<template>
  <span>
    <img :src="'/static/img/' + flightCompanyCode + '.png'" class="flight-image">{{ flightCompanyName }} {{ flightCode }}
  </span>
</template>

<script type="text/ecmascript-6">
  import {flightCompanies} from '../../js/flightInfo/flightInfoConsts'

  export default {
    props: ['flightCode'],
    computed: {
      flightCompanyCode: function () {
        return this.flightCode.substr(0, 2).toLowerCase()
      },
      flightCompanyName: function () {
        return flightCompanies[this.flightCompanyCode]
      }
    }
  }
</script>
