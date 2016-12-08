<template>
  <div class="row m-l">
    <legend>用车服务</legend>
    <div v-for="item in carServices">
      <label>
        <input
          type="checkbox"
          v-model="services.carServices"
          :value="item">
        <span>
          {{item.name}}
        </span>
      </label>
      <span v-show="services.carServices.indexOf(item) > -1">
        <input type="text" placeholder="送机时间" v-show="item.serviceType === 1" v-model="item.time">
        <input type="text" :placeholder="item.serviceType === 1 ? '市内出发地点' : '市内送达地点'" v-model="item.address">
        <select v-model="item.package">
          <template v-for="package in item.packages | orderBy 'seatCount' -1">
            <option :value="package" selected>{{package.vehicleType}}</option>
          </template>
        </select>
        <span class="has-error">
          <span class="help-block" v-if="item.serviceType === 1 && isNaN(Date.parse(item.time)) || new Date(item.time) < new Date(departTime) - 10800000 || new Date(item.time) > new Date(departTime) - 4800000">
            送机时间必须介于起飞前 3 小时到起飞前 1 小时 20 分之间
          </span>
          <span class="help-block" v-if="item.package && item.package.seatCount < seatsToBeTaken">
            所选车型座位数少于乘客人数，超出人员需自行前往机场，请确认
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        /* global flights:false */
        departTime: flights[0].departInfo.time
      }
    },
    props: ['carServices'],
    vuex: {
      getters: {
        services: state => state.services,
        seatsToBeTaken: state => state.passengers.length - state.passengerTypes.BAB
      }
    }
  }
</script>
