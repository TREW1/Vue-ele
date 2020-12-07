import axios  from 'axios'
import {Message} from 'element-ui'
const BASEUSRL =process.env.NODE_ENV==='development' ?'/api':''
const http = axios.create({ 
  baseURL:BASEUSRL
})
//跨域
// axios.defaults.baseURL='http://www.web-jshtml.cn/productapi/'
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log('请求参数',config.headers)
    config.headers.token='xxxxx'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // console.log(response);
  if(response.data.status !=0){
    Message.error(response.data.message);
    return Promise.reject(error);
  }
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    // console.log('响应拦截')
    return Promise.reject(error);
  });

  export default http