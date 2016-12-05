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
        passengerTypes: state => state.passengerTypes
      }
    },
    computed: {
      total () {
        return reduce(this.passengerTypes, (sum, val, key) => sum + val * (this.priceInfo[key].ticket + this.priceInfo[key].airportFee + this.priceInfo[key].oilTax), 0)
      }
    },
    components: {
      PriceItem
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
