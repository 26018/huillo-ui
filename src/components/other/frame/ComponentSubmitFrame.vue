<template>
    <div class="component-frame">
        <div class="header">
            <div style="display: flex;align-items: baseline">
                <div style="font-size: 20px" v-if="data && !isHeadCmp">{{ data.sequence + '.&nbsp' }}</div>
                <read-only-text :data="data.title" :size="isHeadCmp?'30px':'20px'"></read-only-text>
            </div>
            <div style="color: red" v-if="data.sequence && !data.optional">*</div>
        </div>
        <div class="frame-desc">
            <read-only-text :data="data.description"></read-only-text>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

import {computed} from "vue";
import ReadOnlyText from "../cmp/ReadOnlyText.vue";

let props = defineProps(['data']);
let isHeadCmp = computed(() => {
    return props.data.cname === 'jh-head';
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
    justify-content: end
}

.frame-desc >>> * {
    color: rgba(96, 98, 102);
}

.header {
    display: flex;
}

.head {
    font-size: 30px;
    width: 100%;
    color: rgba(96, 98, 102);
}

.head >>> * {
    font-size: 20px;
}


.tt {
    width: 100%;
    color: rgba(96, 98, 102);
}

.tt >>> * {
    font-size: 20px;
}

</style>