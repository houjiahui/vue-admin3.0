<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for='item in menuTab' :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item prop="username" class="item-form">
                    <label for="usename">邮箱</label>
                    <el-input id="usename" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label for="pwd1">密码</label>
                    <el-input id="pwd1" type="password" v-model="ruleForm.password" minlength="6" maxlength="20" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
                    <label for="pwd2">重复密码</label>
                    <el-input id="pwd2" type="password" v-model="ruleForm.passwords" minlength="6" maxlength="20" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button class="block" type="primary" @click="getSms()" :disabled="codebuttonstatus.status">{{ codebuttonstatus.text }}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button class="margin-top-19 login-btn block" type="danger" @click="submitForm('ruleForm')" :disabled="loginButton">{{ model === 'login' ? "登录" : "注册" }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import sha1 from 'js-sha1'
import { GetSms, Register, Login } from '@/api/login'
import { reactive, ref, onMounted } from '@vue/composition-api'
import { stripscript,validateEmail,validatePassword,validateSendCode } from '@/utils/validate'; 
export default {
    name: 'Login',
    // setup(props,context) {
        // attrs: (...) == this.attrs 
        // emit: (...)  == this.emit
        // isServer: (...)  == this.isServer
        // listeners: (...)  == this.listeners
        // parent: (...)  == this.parent
        // refs: (...)    == this.refs
        // root: (...)    == this.root
        // slots: {}      == this.slots
    setup(props,{ refs,root }) {
        // 验证邮箱
        let validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if(validateEmail(value)){
                callback(new Error('用户名格式错误'));
            } else {
                callback();
            }
        };
        // 验证密码
        let validatePwd = (rule, value, callback) => {
            ruleForm.password = stripscript(value);
            value=ruleForm.password;
            // console.log(stripscript(value));
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (validatePassword(value)) {
                callback(new Error('密码为6-20位的数字+字母'));
            } else {
                callback();
            }
        };
        // 验证重复密码
        let validatePwds = (rule, value, callback) => {
            if(model.value === 'login'){ callback(); }
            ruleForm.passwords = stripscript(value);
            value=ruleForm.passwords;
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value != ruleForm.password ) {
                callback(new Error('两次输入密码不同'));
            } else {
                callback();
            }
        }
        // 验证码
        let validateCode = (rule, value, callback) => {
            ruleForm.code = stripscript(value);
            value=ruleForm.code;
            let reg=/^([a-z0-9]{6})$/;
            if (value === '') {
                return callback(new Error('请输入验证码'));
            }else if(validateSendCode(value)){
                return callback(new Error('验证码格式有误'));
            }else{
                callback();
            }
        };
        // 声明变量，数据
        const menuTab = reactive([
            {txt:'登录',current:true,type:'login'},
            {txt:'注册',current:false,type:'register'}
        ])
        // 模块值
        const model = ref('login')
        // 登录按钮修改
        const loginButton = ref(true);
        const codebuttonstatus =reactive({
            status: false,
            text: '获取验证码'
        })
        const timer =ref(null);
        // 表单绑定数据
        const ruleForm = reactive({
            username: '',
            password: '',
            passwords: '',
            code: ''
        })
        // 表单的验证
        const rules = reactive({
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
                { validator: validatePwd, trigger: 'blur' }
            ],
            passwords: [
                { validator: validatePwds, trigger: 'blur' }
            ],
            code: [
                { validator: validateCode, trigger: 'blur' }
            ]
        }) 
        // 声明函数
        const toggleMenu=(data =>{
            menuTab.forEach(elem =>{
                elem.current=false
            })
            data.current=true;
            model.value=data.type;
            resetFromData();
            clearCountDown();
        })
        // 清除表单数据
        const resetFromData = (() => {
            // 重置表单
            // this.$refs[ruleForm].resetFields(); //2.0
            refs.ruleForm.resetFields();  // 3.0
        })
        const updateButtonStatus =((params) => {
            codebuttonstatus.status=params.status;
            codebuttonstatus.text=params.text;
        })
        // 获取验证码
        const getSms = (()=>{
            if(ruleForm.username == ''){
                root.$message.error('邮箱不能为空');
                return false;
            }
            if(validateEmail(ruleForm.username)){
                root.$message.error('请输入格式正确的用户名');
                return false;
            }
            // 请求提交
            let data= {
                username: ruleForm.username,
                module: model.value
            }
            // 请求延时
            updateButtonStatus({
                status: true,
                text: '发送中'
            })
            GetSms(data).then(response => {
                let data= response.data;
                root.$message({
                    message: data.message,
                    type: 'success'
                });
                loginButton.value = false;
                countDown(60);
            }).catch(error => {
                updateButtonStatus({
                    status: true,
                    text: '请先注册用户'
                })
            })
        })
        // 提交表单
        const submitForm = (formName => {
            // root.$router.push({
            //     name:'Console'
            // })
            // return false;
            // context.refs[formName].validate((valid) => {
            refs[formName].validate((valid) => {
                if (valid) {
                   model.value === 'login' ? login() : register() 
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        })
        // 登录
        const login = (() => {
            let requestData={
                usename: ruleForm.username,
                password: sha1(ruleForm.password),
                code: ruleForm.code
            }
            // 登录接口
            root.$store.dispatch('app/login',requestData).then(response =>{
                let data= response.data;
                root.$message({
                    message: data.message,
                    type: 'success'
                });
                root.$router.push({
                    name:'Console'
                })
            }).catch(error => {

            })
        })
        // 注册
        const register = (() => {
            let requestData = {
                usename: ruleForm.username,
                password: sha1(ruleForm.password),
                code: ruleForm.code,
                module: 'register'
            }
            // 注册接口
            Register(requestData).then(response =>{
                consoel.log(1111);
                let data= response.data;
                root.$message({
                    message: data.message,
                    type: 'success'
                });
                toggleMenu(menuTab[0]);
                clearCountDown();
            }).catch(error => {

            })
        })
        // 倒计时
        const countDown =((num)=>{
            // 判断定时器是否存在  存在就清除
            if(timer.value){clearInterval(timer.value);}
            let number = num;
            timer.value = setInterval (()=>{
                number--;
                if(number === 0){
                    clearInterval(timer.value);
                    updateButtonStatus({
                        status: false,
                        text: '再次发送'
                    })
                }else{
                    codebuttonstatus.text=`倒计时${number}秒`;
                }
            },1000)
        })
        // 清除倒计时
        const clearCountDown =(() => {
            // 按钮恢复默认状态
            updateButtonStatus({
                status: false,
                text: '获取验证码'
            })
            clearInterval(timer.value);
        })
        // 生命周期
        onMounted(() => {
            
        })
        return {
            menuTab,
            model,
            loginButton,
            codebuttonstatus,
            timer,
            rules,
            ruleForm,
            toggleMenu,
            submitForm,
            getSms,
        }
    }
}
</script>
 <style lang="scss" scoped>
    #login{
        background: #344a5f;
        height: 100vh;
    }
    .login-wrap{
        width:330px;
        margin:auto;
    }
    .menu-tab{
        text-align: center;
        li{
            display: inline-block;
            width:88px;
            line-height:36px;
            font-size: 14px;
            color:#fff;
            border-radius: 2px;
            cursor: pointer;
        }
        .current{
            background-color: rgba(0,0,0,.1);
        }
    }
    .login-form{
        margin-top:29px;
        label{
            display:block;
            font-size: 14px;
            margin-bottom: 3px;
            color:#fff;
        }
        .item-form{
            margin-bottom:13px; 
        }
        .block{
            display: block;
            width: 100%;
        }
        .login-btn{
            margin-top:19px;
        }
    }
</style>