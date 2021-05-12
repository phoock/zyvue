import StorageHelper from "@/utils/StorageHelper";

const APIUtil = {
  getSystemDefaultParams() {
    let currentOrgInfo = StorageHelper.get("currentOrgInfo") || {};
    currentOrgInfo._lang = "zh_CN";
    return currentOrgInfo;
  },
};

export { APIUtil };
