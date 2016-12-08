<template>
  <div class="price-info">
    <template v-for="(key, value) in passengerTypes">
      <div class="cost-detail" v-if="value">
        <price-item :title="passengerTypeNames[key] + '票'"
                    :unit-price="priceInfo[key].ticket"
                    :count="value"></price-item>
        <price-item :title="'民航发展基金（' + passengerTypeNames[key] + '）'"
                    :unit-price="priceInfo[key].airportFee"
                    :count="value"></price-item>
        <price-item :title="'燃油税（' + passengerTypeNames[key] + '）'"
                    :unit-price="priceInfo[key].oilTax"
                    :count="value"></price-item>
      </div>
    </template>
    <div class="cost-detail" v-show="services.insurances.length">
      <price-item v-for="insurance in services.insurances | orderBy 'id'"
                  :title="insurance.name"
                  :unit-price="insurance.price"
                  :count="insurance.adultOnly ? passengerTypes.ADU : passengerCount"></price-item>
    </div>
    <div class="cost-detail" v-show="services.airportServices.length">
      <price-item v-for="airportService in services.airportServices | orderBy 'id'"
                  :title="airportService.name"
                  :unit-price="airportService.price"
                  :count="airportService.freeForBaby ? passengerCount - passengerTypes.BAB : passengerCount"></price-item>
    </div>
    <div class="cost-detail" v-show="services.carServices.length">
      <price-item v-for="carService in services.carServices | orderBy 'id'"
                  :title="carService.name + ' - ' + carService.package.vehicleType"
                  :unit-price="carService.package.price"
                  :count="1"></price-item>
    </div>
    <div class="text-right total">
      <dfn>￥</dfn>{{total}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PriceItem from './PriceItem'
  import reduce from 'lodash/reduce'

  export default {
    data () {
      return {
        /* global priceInfo:false */
        priceInfo,
        passengerTypeNames: {
          ADU: '成人',
          CHI: '儿童',
          BAB: '婴儿'
        }
      }
    },
    vuex: {
      getters: {
        passengerCount: state => state.passengers.length,
        passengerTypes: state => state.passengerTypes,
        services: state => state.services
      }
    },
    computed: {
      total () {
        var ticketCost = reduce(this.passengerTypes, (sum, val, key) => sum + val * (this.priceInfo[key].ticket + this.priceInfo[key].airportFee + this.priceInfo[key].oilTax), 0)
        var insuranceCost = reduce(this.services.insurances, (sum, item) => sum + (item.adultOnly ? item.price * this.passengerTypes.ADU : item.price * this.passengerCount), 0)
        var airportServiceCost = reduce(this.services.airportServices, (sum, item) => sum + (item.freeForBaby ? item.price * (this.passengerCount - this.passengerTypes.BAB) : item.price * this.passengerCount), 0)
        var carServiceCost = reduce(this.services.carServices, (sum, item) => sum + item.package.price, 0)
        return ticketCost + insuranceCost + airportServiceCost + carServiceCost
      }
    },
    components: {
      PriceItem
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
