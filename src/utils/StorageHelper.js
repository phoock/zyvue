/* eslint-disable space-before-function-paren,no-useless-escape,object-curly-spacing */
import Cookies from "js-cookie";
import config from "@/configs/env.config";

const DOMAIN = config.DOMAIN;

class StorageHelper {
  /**
   * 设置 本地存储接口
   * @param key
   * @param val
   */
  static set(key, val) {
    if (key && val) {
      if (typeof val === "object") {
        localStorage.setItem(key, JSON.stringify(val));
      } else {
        localStorage.setItem(key, val);
      }
    }
  }

  /**
   * 获取 本地存储接口
   * @param key
   */
  static get(key) {
    if (key) {
      let value = localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return "";
        }
      } else {
        return "";
      }
    }
    return "";
  }

  /**
   * 移除指定的缓存
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 设置 本地存储接口(会话级别)
   */
  static sessionSet(key, val) {
    return sessionStorage.setItem(key, val);
  }

  /**
   * 获取 本地存储接口(会话级别)
   */
  static sessionGet(key) {
    const value = sessionStorage.getItem(key);
    return value === "undefined" ? "" : value;
  }

  /**
   * 移除指定的缓存(会话级别)
   */
  static sessionRemove(key) {
    sessionStorage.removeItem(key);
  }

  /**
   * 设置 cookie存储
   * @param key
   * @param valueString
   */
  static cookieSet(key = "", valueString = "") {
    const isSLDomain = StorageHelper.isSLDomain();
    const cookieParam = !isSLDomain ? null : { domain: DOMAIN };
    if (cookieParam) {
      return Cookies.set(key, valueString, cookieParam);
    } else {
      return Cookies.set(key, valueString);
    }
  }

  /**
   * 获取 cookie存储
   * @param key
   */
  static cookieGet(key = "") {
    const isSLDomain = StorageHelper.isSLDomain();
    const cookieParam = !isSLDomain ? null : { domain: DOMAIN };
    if (cookieParam) {
      return Cookies.get(key, cookieParam);
    } else {
      return Cookies.get(key);
    }
  }

  /**
   * 移除 cookie存储
   * @param key
   */
  static cookieRemove(key = "") {
    const isSLDomain = StorageHelper.isSLDomain();
    const cookieParam = !isSLDomain ? null : { domain: DOMAIN };
    if (cookieParam) {
      return Cookies.remove(key, cookieParam);
    } else {
      return Cookies.remove(key);
    }
  }

  static cookieRemoveAll() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (!keys) {
      return;
    }
    const isSLDomain = StorageHelper.isSLDomain();
    const cookieParam = !isSLDomain ? "" : `;domain=${DOMAIN};`;
    for (let i = keys.length; i--; ) {
      document.cookie = `${keys[i]}=0;expires=${new Date(
        0
      ).toUTCString()}${cookieParam}`;
    }
  }

  /**
   * HIS、总部、SCRM有统一二级域名
   *
   * @static
   * @returns {boolean} HIS、总部、SCRM有无统一二级域名
   * @memberof UserHelper
   */
  static isSLDomain() {
    return window.location.hostname.includes(DOMAIN);
  }
}

export default StorageHelper;
export { StorageHelper };
