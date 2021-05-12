import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./globalStyle.less";
import "./configs/lazy_use";
import "./store/observable.js";
import "./utils/directives";
import "./utils/GlobalFilter";
import { enums } from "@/utils/enumService";
import { golbalMixin } from "@/utils/GlobalMixin";

Vue.prototype.enums = enums;
Vue.prototype.$EventBus = new Vue();

Vue.config.productionTip = false;
Vue.mixin(golbalMixin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
