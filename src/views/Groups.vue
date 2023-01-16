<template>
    <el-scrollbar>
        <el-space wrap>
            <el-card style="min-width: 180px" v-for="i in 10">
                <template #header>Test</template>
                <template #default>
                    <div style="display: flex;align-items: baseline">
                        <div>成员</DIV>
                        <div style="margin-left: auto">{{ i }}</div>
                    </div>
                </template>
            </el-card>
            <el-card style="min-width: 180px">
                <template #header>
                    <div style="user-select: none;text-align: center">新建群组</div>
                </template>
                <template #default>
                    <div @click="switchDialog(true)" class="addIcon">
                        <el-icon>
                            <CirclePlus/>
                        </el-icon>
                    </div>
                </template>
            </el-card>
        </el-space>


       <Dialog title="新建群组" :show="showGroupView" @close="closeView">
            <template #default>
                <el-input placeholder="群组名称"></el-input>
                <el-input placeholder="人数上限" style="margin-top: 8px"></el-input>
            </template>
            <template #footer>
                <div>
                    <el-button @click="closeView">取消</el-button>
                    <el-button @click="addGroup" type="primary">创建</el-button>
                </div>
            </template>
       </Dialog>

    </el-scrollbar>


</template>

<script setup>

import {ref, watch} from "vue";
import Dialog from "../components/other/cmp/Dialog.vue";
import {ElMessage} from "element-plus";

let showGroupView = ref(false);

const addGroup = () => {
    ElMessage.success({
        message: '创建成功',
        showClose: true,
    })
    closeView()
}
const closeView = () => {
    showGroupView.value = false;
};
const switchDialog = (data) => {
    showGroupView.value = data;
};

</script>

<style scoped>

.addIcon{
    display: flex;justify-content: center;
}
.addIcon:hover {
    color: royalblue;
}
</style>