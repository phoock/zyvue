// input 框自动获取焦点
export default {
  directiveName: "focus",
  inserted(el, { value }) {
    if (value) el.focus();
  },
};
