<template>
        <pc-view>
            <Header :nav="navData.navData" @iconActive="$router.push('/')" height="50px"></Header>
            <div class="pc-create">
                <component-list/>
                <component-create/>
                <component-preview/>
            </div>
            <Dialog :show="navData.publishAble.value" @close="()=>{navData.publishAble.value = false}"
                    :title="'问卷发布'">
                <template #default>
                    <div style="display: flex;flex-direction: column">
                        <el-space :fill="true">
                            <read-only-text data="请选择一个群组"/>
                            <el-select v-model="selectedGroup" clearable placeholder="Select">
                                <el-option v-for="item in groupArr" :key="item.id" :label="item.name"
                                           :value="item.name"/>
                            </el-select>
                            <el-date-picker v-model="endTime" placeholder="问卷截止日期"/>
                        </el-space>
                    </div>

                </template>
                <template #footer>
                    <el-button @click="()=>{navData.publishAble.value = false}">取消</el-button>
                    <el-button type="primary" @click="()=>{
                    navData.publish();
                    navData.publishAble.value = false
                }">创建
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
import Dialog from '../components/other/cmp/Dialog.vue'
import useCreateNav from "../hooks/useCreateNav";
import ReadOnlyText from "../components/other/cmp/ReadOnlyText.vue";
import {ref} from "vue";
let navData = useCreateNav()
let selectedGroup = ref("");
let groupArr = [{
    id: 1,
    name: "葬爱家族永不磨灭",
},{
    id: 2,
    name: "西山不倒小组"
}]

let endTime = ref("");
</script>

<style scoped>
.pc-create {
    height: calc(100vh - 50px);
    display: flex;
    background-color: rgba(243, 246, 249);
    justify-content: space-between;
}
</style>