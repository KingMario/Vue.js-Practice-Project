<template>
  <div>
    <legend>乘客信息</legend>
    <passenger-info v-for="passenger in passengers"
                    :passenger="passenger"></passenger-info>
    <button class="btn btn-info m-b"
            @click="addPassenger()"
            :disabled="passengers.length === 9">新增乘客
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
  import PassengerInfo from './PassengerInfo'
  import {addPassenger} from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        passengers: state => state.passengers
      },
      actions: {
        addPassenger
      }
    },
    components: {
      PassengerInfo
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
