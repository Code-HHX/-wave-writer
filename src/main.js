/*
 * @Author: Code-HHX
 * @Date: 2022-03-24 11:49:13
 * @LastEditors: Code-HHX
 * @LastEditTime: 2022-03-24 14:06:30
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/index";
import * as utils from "@/util/utils";
import "amfe-flexible";
import Waves from "vue-waves-effect";
import "vue-waves-effect/dist/vueWavesEffect.css";

Vue.config.productionTip = false;

import {
  Popup,
  DropdownMenu,
  DropdownItem,
  Button,
  Switch,
  Toast,
  Slider,
  Icon,
  Tab,
  Tabs,
  Loading,
  Divider,
  Popover,
  PullRefresh,
  List
} from "vant";

Vue.use(Popup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Toast);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Popover);
Vue.use(Waves);
Vue.use(PullRefresh);
Vue.use(List);

//全局暴露api接口
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.config.devtools = process.env.NODE_ENV === "dev";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
