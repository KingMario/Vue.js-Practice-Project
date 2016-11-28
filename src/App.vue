<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" @click="navbarCollapsed = !navbarCollapsed">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">极客旅游网</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="navbar-collapse" :class="navbarCollapsed ? 'collapsed' : 'collapse'">
          <ul class="nav navbar-nav">
            <li v-link-active><a v-link="{path: '/', exact: true}">乘客信息</a></li>
            <li v-link-active><a v-link="'/services'">增值业务</a></li>
            <li v-link-active><a v-link="'/confirm'">核对支付</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-7">
          <router-view></router-view>
        </div>
        <div class="col-md-5">
          已输入乘客人数：{{passengerCount}}，已校验乘客人数：{{passengerValidated}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import store from './vuex/store'

  export default {
    data () {
      return {
        navbarCollapsed: false
      }
    },
    vuex: {
      getters: {
        passengers: state => state.passengers,
        passengerValidated: state => state.passengerValidated,
        passengerCount: state => state.passengers.length
      }
    },
    store,
    components: {
      Hello
    }
  }
</script>

<style lang="less">
  @import "../node_modules/bootstrap/less/bootstrap.less";
</style>
