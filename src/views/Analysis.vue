<template>
    <div>
        <el-scrollbar>
            <el-space direction="vertical" :fill="true" style="width: 100%;">
                <div style="display: flex;align-items: center">
                    <el-icon style="cursor: pointer" :size="24" @click="navTo(-1)">
                        <ArrowLeft/>
                    </el-icon>
                    <div style="font-size: 24px;margin-left: 8px">问卷分析</div>
                    <el-button style="margin-left: auto" type="primary">导出数据</el-button>
                </div>
                <read-only-text style="text-align: center;" size="30px" data="在线文件收集调查"></read-only-text>
                <el-card>
                    <div style="display: flex;justify-content: space-between">
                        <el-button link>提交人数：8</el-button>
                        <el-button link>创建时间：2022/02/08</el-button>
                        <el-button link>截止时间：2022/02/24</el-button>
                        <el-button link>总共用时：8天5小时</el-button>
                    </div>
                </el-card>
                <BarChart v-for="i in dataArr" :data="i"/>

                <div  style="margin: 0 auto;width: 100%;text-align: center">到底了...</div>
            </el-space>
        </el-scrollbar>
    </div>
</template>

<script>
import {navTo} from "../api/util";
import ReadOnlyText from "../components/other/cmp/ReadOnlyText.vue";
import BarChart from "../components/echarts/BarChart.vue";
import {onMounted} from "vue";

export default {
    components: {BarChart, ReadOnlyText},
    setup() {

        let dataArr = [
            {
                id: "main",
                name: "为啥子选择echarts",
                options: ["只听说过echarts", "不晓得为啥子", "同事推荐给我的", "维护旧项目需要"],
                countArr: [5, 20, 36, 10, 10, 20, 4],
            }
        ]

        for (let i = 0; i < 0; i++) {
            let data = dataArr[0];
            let copyData = {};
            copyData.id = data.id + i;
            copyData.name = data.name + i;
            copyData.options = data.options;
            copyData.countArr = data.countArr;
            dataArr.push(copyData);
        }


        onMounted(()=>{
            // 固定头栏
            let ele = document.getElementsByClassName('el-space__item');
            ele[0].style.position = 'sticky'
            ele[0].style.top = 0
            ele[0].style.overflow = 'hidden'
            ele[0].style.backgroundColor = 'white'
            ele[0].style.zIndex = '999'
        })

        return {navTo, dataArr}
    },


}


</script>

<style scoped>

</style>