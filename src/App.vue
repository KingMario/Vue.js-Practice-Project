<template>
  <div id="app">
    <nav class="navbar navbar-default" v-if="!finished">
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
    <div class="container-fluid" v-if="!finished">
      <div class="row">
        <div class="col-md-7 main-panel">
          <router-view keep-alive></router-view>
        </div>
        <div class="col-md-5">
          <component :is="flights.length === 1 ? 'DirectFlightInfo' : 'TransitFlightInfo'"
                     :flights="flights"></component>
          <price-info></price-info>
        </div>
      </div>
      <div class="m-t">
        <button class="btn btn-primary" :disabled="$route.path === '/'" @click="prev">上一步</button>
        <button class="btn btn-primary" v-if="$route.path !== '/confirm'"
                :disabled="passengerCount !== passengerValidated"
                @click="next">下一步
        </button>
        <div class="text-center m-b" v-else>
          <span v-for="insurance in services.insurances">
            <a :href="'/static/terms/insurances/' + insurance.id + '.html'" target="_blank">
              {{insurance.name}}保险条款
            </a>、
          </span>
          <span>
            <a href="/static/terms/battery.html" target="_blank">关于民航乘客携带锂电池及危险品乘机的限制</a>，点击去支付即代表已阅读并同意上述条款
          </span>
          <button class="btn btn-warning btn-lg btn-block bg-orange" @click="finished = true">去支付</button>
        </div>
      </div>
    </div>
    <Finished class="container" v-else></Finished>
  </div>
</template>

<script type="text/ecmascript-6">
  import DirectFlightInfo from './components/DirectFlightInfo'
  import TransitFlightInfo from './components/TransitFlightInfo'
  import PriceInfo from './components/PriceInfo'
  import Finished from './components/Finished'
  import store from './vuex/store'

  export default {
    data () {
      return {
        navbarCollapsed: false,
        /* global flights:false */
        flights,
        finished: false
      }
    },
    vuex: {
      getters: {
        passengerValidated: state => state.passengerValidated,
        passengerCount: state => state.passengers.length,
        services: state => state.services
      }
    },
    store,
    methods: {
      prev() {
        switch (this.$route.path) {
          case '/services':
            this.$router.go('/')
            break
          case '/confirm':
            this.$router.go('/services')
            break
          default:
        }
      },
      next() {
        switch (this.$route.path) {
          case '/':
            this.$router.go('/services')
            break
          case '/services':
            this.$router.go('/confirm')
            break
          default:
        }
      }
    },
    components: {
      DirectFlightInfo,
      TransitFlightInfo,
      PriceInfo,
      Finished
    }
  }
</script>

<style lang="less">
  @import "../node_modules/bootstrap/less/bootstrap.less";
  @import "./assets/style.less";
  @import "./assets/helpers.less";
</style>
