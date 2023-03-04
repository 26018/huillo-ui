<template>
    <component-submit-frame :data="data">
        <el-checkbox-group style="width: 100%;" v-model="data.input">
            <el-checkbox style="width: 100%;" v-for="(option,index) in data.options" :key="index"
                         :label="option">
                <text-read :text="data.options[index]"></text-read>
            </el-checkbox>
        </el-checkbox-group>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {onBeforeMount} from "vue";
import TextRead from "../other/cmp/TextRead.vue";

let props = defineProps(['data']);

onBeforeMount(() => {
    if ('string' === typeof props.data.options) {
        props.data.options = JSON.parse(props.data.options);
    }
    if (props.data.input === null) {
        props.data.input = []
    }
    if ('string' === typeof props.data.input) {
        props.data.input = JSON.parse(props.data.input);
    }
    // if (router.currentRoute.value.path.includes("management/submissions")) {
    //     props.data.options = props.data.input;
    // }
})
</script>

<style scoped>

</style>