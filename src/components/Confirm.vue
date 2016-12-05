<template>
  <div>
    核对信息并支付
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: [],
    vuex: {
      getters: {
        passengerValidated: state => state.passengerValidated,
        passengerCount: state => state.passengers.length
      }
    },
    route: {
      activate ({redirect, next}) {
        this.passengerValidated === this.passengerCount ? next() : redirect('/')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
