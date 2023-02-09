<template>
    <div class="header" :style="{height: height}">
        <div class="icon" @click="$emit('iconActive')">Huillo</div>
        <pc-view>
            <Transition>
                <div id="poem" v-show="showPoem" class="poem" :style="{color:currentColor}">
                    {{ currentPoem }}
                </div>
            </Transition>
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
import {onMounted, ref, watch} from "vue";

defineProps(['nav', 'height'])

let poems = [
    "你撑把小纸伞，叹姻缘太婉转", "下雨这天好安静", "等爱在升温后渐渐死去", "海鸟跟鱼相爱，只是一场意外",
    "我仍守着孤城", "雨纷纷，旧故里草木深", "我只能不停的飞，直到我将你挽回", "转身离开，分手说不出来",
    "做那个人的战士，和他一起去经历", "你是友情，还是错过的爱情？", "情字何解，怎落笔都不对", "我的世界，你不在里面",
    "雨过之后更难忘记", "剑出鞘，恩怨了", "爱恨如写意山水画", "街灯下的橱窗，有一种落寞的悲伤"
];
let colorBox = ["#355c7d", "#6c5b7b", "#c06c84", "#f67280", "#f73859", "#ff7e67", "#769fcd"];
let currentPoem = ref("");
let currentColor = ref("");
let showPoem = ref(true);
let duration = 5000;

onMounted(() => {
    let currentIndex = localStorage.getItem('poemIndex');
    currentIndex = currentIndex == null ? 0 : currentIndex;
    currentPoem.value = poems[currentIndex];
    currentColor.value = colorBox[currentIndex];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % poems.length;
        localStorage.setItem('poemIndex', currentIndex);

        currentColor.value = colorBox[currentIndex % colorBox.length];
        currentPoem.value = poems[currentIndex];
    }, duration);
})

watch(currentPoem, (value, oldValue, onCleanup) => {
    showPoem.value = true;
    setTimeout(() => {
        showPoem.value = false;
    }, duration - 500)
});

</script>

<style scoped>

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}


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