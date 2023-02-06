<template>
    <div class="header" :style="{height: height}">
        <div class="icon" @click="$emit('iconActive')">Huillo</div>
        <pc-view>
            <div class="poem">铁树银花合，星桥铁锁开</div>
        </pc-view>
        <div class="navBar">
            <div class="nav" @click="data.action(data.args)" :style="{color:data.fontColor}" v-for="data in nav">
                {{ data.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import PcView from "./PcView.vue";

defineProps(['nav', 'height'])
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    box-shadow: 0 0 4px 0px rgba(0, 0, 0, .4);
    -webkit-tap-highlight-color: transparent;
    background-color: white;
    z-index: 999;
    position: sticky;
    white-space: nowrap;
    top: 0;
    font-size: 14px;
}

.navBar {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-left: auto;
}

.nav {
    margin: 0 24px 0 0;
    height: 100%;
    display: flex;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    align-items: center;
    user-select: none;
    cursor: pointer;
}

.icon {
    margin-left: 16px;
    font-family: "华文行楷", serif;
    font-size: 24px;
    user-select: none;
    cursor: pointer;
}

.poem {
    margin-left: 16px;
    user-select: none;
    cursor: pointer;
}


</style>