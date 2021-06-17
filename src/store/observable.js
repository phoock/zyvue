import Vue from "vue";

// 参考这种形式来实现轻量级vuex

// 菜单共享数据
export const menuState = Vue.observable({
  menuList: [],
  activeFirstMenu: undefined,
  activeSecondMenu: undefined,
  activeThirdMenu: undefined,
  activeFourMenu: undefined,
});

export const menuMutations = {
  setMenuList(val) {
    menuState.menuList = val;
  },
  setActiveFirstMenu(val) {
    menuState.activeFirstMenu = val;
  },
  setActiveSecondMenu(val) {
    menuState.activeSecondMenu = val;
  },
  setActiveThirdMenu(val) {
    menuState.activeThirdMenu = val;
  },
  setActiveFourMenu(val) {
    menuState.activeFourMenu = val;
  },
};

// 顶部搜索患者
export const topPatientState = Vue.observable({
  topPatientVisible: false,
});

export const topPatientMutations = {
  setTopPatientVisible(val) {
    topPatientState.topPatientVisible = val;
  },
};

// 主题共享数据
export const themeState = Vue.observable({
  themeSize: "default",
});

export const themeMutations = {
  setThemeSize(val) {
    themeState.themeSize = val;
  },
};
