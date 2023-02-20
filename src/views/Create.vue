<template>
   <div>
       <Header :nav="navData" @iconActive="$router.push('/')" height="45px"></Header>
       <div class="pc-create">
           <component-list/>
           <component-create/>
           <component-preview/>
       </div>
       <jh-dialog :show="publishAble" @close="ViewClose(publishAble)" :title="'问卷发布'">
           <template #default>
               <div style="display: flex;flex-direction: column;max-width: 400px">
                   <el-space :fill="true">
                       <el-row>
                           <div>通知朋友：</div>
                           <el-select style="flex:1" v-model="selectedGroupList" multiple clearable
                                      placeholder="选择您的群组">
                               <el-option v-for="item in groupList" :key="item.id" :label="item.title"
                                          :value="item.id"/>
                           </el-select>
                       </el-row>
                       <el-row>
                           <div>截止日期：</div>
                           <el-date-picker type="datetime" :default-time="new Date()" style="flex: 1" v-model="endTime" placeholder="截止日期"/>
                       </el-row>

<!--                       <el-row>-->
<!--                           <div>允许匿名填写：</div>-->
<!--                           <el-switch inline-prompt v-model="anonymous" :active-text="'是'"-->
<!--                                      :inactive-text="'否'"></el-switch>-->
<!--                       </el-row>-->
                   </el-space>
               </div>
           </template>
           <template #footer>
               <el-button @click="ViewClose(publishAble)">取消</el-button>
               <el-button type="primary" @click="()=>{  publish(); ViewClose(publishAble)}">创建
               </el-button>
           </template>
       </jh-dialog>
   </div>
</template>

<script setup>
import Header from "../components/other/cmp/Header.vue";
import ComponentList from "../components/other/cmp/ComponentList.vue";
import ComponentCreate from "../components/other/cmp/ComponentCreate.vue";
import ComponentPreview from '../components/other/cmp/ComponentPreview.vue'
import useCreateNav from "../hooks/useCreateNav";
import {onMounted} from "vue";
import JhDialog from "../components/other/cmp/JhDialog.vue";
import {ViewClose} from "../api/util";
import {storeToRefs} from "pinia";
import {useSurvey} from "../store/survey";

let {navData, groupList, publishAble, publish} = useCreateNav();
let {selectedGroupList, anonymous, endTime} = storeToRefs(useSurvey());

onMounted(() => {

});


</script>

<style scoped>

.pc-create {
    padding: 8px 0 8px 0;
    box-sizing: border-box;
    overflow: hidden;
    height: calc(100vh - 45px);
    display: flex;
    background-color: rgba(243, 246, 249);
    justify-content: space-evenly;
}

</style>