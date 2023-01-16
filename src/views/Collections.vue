<template>
    <el-scrollbar>
        <el-table :data="co.tableData.data" :height="'95vh'"
                  :show-overflow-tooltip="true"
                  :highlight-current-row="true" @row-click="co.showDetail"
                  :stripe="false">
            <el-table-column fixed prop="name" label="收集标题" width="180"/>
            <el-table-column prop="address" sortable label="状态" width="180"/>
            <el-table-column prop="name" sortable label="提交次数" width="180"/>
            <el-table-column prop="date" label="截止日期" width="180"/>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="co.search" style="width: 230px" clearable prefix-icon="Search"
                              placeholder='搜索问卷'/>
                </template>
                <template #default="scope">
                    <el-button type="success" size="small" @click="share(scope.row)">分享</el-button>
                    <el-button type="primary" size="small" @click="analysis(scope.row)">分析</el-button>
                    <el-button type="warning" size="small" @click="close(scope.row)">结束</el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--弹窗-->
        <!--分享问卷-->
        <Dialog title="分享问卷" :show="shareView" @close="shareExit">
            <div>
                <el-image style="border-radius: 4px"
                          src="https://upload.jianshu.io/users/upload_avatars/1549384/30d9312b-07e7-4e37-a057-0092400560d4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240"/>
            </div>
            <div
                style="padding: 4px 2px;color: black;font-size: 14px;background-color: gainsboro;border-radius: 4px;box-sizing: border-box">
                链接: <a target="_blank" href="http://www.fixyou.top">http://www.fixyou.top</a></div>
        </Dialog>
        <!--关闭问卷-->
        <Dialog title="结束问卷" :show="closeView" @close="closeExit">
            <div>确定要结束此问卷？</div>
            <template #footer>
                <el-button @click="closeExit">取消</el-button>
                <el-button>确定</el-button>
            </template>
        </Dialog>
        <!--删除问卷-->
        <Dialog title="删除问卷" :show="removeView" @close="removeExit">
            <div>确定要删除此问卷？</div>
            <template #footer>
                <el-button @click="removeExit">取消</el-button>
                <el-button>确定</el-button>
            </template>
        </Dialog>

    </el-scrollbar>
</template>

<script setup>

import {reactive, ref, toRefs, watch} from "vue";
import {navTo} from "../hooks/util";
import Dialog from "../components/other/cmp/Dialog.vue";
import useCollections from "../hooks/useCollections";

let co = reactive(useCollections());

let shareView = ref(false);
let closeView = ref(false);
let removeView = ref(false);
// 点击按钮的方法

const analysis = (data) => {
    navTo('collections/analysis/2')
};
const share = (data) => {
    shareView.value = true;
    console.log("shareClick")
}

const close = (data) => {
    closeView.value = true;
};

const remove = (data) => {
    removeView.value = true;
};

// 关闭方法

const shareExit = () => {
    shareView.value = false;
}

const closeExit = () => {
    closeView.value = false;
}

const removeExit = () => {
    removeView.value = false;
};


</script>

<style scoped>
.collections {
    box-sizing: border-box;
    padding: 8px;
    width: calc(100vw - 200px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 10px;
}
</style>