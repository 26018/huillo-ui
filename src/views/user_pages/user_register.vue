<template>
    <Header :height="'50px'" @iconActive="navTo('/')"></Header>
    <div style="width: 100%;height: calc(100vh - 50px)">
        <div
            style="height: 100%;display: flex;
            background-image: linear-gradient(90deg, rgb(249,244,244), rgb(244,246,250) 50%, rgb(244,246,250))"
            class="deep.">
            <div style="flex: 1;height: 100%;">
                <div
                    style="height: 100%;display: flex;flex-direction: column;
                    justify-content: center;align-items: center">
                    <div style="font-size: 45px; font-family: '华文行楷', serif; ">Huillo</div>
                    <img src="/src/assets/survey_register.png" alt="" width="400">
                </div>
            </div>
            <div style="width: 50%;display: flex;align-items: center">
                <div style="
                height: 500px;
                width: fit-content;
                background-color: white;
                border-radius: 8px">
                    <jh-card width="400px" height="500px" border-radius="8px">
                        <div style="height: 100%;display: flex;flex-direction: column;justify-content: space-between">
                            <div>
                                <div style="font-family: deyihei;font-size: 24px;margin-bottom: 16px">注册Huillo</div>
                                <div class="label">邮箱</div>
                                <el-input v-model="account"/>
                                <div class="label">验证码</div>
                                <div style="display: flex">
                                    <el-input v-model="verify_code"/>
                                    <el-button @click="sendVerifyCode" style="margin-left: 8px;width: 40%;"
                                               type="primary">请 求
                                    </el-button>
                                </div>
                                <div class="label">昵称</div>
                                <el-input v-model="username"/>
                                <div class="label">密码</div>
                                <el-input v-model="password" show-password type="password"/>
                                <div class="label">确认密码</div>
                                <el-input v-model="repeatPassword" show-password type="password"/>
                            </div>

                            <div style="">
                                <el-button @click="userRegister" style="margin-top: 24px;width: 100%" type="primary">注
                                    册
                                </el-button>
                                <el-button @click="navTo('/login')" link type="primary"
                                           style="margin-top: 16px;width: 100%">
                                    已有huillo账号？去登录
                                </el-button>
                            </div>
                        </div>
                    </jh-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {navTo} from "../../api/util";
import Header from "../../components/other/cmp/Header.vue";
import JhCard from "../../components/other/cmp/JhCard.vue";
import {ref} from "vue";
import {login, register, user_sendCode} from "../../api/user";
import {ElMessage} from "element-plus";

let account = ref("");
let username = ref("");
let password = ref("");
let repeatPassword = ref("");
let verify_code = ref("");


function userRegister() {
    if (password.value !== repeatPassword.value) {
        ElMessage.error("两次密码不一致");
        return false;
    }
    let user = {
        username: username.value,
        account: account.value,
        password: password.value,
        verifyCode: verify_code.value,
    }
    register(user).then(res => {
        if (res.data.code === 200) {
            ElMessage.success("注册成功，去登录吧！");
        }
    })
}

function sendVerifyCode() {
    user_sendCode(account.value).then(res => {
        if (res.data.code === 200) {
            ElMessage.success("验证码发送成功");
        }
    });
}


</script>

<style scoped>
.label {
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 16px;
    color: rgb(139, 139, 141);
    font-family: siyuan, deyihei, sans-serif;
}
</style>