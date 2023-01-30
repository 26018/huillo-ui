<template>
    <Header :height="'50px'" @iconActive="navTo('/')"></Header>
    <div style="margin: 0 auto;max-width: 400px;transform: translate(0,30%)">
        <el-card>
            <template #header>
                <div style="font-weight: 600;font-size: 24px">注册</div>
            </template>
            <template #default>
                <div>
                    <div class="label">昵称</div>
                    <el-input v-model="username"></el-input>
                    <div class="label">账号</div>
                    <el-input v-model="account"></el-input>
                    <div class="label">验证码</DIV>
                    <div style="display: flex">
                        <el-input v-model="verifycode"></el-input>
                        <el-button style="margin-left: 16px" type="primary">点击获取</el-button>
                    </div>
                    <div class="label">密码</div>
                    <el-input v-model="password"></el-input>
                    <div class="label">重复密码</DIV>
                    <el-input v-model="repetpassword"></el-input>
                </div>
                <div style="display:flex;">
                    <el-button @click="register({username,account,password,verifycode})" type="primary"
                               style="margin-top: 8px">注册
                    </el-button>
                    <el-button link type="warning" @click="navTo('/login')"
                               style="margin-left: auto;margin-top: 8px">已有账号？去登录
                    </el-button>
                </DIV>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import Header from '../components/other/cmp/Header.vue'
import {navTo} from "../api/util";
import {register} from "../api/user";
import {ref} from "vue";

let username = ref("");
let account = ref("");
let password = ref("");
let verifycode = ref("");
let repetpassword = ref("");


</script>

<style scoped>
.label {
    margin-top: 8px;
    font-size: 16px;
}
</style>