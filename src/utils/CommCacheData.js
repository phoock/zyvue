import moment from "moment";

/**
 * 公用存储页面的缓存
 * @type {{set(*, *, *): void, data: (any), get(*): *, cacheDataName: string, getData(*): *}}
 *  1.单独缓存每个页面的操作记录
 *  2.每个页面的路由作为当前页面的缓存数据key。如果一个页面需要保存多分不同的数据，可以在页面生成唯一的的key值就行，guid或者其他的，只要保持唯一就行。
 */
const CommCacheData = {
  cacheDataName: "LITE_COMM_CACHE_DATA",
  momentTypeArray: "MOMENT_TYPE_ARRAY_IDENTIFICATION", // 日期数组数moment据类型的存取标识
  momentType: "MOMENT_TYPE_IDENTIFICATION", // 日期moment类型的存取标识
  get(key) {
    const uniqueKey = key;

    this.checkOvertime();
    const cacheData = localStorage.getItem(this.cacheDataName)
      ? JSON.parse(localStorage.getItem(this.cacheDataName))
      : {};

    return this.transformation(cacheData[uniqueKey]);
  },
  set(key, name, value) {
    const uniqueKey = key;

    this.checkOvertime();

    // 如果是Moment数据类型，就需要转换成时间戳存
    if (value?._isAMomentObject) {
      value = value.valueOf() + this.momentType;
    }

    // 处理日期数组
    if (value instanceof Array && value?.length === 2) {
      // 2个Moment数据类型
      if (value[0]?._isAMomentObject && value[1]?._isAMomentObject) {
        value = value[0].valueOf() + this.momentTypeArray + value[1].valueOf();
      }
    }

    const cacheData = localStorage.getItem(this.cacheDataName)
      ? JSON.parse(localStorage.getItem(this.cacheDataName))
      : {};

    if (cacheData && cacheData[uniqueKey]) {
      cacheData[uniqueKey][name] = value;
    } else {
      cacheData[uniqueKey] = {};
      cacheData[uniqueKey][name] = value;
    }
    localStorage.setItem("HIS_CACHE_DATA_LAST_UPDATE_TIME", moment().valueOf());
    localStorage.setItem(this.cacheDataName, JSON.stringify(cacheData));
  },
  getData(key) {
    const uniqueKey = key;

    this.checkOvertime();

    const result = {};
    const cacheData = localStorage.getItem(this.cacheDataName)
      ? JSON.parse(localStorage.getItem(this.cacheDataName))
      : {};

    cacheData &&
      cacheData[uniqueKey] &&
      Object.keys(cacheData[uniqueKey]).forEach((item) => {
        result[item] = this.transformation(cacheData[uniqueKey][item]);
      });

    return result;
  },

  /**
   * 该方法是把缓存的值转换成存的时候的值
   * 因为数据存localStorage，最终会JSON.stringify
   * 如：moment类型存的时候是存时间戳，在读取的时候需要把这个时间戳转换回moment类型。
   * @param value
   * @returns {moment.Moment | moment.Moment[]}
   */
  transformation(value) {
    let result = value;

    if (value === "null") {
      result = null;
    } else if (value?.indexOf && value.indexOf(this.momentTypeArray) > 0) {
      // 如果是日期moment数组数据，转换成数组
      const arr = value.split(this.momentTypeArray);

      result = [moment(Number(arr[0])), moment(Number(arr[1]))];
    } else if (value?.indexOf && value.indexOf(this.momentType) > 0) {
      // 如果是moment转换的时间戳，转换成moment
      const arr = value.split(this.momentType);

      result = moment(Number(arr[0]));
    }

    return result;
  },
  checkOvertime() {
    const lastUpdateTime = localStorage.getItem(
      "HIS_CACHE_DATA_LAST_UPDATE_TIME"
    ); // 上一次操作时间

    if (!lastUpdateTime) {
      return false;
    }

    const newDate = moment().subtract(8, "hours"); // 8 hours seconds

    if (newDate.isAfter(moment(Number(lastUpdateTime)))) {
      localStorage.removeItem(this.cacheDataName);

      return true;
    }

    return false;
  },
};

export { CommCacheData };
