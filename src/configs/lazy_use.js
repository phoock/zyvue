import Vue from "vue";
import {
  ConfigProvider,
  Modal,
  Empty,
  message,
  notification,
} from "ant-design-vue";

// Vue.use(Collapse);
Vue.use(ConfigProvider);
// Vue.use(Cascader);
// Vue.use(Layout)
// Vue.use(Input);
// Vue.use(InputNumber);
// Vue.use(Button);
// Vue.use(Switch);
// Vue.use(Radio);
// Vue.use(Checkbox);
// Vue.use(Select);
// Vue.use(Calendar);
// Vue.use(Card)
// Vue.use(Form);
// Vue.use(FormModel);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Modal);
// Vue.use(Table);
// Vue.use(Tabs);
// Vue.use(Tree);
// Vue.use(TreeSelect);
// Vue.use(Icon);
// Vue.use(Badge)
// Vue.use(Popover);
// Vue.use(Dropdown);
// Vue.use(List);
Vue.use(Empty);
// Vue.use(Avatar)
// Vue.use(Breadcrumb)
// Vue.use(Steps)
// Vue.use(Spin);
// Vue.use(Menu)
// Vue.use(Drawer);
// Vue.use(Tooltip);
// Vue.use(Alert)
// Vue.use(Tag);
// Vue.use(Divider);
// Vue.use(DatePicker);
// Vue.use(TimePicker);
// Vue.use(Upload);
// Vue.use(Progress)
// Vue.use(Skeleton)
// Vue.use(Popconfirm);
// Vue.use(PageHeader)
// Vue.use(Result)
// Vue.use(Statistic)
// Vue.use(Descriptions);
// Vue.use(Space)
// Vue.use(Pagination);

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
