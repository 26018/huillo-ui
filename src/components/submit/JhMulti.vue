<template>
    <component-submit-frame :data="data">
        <el-checkbox-group style="width: 100%;" v-model="data.input">
            <el-checkbox style="width: 100%;" v-for="(option,index) in data.options" :key="index"
                         :label="option">
                <read-only-text :data="data.options[index]"/>
            </el-checkbox>
        </el-checkbox-group>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import ReadOnlyText from "../other/cmp/ReadOnlyText.vue";
import {onMounted, provide} from "vue";

let props = defineProps(['data']);
onMounted(() => {
    if ('string' === typeof props.data.options) {
        props.data.options = JSON.parse(props.data.options);
    }
    if ('string' === typeof props.data.input) {
        props.data.input = JSON.parse(props.data.input);
    }
})
</script>

<style scoped>

</style>