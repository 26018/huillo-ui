<template>
    <div>
        <chart-analysis-frame :chart-id="data.id" :chart-data="option" :table-data="tableData"/>
    </div>
</template>

<script setup>

import {onBeforeMount, reactive, ref} from "vue";
import ChartAnalysisFrame from "../other/frame/ChartAnalysisFrame.vue";

let props = defineProps({
    data: {
        id: Number,
        name: String,
        options: Array,
        countArr: Array,
    }
})

let option = ref({});
let tableData = reactive([]);

// 在页面还未渲染时，计算数据
onBeforeMount(() => {
    option.value = {
        title: {
            text: 'Test',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'left',
            orient: "vertical"
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '50%',
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                data: []
            }
        ]
    };
    option.value.series[0].name = props.data.name
    for (let i = 0; i < props.data.options.length; i++) {
        option.value.series[0].data.push({
            value: props.data.map[props.data.options[i]],
            name: props.data.options[i],
        })
    }

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
})

</script>

<style scoped>

</style>