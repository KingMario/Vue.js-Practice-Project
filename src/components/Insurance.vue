<template>
  <div class="row m-l">
    <legend>购买保险</legend>
    <div class="col-md-3" v-for="item in insurances">
      <label>
        <input
          type="checkbox"
          v-model="services.insurances"
          :value="item">
        <span class="abbr" :title="item.description">
          {{item.name}}
        </span>
      </label>
      <span>
        {{item.price}}元/人
      </span>
      <span v-if="item.adultOnly">（仅限成人）</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['insurances'],
    vuex: {
      getters: {
        services: state => state.services
      }
    }
  }
</script>
