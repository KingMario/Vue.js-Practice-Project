<template>
  <div class="col-md-12 bg-white m-t m-b p-t p-b">
    <div class="delete-pax">
      <a href="javascript:void(0);" class="btn text-danger" @click="deletePassenger(passenger)">&times;</a>
    </div>
    <form class="form-horizontal" :class="{'has-success': validated}">
      <fieldset>
        <div class="form-group">
          <label class="col-sm-4 control-label">姓名</label>
          <div class="col-sm-4">
            <input type="text" placeholder="姓名" class="form-control input-sm"
                   v-model="passenger.name">
            <span class="help-block m-t-0 m-b-0">请确保与证件上的姓名完全一致</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-4 control-label">证件类型</label>
          <div class="col-sm-4">
            <select class="form-control input-sm" v-model="passenger.idType">
              <option v-for="idType in idTypes" :value="$key">{{idType}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-4 control-label">证件号码</label>
          <div class="col-sm-4">
            <input type="text" placeholder="证件号码" maxlength="18"
                   class="form-control input-sm"
                   v-model="passenger.cardNumber"
                   @input="cardNumberTouched = true">
            <span class="has-error">
                <span class="help-block" v-show="(cardNumberTouched || passenger.cardNumber)&& !cardNumberValidated">
                  请输入正确的证件号码
                </span>
              </span>
          </div>
        </div>
        <div class="form-group" v-show="idTypesHasBirthday.indexOf(passenger.idType) === -1">
          <label class="col-sm-4 control-label">出生日期</label>
          <div class="col-sm-4">
            <date-picker placeholder="出生日期" format="yyyy-MM-dd"
                         :value.sync="passenger.birthday"></date-picker>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  var DatePicker = {
    props: ['placeholder', 'format', 'value'],
    template: '<div>This is a fake component</div>'
  }
  if (process.env.NODE_ENV !== 'testing') {
    DatePicker = require('vue-strap/src/Datepicker')
  }
  import idCardValidate from '../js/passengerInfo/idCardValidate'
  import format from 'date-fns/format'
  import differenceInYears from 'date-fns/difference_in_years'
  import {updatePassengerValidated, updatePassengerType, deletePassenger} from '../vuex/actions'
  import {idTypes, idTypesHasBirthday} from '../js/passengerInfo/passengerInfoConsts'

  export default {
    data () {
      return {
        idTypes,
        idTypesHasBirthday,
        cardNumberTouched: false
      }
    },
    props: ['passenger'],
    vuex: {
      actions: {
        updatePassengerValidated,
        updatePassengerType,
        deletePassenger
      }
    },
    computed: {
      cardNumberValidated: function () {
        if (this.idTypesHasBirthday.indexOf(this.passenger.idType) > -1) {
          var cardNumberValidated = this.passenger.cardNumber && idCardValidate(this.passenger.cardNumber)
          if (cardNumberValidated) {
            this.passenger.birthday = format(new Date(this.passenger.cardNumber.substr(6, 4)
              , this.passenger.cardNumber.substr(10, 2) - 1, this.passenger.cardNumber.substr(12, 2)), 'YYYY-MM-DD')
          }
          return cardNumberValidated
        } else {
          return this.passenger.cardNumber
        }
      },
      validated: function () {
        this.passenger.validated = !!(this.passenger.name && this.passenger.cardNumber &&
        this.cardNumberValidated && (this.idTypesHasBirthday.indexOf(this.passenger.idType) > -1 || this.passenger.birthday))
        return this.passenger.validated
      }
    },
    watch: {
      'passenger.validated' (val) {
        this.updatePassengerValidated(val)
      },
      'passenger.birthday' (val) {
        /* global flights:false */
        let passengerAge = differenceInYears(flights[0].departInfo.time, val)
        this.passenger.type = passengerAge < 2 ? 'BAB' : passengerAge < 12 ? 'CHI' : 'ADU'
      },
      'passenger.type' (val, oldVal) {
        this.updatePassengerType(oldVal, val)
      },
      'passenger.cardNumber' (val) {
        this.$nextTick(function () {
          this.passenger.cardNumber = val.toUpperCase()
        })
      }
    },
    components: {
      DatePicker
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
