<template>
    <el-scrollbar>
        <el-space wrap>
            <el-card style="min-width: 180px" v-for="i in groupData">
                <template #header>{{ i.title }}</template>
                <template #default>
                    <div style="display: flex;align-items: baseline">
                        <div>成员</DIV>
                        <div style="margin-left: auto">{{ i.currentMember }}</div>
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
                <el-input v-model="createGroupTitle" placeholder="群组名称"></el-input>
                <el-input v-model="createGroupMaxMember" placeholder="人数上限" style="margin-top: 8px"></el-input>
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

import {onMounted} from "vue";
import Dialog from "../components/other/cmp/JhDialog.vue";
import useGroups from "../hooks/useGroups";
import {group_list} from "../api/group";

let {
    groupData,
    showGroupView,
    createGroupTitle,
    createGroupMaxMember,
    addGroup,
    closeView,
    switchDialog,
} = useGroups();

onMounted(() => {
    group_list().then(res => {
        groupData.value = res.data.data;
    })
})

</script>

<style scoped>

.addIcon {
    display: flex;
    justify-content: center;
}

.addIcon:hover {
    color: royalblue;
}
</style>