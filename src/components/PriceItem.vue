<template>
  <div class="cost-item">
    <div>{{title}}</div>
    <div class="text-right cost" v-if="unitPrice">
      <dfn>￥</dfn>{{unitPrice}}
      <span class="num">&times; {{count}}</span>
    </div>
    <div class="text-right cost" v-else>免费</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['title', 'unitPrice', 'count']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
