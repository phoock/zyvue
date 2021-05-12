// 全局类型的工具函数在这里定义
// 时间处理对象
import moment from "moment";
const Big = require("big.js");

export const timeUtils = {
  getTime(value) {
    return value ? moment(value).format("HH:mm") : "";
  },
  getDate(value) {
    return value ? moment(value).format("YYYY-MM-DD") : "";
  },
  getDateTime(value) {
    return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "";
  },
  getMonth(value) {
    return value ? moment(value).format("YYYY-MM") : "";
  },
  getStrDate(value) {
    return value ? moment(value).format("YYYYMMDD") : "";
  },
  getDateTimes(value) {
    return value ? moment(value).format("YYYY-MM-DD HH:mm") : "";
  },
  compareToday(value) {
    const t1 = this.getDate(value);
    const t2 = this.getDate(moment());
    // 返回日期与当前日期的时间差
    return moment(t1).diff(t2, "days");
  },
  dateToMoment(value) {
    return value ? moment(value) : null;
  },
  getNow() {
    return moment(new Date());
  },
  disabledDate(current) {
    return current && current < moment().endOf("day");
  },
};
export const numberUtils = {
  thousandFormatter(value, places = 2, sysmbol = "￥") {
    const zero = ``;
    if (isNaN(value) || value === "") return zero;

    if (value && value != null) {
      value = `${value}`;
      let left = value.split(".")[0]; // 小数点左边部分
      let right = value.split(".")[1]; // 小数点右边
      // 保留places位小数点，当长度没有到places时，用0补足。
      right = right
        ? right.length >= places
          ? "." + right.substr(0, places)
          : "." + right + "0".repeat(places - right.length)
        : "." + "0".repeat(places);
      var temp = left
        .split("")
        .reverse()
        .join("")
        .match(/(\d{1,3})/g); // 分割反向转为字符串然后最多3个，最少1个，将匹配的值放进数组返回
      return (
        (Number(value) < 0 ? "-" : "") +
        sysmbol +
        temp.join(",").split("").reverse().join("") +
        right
      ); // 补齐正负号和货币符号，数组转为字符串，通过逗号分隔，再分割（包含逗号也分割）反向转为字符串变回原来的顺序
    } else if (value === 0) {
      return `${sysmbol}0.00`;
    } else {
      return zero;
    }
  },
};

// 定义退出方法
export function logout() {
  localStorage.clear();
  location.href = "/login";
}

export function BigCalculate(value1, method, value2) {
  value1 = Number(value1);
  value2 = Number(value2);
  if (method === "+") {
    return Number(Big(value1).plus(Number(value2)));
  }
  if (method === "-") {
    return Number(Big(value1).minus(Number(value2)));
  }
  if (method === "*") {
    return Number(Big(value1).times(Number(value2)));
  }
  if (method === "/") {
    return Number(Big(value1).div(Number(value2)));
  }
}

// 随机数
export const random = (len) => {
  let s = "";
  while (s.length < len) {
    const r = Math.random();
    s +=
      r < 0.1
        ? Math.floor(r * 100)
        : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65));
  }
  return s;
};

// 由url生成upload组件的文件结构
export const generateUploadFileWithUrl = (url = "") => {
  if (!url) {
    console.error("url is required!");
    return;
  }
  return {
    uid: random(10),
    name: url.substring(url.lastIndexOf("/") + 1),
    url,
    status: "done",
  };
};

// 删除对象中值为空/null/undefinded的所有属性
export const preProcessData = (formData) => {
  Object.keys(formData).forEach((item) => {
    if (isEmpty(formData[item])) {
      delete formData[item];
    }
  });
  return formData;
};

function isEmpty(val) {
  if (typeof val === "undefined" || val === null || val === "") {
    return true;
  } else {
    return false;
  }
}
// 处理手机号为空
export function mobileUtils(value) {
  if (value?.slice(0, 2) == "11") {
    value = "";
  }
  return value;
}

/**
 * 校验手机号格式
 * @mobile 待校验手机号
 * return Boolean
 */
export function validateMobile(mobile) {
  if (!mobile) return true;
  return new RegExp(/^1[3456789]\d{9}$/).test(mobile);
}
