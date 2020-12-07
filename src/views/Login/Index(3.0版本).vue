<template>
    <div id="login">
     <div class="login-wrap">
         <ul class="menu-tab">
             <li :class='{"current":item.current}' v-for='(item,index) in menuTab' :key='index' @click='toggleMenu(item)'>{{item.txt}}</li>
         </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
            <el-form-item prop="username" class='form-item'>
                <label for="username">邮箱</label>
                <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password" class='form-item'>
                <label for="password">密码</label>
                <el-input id="passsword" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-show='mode=="register"' prop="password1" class='form-item'>
                <label for="password1">重复密码</label>
                <el-input id="passsword1" type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="code" class='form-item'>
                <label for="code">验证码</label>
                <el-row :gutter="10">
                    <el-col :span="15">
                        <el-input id="code" v-model="ruleForm.code"></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-button type="success" class='block'>获取验证码</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class='form-item'> 
                <el-button type="danger" class='block top' @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
            </el-form-item>
       </el-form>
     </div>
    </div>  
</template>
<script>
import validateUtils from '@/utils/validate.js'
import {reactive,ref} from '@vue/composition-api'
export default {

    setup(prop,{refs}) {
        // context.attrs
        // context.slots
        // context.parent
        // context.root
        // context.emit 
        // context.refs
    //1.数据的定义和使用
    //引用类型数据 object array
    // const obj = reactive({name:'zhangsan',age:21})
    // console.log(obj.name)
    //基于类型数据string  number boolean null undefined 返回的是一个响应式对象
    // const num = ref(188)
    /*响应式
    //获取 .value 触发get方法
    num.value
    //设置.value='新值' 触发set方法 -->通知视图更新
    num .value=1000
    */
   //2.setup 定义数据 生命周期钩子 自定义方法
   //1.定义前的数据必须return 如果不return 不能再模板中使用
   //定义生命周期
    },

    data(){
        //验证码
        var validatecode = (rule, value, callback) => {
            this.ruleForm.code =value= validateUtils.validate_inputValue(value,'code');
            
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(validateUtils.test_code(value)){
                callback(new Error('验证码格式错误!'));
            }else{
                callback();
            }
      };
      //邮箱
      var validateUsername = (rule, value, callback) => {
          this.ruleForm.username =value=validateUtils.validate_inputValue(value,'email');
         
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if(validateUtils.test_email(value)){
                    callback(new Error('邮箱格式错误!')); 
            }else{
                callback();
            }
      };
      //密码
      var validatepassword = (rule, value, callback) => {
          this.ruleForm.password =value=validateUtils.validate_inputValue(value,'password');
           
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (validateUtils.test_password(value)) {
                callback(new Error('密码格式6~20位'));
            } else {
                callback();
            }
      };
      //重复密码
      var validatepassword1 = (rule, value, callback) => {
          if(this.mode =='login'){
              callback();
              return
          }
          this.ruleForm.password1 =value=validateUtils.validate_inputValue(value,'password1');
           if(value!==this.ruleForm.password){
                callback(new Error('两次密码不一致'));
            }else{
                callback();
            }
      };
        return {
            mode:'login',
            menuTab:[
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ],

            ruleForm: {
                    username: '',
                    password: '',
                    password1:'',
                    code: ''
            },
            rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatepassword, trigger: 'blur' }
                    ],
                     password1: [
                        { validator: validatepassword1, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validatecode, trigger: 'blur' }
                    ]
                  }
     }   
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) =>{
                if(valid){
                    alert('submit!');
                }else{
                    consoloe.log('error submit!!');
                    return false
                }
            });
        },
        toggleMenu(item){
            this.menuTab.map(item => item.current = false)
            item.current= true
            this.mode=item.type
        }
    }
};
</script>
<style lang="scss">
 #login{
    height:100vh;//100%vh  基于浏览器的可视区域处理
    background-color:#344a5f;
    display: flex;
} 
.login-wrap{
    width: 330px;
    height:300px;
    margin:0 auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
    }
   .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    label{
        display: block; 
        font-size: 14px;
        margin-bottom: 3px;
        color:#fff;
    }
    .form-item{
        margin-bottom:13px ;
    }
    .top{
        margin-top: 20px;
    }
    .block{
        display: block;
        width: 100%;
    }
}
</style>