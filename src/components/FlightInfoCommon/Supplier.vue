<template>
  <div class="supplier hover-container">
    <span class="glyphicon glyphicon-certificate glyphicon-supplier"></span>
    <span class="supplier-text"></span>
    <div class="hover-box">
      <strong>产品供应商：</strong>
      <br> {{ flight.supplier.name }}
      <br> {{ flight.supplier.code }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['flight']
  }
</script>
