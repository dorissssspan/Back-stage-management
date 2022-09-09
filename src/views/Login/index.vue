<template>
    <div class="login-index">
        <el-button class="show-account"
                   type="text"
                   @click="accountTip">提示帐号信息
        </el-button>
        <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
        >
            <h1 class="login_title">后台管理登录</h1>
            <el-form-item label="账号" prop="username" label-width="80px">
                <el-input
                        type="username"
                        v-model="ruleForm.username"
                        autocomplete="off"
                        placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密  码" prop="password" label-width="80px">
                <el-input
                        type="password"
                        v-model="ruleForm.password"
                        autocomplete="off"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked"
                         checked
                         class="remember">记住密码</el-checkbox>
            <el-form-item>
                <el-button
                        class="login_submit"
                        type="primary"
                        @click="loginForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getLogin } from "@/util/data";
    export default {
        name: "LoginIndex",
        data(){
            return{
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: "请输入用户名" , trigger: 'blur' },
                        {
                            min: 3,
                            message: "用户名长度不能小于3位",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: 'blur' }
                    ]
                },
                checked: true
            }
        },
        methods:{
            loginForm() {
                getLogin(this.ruleForm).then(({data:res})=>{
                    if(res.meta.status === 200){
                        this.$store.state.username = res.data.username;
                        this.$store.state.authority = res.data.authority;
                        this.$store.commit('clearMenu')
                        this.$store.commit('setMenu',res.data.menu)
                        this.$store.commit('setToken',res.data.token)
                        this.$store.commit('addMenu',this.$router)  //动态添加路由
                        this.$message.success('登录成功')
                        this.$router.push('/')
                    } else {
                        this.$message.warning("用户名或密码错误")
                    }
                })
            },
            accountTip(){
                this.$notify({
                    title: '账号：xixi',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>密码：<i>xixi</i></strong>',
                    type: 'success',
                    position: 'bottom-left'
                })
            }
        }
    }
</script>

<style scoped lang="less">
.login-index{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 450px;
    padding: 30px 15px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.show-account{
    position: absolute;
    left: 15px;
    bottom: 20px;
    color: red;
}
.login_title{
    margin: 0 auto 25px auto;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    color: #505458
}
.remember {
    left: 50px;
    /*margin: 0px 0px 35px 0px;*/
}
.login_submit{
    width: 100px;
    margin: 0px 75px;
    margin-top: 5px;
}

</style>
