<template>
    <div>
        <div :id="props.data.id" style="height: 200px;width: 100%;"/>
    </div>
</template>

<script setup>
// data是柱状图的数据，desc是柱状图的描述
import {getCurrentInstance, onMounted} from "vue";

let props = defineProps({
    data: {
        id: Number,
        name: String,
        options: Array,
        countArr: Array,
    }
});

onMounted(() => {
    let {proxy} = getCurrentInstance();
    let myChart = proxy.$echarts.init(document.getElementById(props.data.id));

    let option = {
        tooltip: {},
        legend: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '',
            type: "bar",
            data: []
        }]
    };
    option.xAxis.data = props.data.options;
    option.series[0].data = props.data.countArr;
    option.series[0].name = props.data.name;
    myChart.setOption(option)

    window.addEventListener('resize',myChart.resize)

});


</script>

<style scoped>

</style>