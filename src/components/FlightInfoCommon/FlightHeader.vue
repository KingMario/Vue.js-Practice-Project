<template>
  <h3>
    {{ departDate }} {{ flight.departInfo.city }} <span class="glyphicon glyphicon-arrow-right"></span> {{ arriveCity }}
  </h3>
</template>

<script type="text/ecmascript-6">
  import format from 'date-fns/format'
  import zhCNLocale from 'date-fns/locale/zh_cn'

  export default {
    props: ['flight', 'arriveCity'],
    computed: {
      departDate: function () {
        return format(new Date(this.flight.departInfo.time), 'MM-DD ddd', {
          locale: zhCNLocale
        })
      }
    }
  }
</script>
