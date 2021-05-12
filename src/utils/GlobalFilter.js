import Vue from "vue";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
const { DATE, TIME, TIME_SECONDS } = moment.HTML5_FMT;

import { numberUtils } from "@/utils/util";

export const filters = {
  filterDate(value, format = "YYYY-MM-DD") {
    return value ? moment(value).format(format) : "";
  },
  filterMoment(value, format = "HH:mm") {
    return value ? moment(value).format(format) : "";
  },
  filterTime(value, format = "YYYY-MM-DD HH:mm:ss") {
    return value !== "-" ? moment(value).format(format) : "-";
  },
  //自动生成的11开头的手机号不展示（for Table)
  filterMobile(value) {
    if (value && value !== "-" && value.slice(0, 2) == "11") {
      value = "-";
    } else if (!value) {
      value = "-";
    }
    return value;
  },
  // 除了table以外的显示空
  filterMobileForView(value) {
    if (value && value.slice(0, 2) == "11") {
      value = "";
    }
    return value;
  },
  formatYMDHm(value) {
    return value ? moment(value).format(`${DATE} ${TIME}`) : "";
  },

  formatYMDHts(value) {
    return value ? moment(value).format(`${DATE} ${TIME_SECONDS}`) : "";
  },

  /**
   * 根据value值获取对应枚举类匹配的text
   */
  filterEnums(value, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === value) {
        return arr[i].text;
      }
    }
  },
  toFixed(input, num) {
    return "￥" + Number(input).toFixed(num);
  },
  thousandFormatter: numberUtils.thousandFormatter,
};

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k]);
});
