<template>
    <div>
        <div :id="props.data.id" style="height: 200px;width: 100%;"/>
    </div>
</template>

<script setup>

import {getCurrentInstance, onMounted} from "vue";

let props = defineProps({
    data: {
        id: Number,
        name: String,
        options: Array,
        countArr: Array,
    }
})

onMounted(() => {
    let {proxy} = getCurrentInstance();
    let myChart = proxy.$echarts.init(document.getElementById(props.data.id));

    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [

                ]
            }
        ]
    };
    option.series[0].name = props.data.name
    for (let i = 0; i < props.data.options.length; i++) {
        option.series[0].data.push({
            value: props.data.map[props.data.options[i]],
            name: props.data.options[i],
        })
    }
    myChart.setOption(option)
    window.addEventListener('resize',myChart.resize)
})

</script>

<style scoped>

</style>