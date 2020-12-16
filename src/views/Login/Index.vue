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
                        <el-button type="success" v-bind:disabled="codeButtonStatus" class='block' @click="getCode">{{codeButtonText}}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class='form-item'> 
                <el-button type="danger" class='block top' :disabled='buttonStatus' @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
            </el-form-item>
       </el-form>
     </div>
    </div>  
</template>
<script>
import validateUtils from '@/utils/validate.js'
import {onMounted,reactive,ref} from '@vue/composition-api'
import {get_code,do_register,do_login} from '@/api/login.js'
export default {
    setup(prop,{refs,root}){
        //—————————————————————————————————————————————————————————生命周期————————————————————————————————————————————————————————————
        // onMounted(()=>{
        //     get_code().then(res=>{
        //         console.log(res)
        //     })
        // })
        //——————————————————————————————————————————————————————————data——————————————————————————————————————————————————————————————
        const status_username=ref(false)
        const status_password=ref(false)
        const status_password1=ref(false)
         //验证码
        let validatecode = (rule, value, callback) => {
            ruleForm.code =value= validateUtils.validate_inputValue(value,'code');
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(validateUtils.test_code(value)){
                callback(new Error('验证码格式错误!'));
            }else{
                callback();
            }
      };
      //邮箱
      let validateUsername = (rule, value, callback) => {
          ruleForm.username =value=validateUtils.validate_inputValue(value,'email');
            if (value === '') {
                status_username.value=false
                callback(new Error('请输入邮箱'));
            } else if(validateUtils.test_email(value)){
                 status_username.value=false
                    callback(new Error('邮箱格式错误!'));
            }else{
                 status_username.value=true
                callback();
            }
      };
      //密码
      let validatepassword = (rule, value, callback) => {
          ruleForm.password =value=validateUtils.validate_inputValue(value,'password');
            if (value === '') {
                status_password.value=false
                callback(new Error('请输入密码'));
            } else if (validateUtils.test_password(value)) {
                 status_password.value=false
                callback(new Error('密码格式6~20位'));
            } else {
                 status_password.value=true
                callback();
            }
      };
      //重复密码
      let validatepassword1 = (rule, value, callback) => {
          if(mode.value =='login'){
              callback();
              return
          }
          //验证码的字段 输入的值 验证后做什么(回调函数)
          ruleForm.password1 =value=validateUtils.validate_inputValue(value,'password1');
           if(value!==ruleForm.password){
                status_password1.value=false
                callback(new Error('两次密码不一致'));
            }else{
                 status_password1.value=true
                callback();
            }
      };
        //定义tob切换模式
        const mode = ref('login')
        //定义表单相关数据
        const menuTab=reactive([
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ])
            //input绑定的数据
        const ruleForm = reactive ({
                    username: '',
                    password: '',
                    password1:'',
                    code: ''
            })
       //校验方式
       const rules=reactive( {
        username:[
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
                  })

        //定义登录注册按钮启用和禁用
        const buttonStatus=ref(true)
        //定义验证码按钮启用和禁用
        const codeButtonStatus = ref(false)
        //定义验证码按钮文本
        const codeButtonText =ref('获取验证码')
        //定义验证码延迟定时器
        const timer_delay =ref(null)
        //定义验证码倒计时定时器
        const timer_count_down=ref(null)
        //——————————————————————————————————————————————————metods————————————————————————————————————————————————————
        const submitForm=(formName=>{
            //对表单的每一个字段再次进行验证
            refs[formName].validate((valid) =>{
                if(valid){
                    //执行登录注册
                    mode.value=== 'login'? doLogin():doRegister()
                }else{
                    return false
                }
            })
        })
        const toggleMenu=((item)=>{
            menuTab.map(item => item.current = false)
            item.current= true
            mode.value=item.type
            //点击切换的时候清空表单数据
            refs['ruleForm'].resetFields()
            //还原验证码相关状态
            resetCodeButton()
            //还原登录注册按钮状态
            buttonStatus.value=true
        })
        //获取验证码
        const getCode=(()=>{
            const {result,filed} = validateFileds()
            let offset=0
            //判断邮箱格式 密码 重复密码 的格式
            if(!result){//true 验证通过false 验证失败
            filed.map(item=>{
                offset +=40
                root.$message({
                    type:'error',
                    message:`错误字段:${item.message}`,
                    offset:offset,
                    duration:2000
                })
            })
                return false
            }
            //让按钮禁用 显示 "发送中"
             setCodeButton({
                            status:true,
                            text:'发送中'
                        })
            //为了模拟网络延迟 定时器
            timer_delay.value=setTimeout(()=>{
                const data ={
                    username:ruleForm.username,
                    module:mode.value
                }
                get_code(data).then((res)=>{
                    // console.log( res )
                    //显示倒计时
                    countDown(60)
                    //获取到对应的验证码
                    root.$message.success(res.data.message);
                //让登陆注册按钮启用
                    buttonStatus.value= false
                }).catch((err)=>{
                    console.log(2)
                })
            },3000)
        })
        //————————————————————————————————————————————————————辅助方法——————————————————————————————————————————————
        //验证码定时器的倒计时效果
        const countDown =(timer)=>{
            if(timer_count_down.value){//存在定时器
                clearInterval(timer_count_down.value)
            }
            timer_count_down.value=setInterval(()=>{
                timer--;
                if(timer === 0){
                    clearInterval(timer_count_down.value)
                    //显示重新发送
                    setCodeButton({
                            status:false,
                            text:'重新发送'
                        })
                }else{
                    codeButtonText.value= `倒计时${timer}秒`
                }
            },1000)
        }
        //还原验证码相关状态
        const  resetCodeButton = ()=>{
            //默认 启用 获取验证码
            setCodeButton({
                status:false,
                text:'获取验证码'
            })
            //清空所有定时器
            clearTimeout(timer_delay.value)
            clearInterval(timer_count_down.value)
        }
        //设置获取验证码的相关状态
        const setCodeButton=({status,text})=>{
            codeButtonStatus.value=status
            codeButtonText.value=text
        }
        //执行登录
        const doLogin =()=>{
            const data={
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            root.$store.dispatch('app/login',data).then(res=>{
                 root.$message.success(res.data.message)
                //登录然后跳转到页面
                root.$router.push({
                    name:'Home'
                })
            }).catch(err=>{

            })
        //     //网络请求 vuex- actions -->mutations -->state
        //     do_login(data).then(res=>{
        //         //提示登录成功
        //         root.$message.success(res.data.message)
        //         //登录然后跳转到页面
        //         root.$router.push({
        //             name:'Home'
        //         })
        //     }).catch(err=>{

        //     })
        }
        //执行注册
        const doRegister=()=>{
            const data={
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            //执行注册
            do_register(data).then(res=>{
               //提示注册成功
               root.$message.success(res.data.message)
                //注册成功后直接切换到登录tab
                toggleMenu(menuTab[0])
            }).catch(err=>{

            })
        }
        //发送验证码时验证相关字段
          const validateFileds = () => {
      const result = status_username.value && status_password.value
      const _filed_arr = [
        {
          filed: 'username',
          flag: status_username.value,
          message: '邮箱格式错误',
        },
        { filed: 'password', flag: status_password.value, message: '密码错误' },
      ]
      if (mode.value === 'register') {
        _filed_arr.push({
          filed: 'password1',
          flag: status_password1.value,
          message: '重复密码错误',
        })
        result: status_username.value &&
          status_password.value &&
          status_password1.value
      }


      return {
        result: result,
        filed: _filed_arr.filter((item) => !item.flag),
      }
    }
        return{
            mode,
            menuTab,
            ruleForm,
            rules,
            toggleMenu,
            submitForm,
            getCode,
            buttonStatus,
            codeButtonStatus,
            codeButtonText,
            timer_delay
        }
    }
}
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
    margin:200px auto;
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