<template>
  <div class="row m-l">
    <legend>机场服务</legend>
    <div class="col-md-6" v-for="item in airportServices">
      <label>
        <input
          type="checkbox"
          v-model="services.airportServices"
          :value="item">
        <span>
          {{item.name}}
        </span>
      </label>
      <span>
          {{item.price}}元/人
        </span>
      <span v-if="item.freeForBaby">（婴儿免费）</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['airportServices'],
    vuex: {
      getters: {
        services: state => state.services
      }
    }
  }
</script>
