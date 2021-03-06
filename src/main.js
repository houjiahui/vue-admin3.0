import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from '@vue/composition-api';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.scss';
// 自定义全局组件
import './Icon';
import './router/premit';
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
