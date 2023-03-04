<template>
    <div>
        <chart-analysis-frame :chart-id="data.id" :chart-data="option" :table-data="tableData">

        </chart-analysis-frame>
    </div>
</template>

<script setup>
// data是柱状图的数据，desc是柱状图的描述
import {onBeforeMount, reactive} from "vue";
import ChartAnalysisFrame from "../other/frame/ChartAnalysisFrame.vue";

let props = defineProps({
    data: {
        id: Number,
        name: String,
        options: Array,
        countArr: Array,
    }
});

let option = reactive({});
let tableData = reactive([]);
onBeforeMount(() => {
    option = {
        tooltip: {},
        legend: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '',
            type: "line",
            data: [],
            barWidth: '20%',
        }]
    };
    option.xAxis.data = props.data.options;
    option.xAxis.data.sort();
    option.xAxis.data.forEach(d => {
        option.series[0].data.push(props.data.map[d]);
    })
    option.series[0].name = props.data.name;

    let total = 0;
    Object.keys(props.data.map).forEach(key => {
        total += props.data.map[key];
    })
    Object.keys(props.data.map).forEach(key => {
        let value = props.data.map[key];
        tableData.push({
            options: key,
            count: value,
            percentage: value / total,
        })
    });
});


</script>

<style scoped>

</style>