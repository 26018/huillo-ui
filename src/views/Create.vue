<template>
    <pc-view>
        <Header :nav="navData" @iconActive="$router.push('/')" height="50px"></Header>
        <div class="pc-create">
            <component-list/>
            <component-create/>
            <component-preview/>
        </div>
        <Dialog :show="publishAble" @close="()=>{publishAble = false}" :title="'问卷发布'">
            <template #default>
                <div style="display: flex;flex-direction: column">
                    <el-space :fill="true">
                        <read-only-text data="请选择一个群组"/>
                        <el-select v-model="selectedGroupList" multiple clearable placeholder="选择您的群组">
                            <el-option v-for="item in groupArr" :key="item.id" :label="item.title" :value="item.id"/>
                        </el-select>
                        <el-date-picker v-model="questionnaireEndTime" placeholder="问卷截止日期"/>
                    </el-space>
                </div>
            </template>
            <template #footer>
                <el-button @click="()=>{publishAble = false}">取消</el-button>
                <el-button type="primary" @click="()=>{  publish();  publishAble = false}">创建
                </el-button>
            </template>
        </Dialog>
    </pc-view>
</template>

<script setup>
import Header from "../components/other/cmp/Header.vue";
import ComponentList from "../components/other/cmp/ComponentList.vue";
import ComponentCreate from "../components/other/cmp/ComponentCreate.vue";
import ComponentPreview from '../components/other/cmp/ComponentPreview.vue'
import PcView from "../components/other/cmp/PcView.vue";
import Dialog from '../components/other/cmp/JhDialog.vue'
import useCreateNav from "../hooks/useCreateNav";
import ReadOnlyText from "../components/other/cmp/ReadOnlyText.vue";
import {onMounted, ref} from "vue";
import {group_list} from "../api/group";

let {navData, publishAble, questionnaireEndTime, selectedGroupList, publish} = useCreateNav();
let groupArr = ref([]);
onMounted(() => {
    questionnaireEndTime.value = "";
    selectedGroupList.value = "";
    group_list().then(res => {
        groupArr = res.data.data
    });
});

</script>

<style scoped>
.pc-create {
    height: calc(100vh - 50px);
    display: flex;
    background-color: rgba(243, 246, 249);
    justify-content: space-between;
}
</style>