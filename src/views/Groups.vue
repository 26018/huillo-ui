<template>
    <el-scrollbar>
        <el-space wrap>
            <el-card style="min-width: 180px" v-show="groupData.length !==0" v-for="i in groupData">
                <template #header>
                    <div style="color: dodgerblue;cursor: pointer" @click="groupInfo(i.id)">{{ i.title }}</div>
                </template>
                <template #default>
                    <div style="display: flex;align-items: baseline">
                        <div>现有成员</DIV>
                        <div style="margin-left: auto">{{ i['currentMember'] }}</div>
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

        <jh-dialog title="新建群组" :show="showGroupView" @close="ViewClose(showGroupView)">
            <template #default>
                <el-input v-model="createGroupTitle" placeholder="群组名称"></el-input>
                <el-input v-model="createGroupMaxMember" placeholder="人数上限" style="margin-top: 8px"></el-input>
            </template>
            <template #footer>
                <div>
                    <el-button @click="ViewClose(showGroupView)">取消</el-button>
                    <el-button @click="addGroup" type="primary">创建</el-button>
                </div>
            </template>
        </jh-dialog>
        <jh-dialog :title="'群组分享'" :show="shareView" @close="ViewClose(shareView)">
            <div>
                <div style="font-size: 18px">{{ shareInfo.title }}</div>
                <div><a style="text-decoration: none" :href="shareInfo.link">{{ shareInfo.link }}</a></div>
                <el-image style="border-radius: 4px" :src="'data:image/png;base64,'+shareInfo.image"/>
            </div>
        </jh-dialog>

    </el-scrollbar>


</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import useGroups from "../hooks/useGroups";
import {group_list, group_share} from "../api/group";
import {ViewClose, ViewOpen} from "../api/util";
import JhDialog from "../components/other/cmp/JhDialog.vue";

let {
    groupData,
    showGroupView,
    createGroupTitle,
    createGroupMaxMember,
    addGroup,
    switchDialog,
} = useGroups();

let shareView = reactive({data: false})
let shareInfo = ref({})

onMounted(() => {
    group_list().then(res => {
        groupData.value = res.data.data;
    })
})

function groupInfo(groupId) {
    ViewOpen(shareView)
    group_share(groupId).then(res => {
        shareInfo.value = res.data.data
    });
}

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