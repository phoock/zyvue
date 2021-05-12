# lb_lite_emr

## 安装依赖
```
yarn
```

### 本地开发
```
yarn start //和之前的项目保持一致
```

### 打包编译
```
yarn build
```

## 目录结构

```
.
├─ public 不被打包的静态资源文件
├─ src
    ├─ api 接口
    ├─ assets 被打包的静态文件
    ├─ assets 资源
    ├─ component 公共组件目录（基础组件，非业务类型组件)
        ├─ TabelWithFilter 组件
            ├─ index.vue
            ├─ Table.vue
            ├─ Filter.vue
            ├─ components 拆分出来的零散组件（只在该文件下使用）
    ├─ configs 配置文件夹
        ├─ env.config.js 多环境基础参数配置(生成出来的)
        ├─ icons.js 图标按需加载目录（默认不加载任何antd icon）
        ├─ lazy_use.js antd按需加载，用到什么放开什么
    ├─ layouts 布局文件夹
    ├─ router 路由文件夹
    ├─ store 数据中心文件夹（有需要就添加vuex或observable)
    ├─ utils 存放一些方便开发的文件
        ├─ const.js 存放常亮
        ├─ GlobalFilter.js 全局filter定义
        ├─ GlobalMixin.js 全局mixins定义
    ├─ views 页面目录
        ├─ Patient (一级路由)
            ├─ index.vue (一级路由匹配的文件入口)
            ├─ PatientLeftTag.vue (页面的组成部分之一)
            ├─ components (一级路由需要的小组件)
            ├─ List (二级路由)
                ├─ index.vue (二级路由匹配的文件入口)
                ├─ PatientTableList.vue (页面的组成部分之一)
                ├─ components (二级路由需要的小组件)
    ├─ globalStyle.less (全局样式写入)
```
###全局less变量配置
全局less变量配置允许我们在一处定义less变量全局使用而不必引入

配置文件路径：`@/configs/less/globalVars`

**用法**
1. 定义变量

```
module.exports = {
    "normal-color": "rgba(0,0,0,0.65)",
    "base-spacing": "8px",
};
```
2. 重启本地vue-cli-service服务
3. 引用变量
```
.label {
  color: @normal-color; // rgba(0,0,0,0.65)
  padding-bottom: @base-spacing * 2; // 16px
}
```

###打印使用
用于局部打印页面上DOM

ps：项目打印功能基于vue-print-nb包（已拷至本地）

####使用方法：
1. 全局指令：**v-print**
```vue
<template>
    <div id="print">打印内容</div>
    <button v-print="'print'">打印</button>
</template>
```
2. 编程式调用：
`@/utils/util`**printArea** 函数
```vue
<template>
    <a-modal v-model="printModalVisible" okType="打印" @ok="print">
      <div id="print">打印内容</div>
    </a-modal>
</template>
<script>
import { printArea } from "@/utils/util";

export default {
  data() {
    return {
      printModalVisible: true,
      printConfig: {
        id: "print",
        afterPrint: () => {
          // 打印dialog关闭时关闭弹窗
          this.printModalVisible = false;
        },
      },
    };
  },
  methods: {
    print() {
      printArea(this.printConfig);
    }
  },
};
</script>
```
3. 打印参数对象（也可以仅为id字符串）
* `id`：* 打印区域dom的id,
* `standard`： html Document type, 默认为html5，可选html5，loose， strict
* `extraHead`：附加到头标签的附加标签，用","分隔
* `extraCss`：附加CSS链接，用","分隔
* `popTitle`：页眉标题
* `beforePrint() {}`：打印前函数
* `afterPrint() {}`：关闭打印弹窗后函数

4. 关于打印模板

各模块模板（基于UI设计）请放至此目录`@/components/PrintTemplates`供大家使用

### 修改antd样式需要注意：
1. 需要删除style标签里的scope
2. 用命名空间的方式来约束范围
3. 在碰到弹窗类需要根据官方文档来添加指定class(弹窗类会默认挂在到跟节点,命名空间会失效)
```
<style lang="less">
//(通过命名空间的方式来约束范围)
.basicLayout { 
    .antd-table {
        font-size: 16px;
    }
}
</style>
```

### 时间处理和精度处理
1. 在template里需要处理时间格式，这部分内容在GlobalFilter.js里
```
<span>{{"2020:11:01" | filterDate}}</span>    ----会被转成2020-11-01
```
2. 在javascript里处理，这部分在工具函数utils/util.js里
```
console.log(timeUtils.getNow()); // 与moment转换相关的都可以放在这里供大家使用
```

### Icon使用方案
1. 我们采用按需加载默认Icon的方式，会丢失部分默认Icon，如果发现有丢失，参考按需加载的方案进行补齐
2. 大多数Icon来自于fontIcon自定义,使用方法
```
<LiteIcon type="lite_app_icon_tuifei" style="color: red" />
// type查看请去iconfont网站对应的lite_app仓库找
// 更新方法：
// globalMixi.js
export const LiteIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2452510_sxppo1y0oxo.js",
});
// 修改scriptUrl(取自iconfont)
```

### 开发时按需加载，注意事项：
#### https://github.com/vueComponent/ant-design-vue/issues/325
1. antd vue按需加载
```
// 配合babel插件: babel-plugin-import
import { Button } from "ant-design-vue";
Vue.use(Button);
```
2. antd Icon按需加载
```
src/configs/icons.js
// 参考该文件的配置
```

3. loadash按需加载
```
// 正确用法
import debounce from "lodash/debounce"; //只会打包debounce
// 错误用法
import { debounce } from "lodash"; // 在babel插件下可以使用这种方式(本项目没配)
import _ from "loadash";

```
4. echart按需加载
```
import echarts from "echarts/lib/echarts"; // 引用主文件
import "echarts/lib/chart/bar"; // 引用柱状图
import "echarts/lib/component/title"; ...
```

### 切换主题大小方案介绍：
#### antd vue 暂时不支持全局修改size
#### https://github.com/vueComponent/ant-design-vue/issues/1911
  
  

#### 手动配置size属性
```
<a-button :size="globalSize">手动</a-button>
```
#### 需要手动配置的项
- Radio, Input, Button, Select, DatePicker, Divider, Table, Card, Tabs

5. API接口使用说明
#### api接口相关的文件放在`src/api`这个目录下 项目中需要使用的api接口时 先在api目录下建一个js文件，这个文件里引用`APIInterceptors`这个接口拦截器，然后定义相关的接口名称，
#### 比如定义了一个`home.js`的文件（这个文件可以根据项目需求来，比如按照页面或者模块来定义）
```
import { HIS_HTTP } from "@/api/APIInterceptors";

export function login(data) {
  return HIS_HTTP.post("/api/scrm/auth/login-general", data);
}

```
#### 在页面中使用
```
<script>
import { login } from '@/api/home';
export default {
  name: "home",
  created() {
      login({
          name:'zhangsan',
          password:'123456'
      }).then((res)=>{
          
      }).catch((err)=>{
          
      })
  }
};
</script>


```
