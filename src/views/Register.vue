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
                                <el-input/>
                                <div class="label">验证码</div>
                                <div style="display: flex">
                                    <el-input/> <el-button style="margin-left: 8px;width: 40%;" type="primary">请 求</el-button>
                                </div>
                                <div class="label">密码</div>
                                <el-input v-model="password" type="password"/>
                                <div class="label">确认密码</div>
                                <el-input v-model="password" type="password"/>
                            </div>

                            <div style="">
                                <el-button style="margin-top: 24px;width: 100%" type="primary">注 册</el-button>
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
import {navTo} from "../api/util";
import Header from "../components/other/cmp/Header.vue";
import JhCard from "../components/other/cmp/JhCard.vue";
import {ref} from "vue";
import {login} from "../api/user";
import {ElMessage} from "element-plus";

let account = ref("");
let password = ref("");

function userLogin() {
    let data = {
        account: account.value,
        password: password.value
    }
    login(data).then(res => {
        if (res.data.code === 200) {
            localStorage.setItem('token', res.data.data)
            ElMessage.success({
                message: "登录成功,3s后跳转",
                showClose: true,
                duration: 2000,
            })
            setInterval(() => {
                navTo('/create')
            }, 2000)
        } else {
            ElMessage.error(res.data.message)
        }
    })
}

</script>

<style scoped>
.label {
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 16px;
    color: rgb(139,139,141);
    font-family: siyuan, deyihei;
}
</style>