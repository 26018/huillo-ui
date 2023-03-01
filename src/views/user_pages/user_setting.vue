<template>
    <div style="padding: 16px;box-sizing: border-box;">
        <div style="width: 80%;margin: 0 auto">
            <div class="title">基本信息</div>
            <div class="content">ID：{{ currentUserId }}</div>
            <div class="content">
                <div>昵称：{{ currentUsername }}</div>
                <el-button style="margin-left: auto" link type="primary" @click="()=>{ViewOpen(nicknameView)}">更改
                </el-button>
            </div>
            <div class="content">
                <div>邮箱：{{ currentAccount }}</div>
                <el-button style="margin-left: auto" link type="primary" @click="()=>{ViewOpen(accountView)}">更改
                </el-button>
            </div>
            <div class="content" style="margin-top: 24px">
                <el-button type="warning" @click="()=>{ViewOpen(modifyPasswordView)}">修改密码</el-button>
                <el-button style="margin-left: auto" type="danger" @click="()=>{ViewOpen(exitView)}">退出登录
                </el-button>
            </div>

        </div>

        <jh-dialog title="修改信息" :show="nicknameView">
            <div style="width: 300px">
                <el-input v-model="newNickName" clearable placeholder="新昵称"></el-input>
            </div>
            <template #footer>
                <el-button @click="()=>{ViewClose(nicknameView)}">取 消</el-button>
                <el-button type="primary" @click="changeUserInfo(
                    {id:currentUserId,username:newNickName})">确认修改
                </el-button>
            </template>
        </jh-dialog>
        <jh-dialog title="修改信息" :show="accountView">
            <div style="width: 300px">
                <el-input v-model="newAccount" clearable placeholder="新邮箱"></el-input>
            </div>
            <template #footer>
                <el-button @click="()=>{ViewClose(accountView)}">取 消</el-button>
                <el-button type="primary" @click="changeUserInfo({
                id:currentUserId,
                account:newAccount
                })">确认修改
                </el-button>
            </template>
        </jh-dialog>

        <jh-dialog title="修改密码" :show="modifyPasswordView">
            <div style="width: 300px">
                <el-input v-model="oldPassword" clearable placeholder="旧密码"></el-input>
                <el-input v-model="newPassword" clearable type="password" style="margin-top: 8px"
                          placeholder="新密码"></el-input>
            </div>
            <template #footer>
                <el-button @click="()=>{ViewClose(modifyPasswordView)}">取 消</el-button>
                <el-button type="danger" @click="()=>{}">确认修改</el-button>
            </template>
        </jh-dialog>


        <jh-dialog title="退出Huillo" :show="exitView">
            <div style="font-weight: 600;">真的要退出登录吗？</div>
            <template #footer>
                <el-button @click="()=>{ViewClose(exitView)}">取 消</el-button>
                <el-button type="primary" @click="exitLogin">确 定</el-button>
            </template>
        </jh-dialog>

    </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {user_ChangePassword, user_info, userUpdate} from "../../api/user";
import JhDialog from "../../components/other/cmp/JhDialog.vue";
import {navTo, ViewClose, ViewOpen} from "../../api/util";
import {ElMessage} from "element-plus";


let currentAccount = ref("");
let currentUsername = ref("");
let currentUserId = ref("");

let newPassword = ref("");
let oldPassword = ref("");
let newNickName = ref("");
let newAccount = ref("");

let nicknameView = reactive({data: false})
let accountView = reactive({data: false})
let modifyPasswordView = reactive({data: false})
let exitView = reactive({data: false})

function exitLogin() {
    localStorage.removeItem('token');
    navTo('/')
}

function changeUserInfo(update) {
    userUpdate(update).then(res => {
        if (res.data.code === 200) {
            ElMessage.success("修改成功");
        }
    });
}


onMounted(() => {
    user_info().then(res => {
        const {account, username, id} = res.data.data;
        currentAccount.value = account;
        currentUsername.value = username;
        currentUserId.value = id;
    })
})

</script>

<style scoped>

.title {
    font-size: 24px;
    font-family: '微软雅黑', serif;
    margin-bottom: 28px;
    margin-top: 32px;
}

.content {
    margin-top: 8px;
    margin-bottom: 16px;
    font-family: '微软雅黑', serif;
    display: flex;
    color: rgb(51, 51, 51);
    width: 600px;
}
</style>