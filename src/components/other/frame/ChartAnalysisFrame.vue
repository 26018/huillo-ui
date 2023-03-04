<template>
    <div>
        <div class="deep." style="display: flex;height: 260px">
            <div class="line." style="height: 100%;flex: 1;padding: 0 8px;box-sizing: border-box">
                <div :id="chartId" class="chart"/>
            </div>
            <div style="margin-left: auto;max-width: 600px;min-width: 500px;height: 100%">
                <el-table :data="tableData" :border="true" height="100%">
                    <el-table-column prop="options" label="选项"/>
                    <el-table-column prop="count" label="数量"/>
                    <el-table-column prop="percentage" label="百分比"/>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>

import {getCurrentInstance, onMounted} from "vue";

let props = defineProps(['chartId', 'chartData', 'tableData']);

onMounted(() => {
    let {proxy} = getCurrentInstance();
    let myChart = proxy.$echarts.init(document.getElementById(props.chartId));
    myChart.setOption(props.chartData);
    window.addEventListener('resize', myChart.resize);
});

</script>

<style scoped>

.chart {
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

</style>