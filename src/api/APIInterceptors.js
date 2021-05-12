import Vue from "vue";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";
import qs from "qs";

import config from "@/configs/env.config";
import { STORAGE_KEY } from "@/utils/const";
import StorageHelper from "@/utils/StorageHelper";
import { APIUtil } from "./API.util";
import { logout } from "@/utils/util";

const SCRM_HTTP = axios.create({
  baseURL: config.SCRM_API_HOST,
  timeout: 60000,
  paramsSerializer: function (params) {
    //序列化请求参数，避免get请求参数出现&,空格等识别错误的问题
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
});

const HIS_HTTP = axios.create({
  baseURL: config.HIS_API_HOST,
  timeout: 60000,
  paramsSerializer: function (params) {
    //序列化请求参数，避免get请求参数出现&,空格等识别错误的问题
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
});

const errorCodeArr = [191025, 402, 406];

const transParamsAndData = [
  (config) => {
    const copyConfig = cloneDeep(config);
    const baseParams = APIUtil.getSystemDefaultParams();
    // put, post, patch 请求参数放到 data 中.
    if (
      ["PUT", "POST", "PATCH", "DELETE"].includes(config.method.toUpperCase())
    ) {
      copyConfig.params = baseParams;
      if (copyConfig.type === "form") {
        copyConfig.headers["Content-Type"] =
          "application/x-www-form-urlencoded";
        copyConfig.data = qs.stringify(copyConfig.data);
      } else {
        copyConfig.headers["Content-Type"] = "application/json";
      }
    } else {
      copyConfig.params = {
        ...baseParams,
        ...(copyConfig.params || {}),
      };
    }
    return copyConfig;
  },
];

//请求的拦截
const requestIntercept = [
  (config) => {
    const copyConfig = cloneDeep(config);
    //当前请求接口携带的token
    const currentToken = copyConfig.params?.[STORAGE_KEY._TOKEN];
    const cookieToken = StorageHelper.cookieGet(STORAGE_KEY._TOKEN);
    //如果另外一个页面里cookie变化了 则重写cookie里的token 刷新页面
    if (cookieToken && currentToken && currentToken !== cookieToken) {
      let currentOrgInfo = StorageHelper.get("currentOrgInfo");
      currentOrgInfo[STORAGE_KEY._TOKEN] = cookieToken;
      StorageHelper.set(currentOrgInfo, currentOrgInfo);
      console.log("刷新页面");
      window.location.reload();
    }
    return copyConfig;
  },
];

//错误处理
const handleError = [
  (error) => {
    return Promise.reject(error);
  },
];
//相应拦截
const responseIntercept = [
  (response) => {
    const data = response?.data;
    if (data) {
      if (data.code !== 0) {
        Vue.prototype.$notification.error({
          message: "提示",
          description: data?.message || data?.msg,
          getContainer: false,
        });
      }

      if (errorCodeArr.includes(Number(data.code))) {
        logout();
      }
      return data;
    } else {
      return Promise.reject({});
    }
  },
];

HIS_HTTP.interceptors.request.use(...transParamsAndData);
HIS_HTTP.interceptors.request.use(...requestIntercept, ...handleError);

HIS_HTTP.interceptors.response.use(...responseIntercept, ...handleError);

SCRM_HTTP.interceptors.request.use(...transParamsAndData, ...handleError);
SCRM_HTTP.interceptors.request.use(...requestIntercept);

SCRM_HTTP.interceptors.response.use(...responseIntercept, ...handleError);

export { SCRM_HTTP, HIS_HTTP };
