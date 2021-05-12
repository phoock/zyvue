import { themeState, themeMutations } from "@/store/observable";
import STable from "@/components/Table";
import { Icon } from "ant-design-vue";
export const LiteIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2452510_w21eliqdh7.js",
});

import moment from "moment";

export const golbalMixin = {
  data() {
    return {
      publicPath: process.env.BASE_URL, // 给静态资源使用的路径<img :src="`${publicPath}logo_scrm.svg`" />
    };
  },
  components: { LiteIcon, STable },
  computed: {
    globalSize() {
      return themeState.themeSize;
    },
  },
  methods: {
    toggleThemeSize() {
      if (this.globalSize === "large") {
        themeMutations.setThemeSize("default");
        document
          .querySelector("body")
          .setAttribute("data-size-theme", "default");
      } else {
        themeMutations.setThemeSize("large");
        document.querySelector("body").setAttribute("data-size-theme", "large");
      }
    },
    //全局的inputNumber输入框 千分位显示
    mixinThousandFormatter(value) {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    filterTime(value, format = "YYYY-MM-DD HH:mm:ss") {
      return value !== "-" ? moment(value).format(format) : "-";
    },
  },
};
