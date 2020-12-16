import Vue from "vue";
import SvgIcon from './components/SvgIcon.vue';
//生命全局组件
Vue.component('svg-icon',SvgIcon)

//读取svg文件 ./svg/xxx.svg
// 第一个：目录
// 第二个：是否遍历子级目录
// 第三个：定义遍历文件规则
const req = require.context('./svg', false, /\.svg$/)//交给webpock去处理
//1解析svg的资源
req.keys().map(req)
//2.配置webpock
//3.下载loader
//npm install svg-sprite-loader -S
//使用