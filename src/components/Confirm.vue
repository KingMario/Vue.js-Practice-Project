<template>
  <div class="row m-l">
    <legend>乘客信息</legend>
    <div class="col-md-2 text-center">姓名</div>
    <div class="col-md-2 text-center">证件类型</div>
    <div class="col-md-3 text-center">证件号</div>
    <div class="col-md-3 text-center">出生日期</div>
    <div class="col-md-2 text-center">乘客类型</div>
    <template v-for="passenger in passengers">
      <div class="col-md-2 text-center">{{passenger.name}}</div>
      <div class="col-md-2 text-center">{{idTypes[passenger.idType]}}</div>
      <div class="col-md-3 text-center">{{passenger.cardNumber}}</div>
      <div class="col-md-3 text-center">{{passenger.birthday}}</div>
      <div class="col-md-2 text-center">{{passengerTypeNames[passenger.type]}}</div>
    </template>
    <template v-if="services.insurances.length + services.airportServices.length + services.carServices.length">
      <legend>已购服务</legend>
      <div class="col-md-4 text-center">服务项目</div>
      <div class="col-md-3 text-center">单价</div>
      <div class="col-md-2 text-center">人数/份数</div>
      <div class="col-md-3 text-center">金额小计</div>
      <div class="row" v-if="services.insurances.length">
        <template v-for="insurance in services.insurances">
          <div class="col-md-4 text-center">{{insurance.name}}</div>
          <div class="col-md-3 text-center">{{insurance.price}}</div>
          <div class="col-md-2 text-center">{{insurance.adultOnly ? passengerTypes.ADU : passengers.length}}</div>
          <div class="col-md-3 text-center">{{(insurance.adultOnly ? passengerTypes.ADU : passengers.length) *
            insurance.price | currency '￥'}}
          </div>
        </template>
      </div>
      <div class="row" v-if="services.airportServices.length">
        <template v-for="airportService in services.airportServices">
          <div class="col-md-4 text-center">{{airportService.name}}</div>
          <div class="col-md-3 text-center">{{airportService.price}}</div>
          <div class="col-md-2 text-center">{{airportService.freeForBaby ? passengers.length - passengerTypes.BAB :
            passengers.length}}
          </div>
          <div class="col-md-3 text-center">{{(airportService.freeForBaby ? passengers.length - passengerTypes.BAB :
            passengers.length) * airportService.price | currency '￥'}}
          </div>
        </template>
      </div>
      <div class="row" v-if="services.carServices.length">
        <template v-for="carService in services.carServices">
          <div class="col-md-4 text-center">{{carService.name}}</div>
          <div class="col-md-3 text-center">{{carService.package.price}}</div>
          <div class="col-md-2 text-center">1</div>
          <div class="col-md-3 text-center">{{carService.package.price | currency '￥'}}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import {idTypes, passengerTypeNames} from '../js/passengerInfo/passengerInfoConsts'

  export default {
    data () {
      return {
        idTypes,
        passengerTypeNames
      }
    },
    vuex: {
      getters: {
        passengerValidated: state => state.passengerValidated,
        passengers: state => state.passengers,
        passengerTypes: state => state.passengerTypes,
        services: state => state.services
      }
    },
    route: {
      activate ({redirect, next}) {
        this.passengerValidated === this.passengers.length ? next() : redirect('/')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
