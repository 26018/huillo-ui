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
                <read-only-text style="text-align: center;" size="30px" :data='title'></read-only-text>
                <div v-for="i in dataList">
                    <component :is="mapCnameCharts[i.cname]" :data="i"/>
                </div>

                <div style="margin-top: 32px;width: 100%;display: flex;align-items: center;justify-content: center;"
                     v-show="showTip">暂无数据分析
                </div>
            </el-space>
        </el-scrollbar>
    </div>
</template>

<script>
import {navTo} from "../../api/util";
import ReadOnlyText from "../../components/other/cmp/ReadOnlyText.vue";
import BarChart from "../../components/echarts/BarChart.vue";
import CircleChart from "../../components/echarts/CircleChart.vue";
import LineChart from "../../components/echarts/LineChart.vue";
import {defineComponent, onMounted, ref} from "vue";
import {questionnaire_component_analysis} from "../../api/questionnaire";
import mapCnameCharts from '../../data/map_cname_charts.json';
import router from "../../router";

export default defineComponent({
    props: ['id'],
    components: {
        ReadOnlyText, BarChart, CircleChart, LineChart
    },
    setup(props) {
        let dataList = ref([])
        let showTip = ref(false);
        let title = ref('');

        onMounted(() => {
            // 固定头栏
            let ele = document.getElementsByClassName('el-space__item');
            ele[0].style.position = 'sticky'
            ele[0].style.top = 0
            ele[0].style.overflow = 'hidden'
            ele[0].style.backgroundColor = 'white'
            ele[0].style.zIndex = '999'
            title.value = router.currentRoute.value.query.title
            // 请求组件分析数据
            questionnaire_component_analysis(props.id).then(res => {
                let retDataList = res.data.data;
                if (retDataList == null || retDataList.length === 0) {
                    showTip.value = true;
                    return
                }
                retDataList.forEach(r => {
                    dataList.value.push({
                        id: r.id,
                        cname: r.cname,
                        name: r.title,
                        map: r.map,
                        options: Object.keys(r.map),
                        countArr: Array,
                    })
                });
            })
        })
        return {
            showTip, dataList, title, mapCnameCharts, navTo,
        }
    },
})

</script>

<style scoped>

</style>