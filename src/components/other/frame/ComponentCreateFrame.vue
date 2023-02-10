<template>
    <div class="component-frame">
        <div class="header">
            <div style="display: flex;flex: 1;align-items: baseline">
                <div :class="isHeadCmp?'head':'tt'" v-show="model">
                    <component-input v-model="model.title"/>
                </div>
            </div>
            <div v-show="model && !isHeadCmp" class="operation-frame">
                <div>
                    <slot name="extend"></slot>
                </div>
                <el-checkbox v-model="model.optional">选填</el-checkbox>
                <el-icon class="move">
                    <Sort/>
                </el-icon>
                <el-icon @click="$emit('removeItem',model);" style="cursor: pointer">
                    <CircleClose/>
                </el-icon>
            </div>
        </div>
        <div class="frame-desc" v-show="model">
            <component-input :type="isHeadCmp ? 'textarea':'text'" :style="{marginTop:isHeadCmp?'8px':'0px'}"
                             v-model="model.description"/>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

import {computed} from "vue";
import {removeItem} from "../../../api/util";
import ComponentInput from "../cmp/ComponentInput.vue";

let props = defineProps(['model']);
// 是否是头部组件
let isHeadCmp = computed(() => {
    return props.model.cname === 'jh-head';
})

</script>

<style scoped>

.component-frame {
    border-bottom: 2px dashed rgba(220 220 220);
    box-sizing: border-box;
    margin: 0 12px;
    padding: 12px;
}

.operation-frame {
    margin-left: auto;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: end;
}

.operation-frame > * {
    margin-left: 20px;
    color: gray;
}

.frame-desc {
}

.operation-frame > *:hover {
    color: black;
}

.frame-desc >>> * {
    color: rgba(96, 98, 102);
}

.move {
    cursor: pointer;
}

.header {
    display: flex;
}

.head {
    width: 100%;
    color: rgba(96, 98, 102);
}


.head >>> * {
    font-size: 30px;
}

.tt {
    width: 100%;
    color: rgba(96, 98, 102);
}

.tt >>> * {
    font-size: 20px;
}

:deep(.el-textarea__inner)::-webkit-scrollbar {
    width: 0;
}


</style>