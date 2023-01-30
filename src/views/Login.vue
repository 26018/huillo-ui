<template>
    <Header :height="'50px'" @iconActive="navTo('/')"></Header>
    <div style="max-width: 400px;margin:0 auto;transform: translate(0,30%)">
        <el-card>
            <template #header>
                <div style="font-weight: 600;font-size: 24px">登录</div>
            </template>
            <template #default>
                <div>
                    <div class="label">账号</div>
                    <el-input v-model="account"></el-input>
                    <div class="label">密码</div>
                    <el-input v-model="password"></el-input>
                </div>
                <div style="display:flex;">
                    <el-button @click="login({account,password})" type="primary" style="margin-top: 8px">登录</el-button>
                    <el-button link type="warning" @click="navTo('/register')"
                               style="margin-left: auto;margin-top: 8px">没有账号？去注册
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import {navTo} from "../api/util";
import Header from "../components/other/cmp/Header.vue";
import {ref} from "vue";
import {login} from "../api/user";

let account = ref("");
let password = ref("");

</script>

<style scoped>
.label {
    margin-top: 8px;
    font-size: 16px;
}
</style>