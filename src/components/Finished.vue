<template>
  <div class="container m-b p-b main-panel">
    <h1 class="text-center">机票预订成功</h1>
    <div class="text-center text-warning">以下是预订信息，该信息将同步发送至您的邮箱，请注意查收！</div>
    <legend>机票</legend>
    <div class="row">
      <div class="col-md-6">
        <h4 class="text-info">
          {{departDate}}
          {{flightCompanies[flights[0].flightCode.substr(0, 2).toLowerCase()]}} {{flights[0].flightCode}}
          {{subclasses[flights[0].subclass]}}
        </h4>
        <h5 class="text-info">
          {{flights[0].departInfo.time}} {{flights[0].departInfo.city}} {{flights[0].departInfo.airport}}
          {{flights[0].departInfo.terminal}} 起飞
        </h5>
        <h5 class="text-info">
          {{arrivalFlight.arriveInfo.time}} {{arrivalFlight.arriveInfo.city}} {{arrivalFlight.arriveInfo.airport}}
          {{arrivalFlight.arriveInfo.terminal}} 到达
        </h5>
      </div>
      <div class="col-md-6 text-primary">
        <h5>乘客信息</h5>
        <div v-for="passenger in passengers">
          {{passenger.name}} {{passengerTypeNames[passenger.type]}}票出票成功
        </div>
      </div>
    </div>
    <template v-if="services.insurances.length">
      <legend class="m-t">保险</legend>
      <template v-for="insurance in services.insurances | orderBy id">
        <div class="row">
          <div class="col-md-6">
            <h4 class="text-info">
              {{insurance.name}}
            </h4>
            <div class="text-info">
              {{insurance.description}}
            </div>
          </div>
          <div class="col-md-6 text-primary">
            <h5>保单信息</h5>
            <div class="div" v-for="passenger in passengers">
              <template v-if="!insurance.adultOnly || passenger.type === 'ADU'">
                {{passenger.name}} {{idTypes[passenger.idType]}}号码{{passenger.cardNumber}}
                保单号：{{Math.random().toString().substr(2)}}
              </template>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-if="services.airportServices.length">
      <legend class="m-t">机场服务</legend>
      <div class="text-info">
        贵宾休息室位于T2航站楼 15 - 16 号登机口之间，联系电话 88888888。
      </div>
    </template>
    <template v-if="services.carServices.length">
      <legend class="m-t">用车服务</legend>
      <div class="text-info">
        接送机服务由易到用车提供服务器，司机联系电话13888888888。
        <span class="text-danger">用车服务可通过在线订单管理或热线电话取消，如欲取消，必须早于预约接、送机时间前 24 小时，否则费用不退。</span>
      </div>
    </template>
  </div></template>

<script type="text/ecmascript-6">
  import {subclasses, flightCompanies} from '../js/flightInfo/flightInfoConsts'
  import {idTypes, passengerTypeNames} from '../js/passengerInfo/passengerInfoConsts'
  import format from 'date-fns/format'
  import zhCNLocale from 'date-fns/locale/zh_cn'

  export default {
    data () {
      return {
        /* global flights:false */
        flights,
        subclasses,
        flightCompanies,
        idTypes,
        passengerTypeNames
      }
    },
    vuex: {
      getters: {
        passengers: state => state.passengers,
        services: state => state.services
      }
    },
    computed: {
      departDate: function () {
        return format(new Date(this.flights[0].departInfo.time), 'MM-DD ddd', {
          locale: zhCNLocale
        })
      },
      arrivalFlight: function () {
        return this.flights[this.flights.length - 1]
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
