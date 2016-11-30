<template>
  <div class="row flight-detail" :class="{'p-b-0': leg===1}">
    <div class="col-xs-4 text-right flight-depart">
      <div class="flight-time" :class="{transit: leg===2}" v-if="!transitOverMidNight">
        {{ departTime }}
      </div>
      <div class="flight-time-with-overmidnight" v-else>
        <div class="flight-time" :class="{transit: leg===2}">
          {{ departTime }}
        </div>
        <div class="flight-time-overmidnight hover-container">
          <small class="overmidnight-text abbr"></small>
          <div class="hover-box">
            起飞时间为第2天，{{ departDateTimeStr }}
          </div>
        </div>
      </div>

      <div class="flight-airport">{{ getAirportTerminal(flight.departInfo) }}</div>
    </div>
    <div class="col-xs-4 flight-arrow">
      <div class="cost-time">
        <span class="glyphicon glyphicon-time"></span> {{ costTime }}
      </div>
      <div class="timeline">
        <span class="glyphicon glyphicon-plane" v-show="leg !== 1 || transitExpanded"></span>
        <div class="transit-info" v-else>{{ flight.arriveInfo.city }}{{ transitTime }}</div>
      </div>
    </div>
    <div class="col-xs-4 text-left flight-arrive">
      <div class="flight-time" :class="{transit: leg===1 && transitExpanded}" v-if="!overMidNight">
        {{ arriveTime }}
      </div>
      <div class="flight-time-with-overmidnight" v-else>
        <div class="flight-time" :class="{transit: leg===1 && transitExpanded}">
          {{ arriveTime }}
        </div>
        <div class="flight-time-overmidnight hover-container">
          <small class="overmidnight-text abbr"></small>
          <div class="hover-box">
            到达时间为第2天，{{ arriveDateTimeStr }}
          </div>
        </div>
      </div>
      <div class="flight-airport" v-if="leg===1 && !transitExpanded">
        {{ getAirportTerminal(transitFlight.arriveInfo)}}
      </div>
      <div class="flight-airport" v-else>
        {{ getAirportTerminal(flight.arriveInfo) }}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDuration} from '../../js/flightInfo/flightInfoFns'
  import format from 'date-fns/format'
  import isSameDay from 'date-fns/is_same_day'

  export default {
    props: ['flight', 'leg', 'firstDepartDateTime', 'transitExpanded', 'transitTime', 'transitFlight'],
    // 分别为要展示的航班、第几航段、首航段起飞时间、中转航班是否已展开、中转时长、中转航班完整信息
    methods: {
      getAirportTerminal (flightLegEndInfo) {
        return flightLegEndInfo.airport + flightLegEndInfo.terminal
      }
    },
    computed: {
      departDateTime: function () {
        return new Date(this.flight.departInfo.time)
      },
      departDate: function () {
        return format(this.departDateTime, 'MM-DD ddd')
      },
      departTime: function () {
        return format(this.departDateTime, 'HH:mm')
      },
      arriveDateTime: function () {
        return this.leg === 1 && !this.transitExpanded ? new Date(this.transitFlight.arriveInfo.time) : new Date(this.flight.arriveInfo.time)
      },
      arriveTime: function () {
        return format(this.arriveDateTime, 'HH:mm')
      },
      costTime: function () {
        return getDuration(this.departDateTime, this.arriveDateTime)
      },
      transitOverMidNight: function () {
        return this.leg === 2 && !isSameDay(this.firstDepartDateTime, this.departDateTime)
      },
      overMidNight: function () {
        return !isSameDay(this.firstDepartDateTime || this.departDateTime, this.arriveDateTime)
      },
      departDateTimeStr: function () {
        return format(this.departDateTime, 'YYYY年MM月DD日 HH时mm分')
      },
      arriveDateTimeStr: function () {
        return format(this.arriveDateTime, 'YYYY年MM月DD日 HH时mm分')
      }
    }
  }
</script>
