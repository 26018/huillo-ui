<template>
    <div class="header" :style="{height: height}">
        <div class="icon" @click="$emit('iconActive')">Huillo</div>
        <pc-view>
            <Transition>
                <div id="poem" @click="searchPoem" v-show="showPoem" class="poem">
                    "{{ currentPoem }}"
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
    "雨过之后更难忘记", "剑出鞘，恩怨了", "爱恨如写意山水画", "街灯下的橱窗，有一种落寞的悲伤", "没有圆周的钟，失去旋转意义",
    "你要我在最爱的时候死去", "依旧留着你的笑容"
];

let colorBox = ["#355c7d", "#6c5b7b", "#c06c84", "#f67280", "#19448e", "#9ba88d", "#ee7800", "#745399", "#028760",
    "#f73859", "#ff7e67", "#769fcd", "#c5c56a", "#4c6cb3", "#69b076", "#5654a2", "#47885e", "#241a08", "#7209d4", "#2832d4", "#00a5b2"];

let currentPoem = ref("");
let currentColor = ref("");
let showPoem = ref(true);
let duration = 5000;
let poemBackgroundImage = ref("linear-gradient(90deg, #7209d4, #2832d4 33%, #00a5b2)")

onMounted(() => {

    let currentIndex = localStorage.getItem('poemIndex');
    let maxLength = Math.max(poems.length, colorBox.length);
    currentIndex = !(currentIndex == null || isNaN(currentIndex)) ? currentIndex : 0;

    currentPoem.value = poems[currentIndex];
    currentColor.value = colorBox[currentIndex];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % maxLength;
        localStorage.setItem('poemIndex', currentIndex);
        poemBackgroundImage.value = "linear-gradient(90deg, " + colorBox[currentIndex] + ", " + colorBox[(currentIndex + 1) % poems.length] + " 33%, " + colorBox[(currentIndex + 2) % poems.length] + ")";
        currentPoem.value = poems[currentIndex % poems.length];
        currentColor.value = colorBox[currentIndex % colorBox.length];
    }, duration);
})

watch(currentPoem, (value, oldValue, onCleanup) => {
    showPoem.value = true;
    setTimeout(() => {
        showPoem.value = false;
    }, duration - 500)
});

function searchPoem() {
    window.open('https://cn.bing.com/search?q=' + currentPoem.value);
}


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
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-family: siyuan, serif;
}

.nav:hover {
    text-decoration: underline;
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
    font-family: deyihei, serif;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /*background-image: v-bind(linear-gradient(90deg, #7209d4, #2832d4 33%, #00a5b2));*/
    /*background-image: linear-gradient(90deg, #7209d4, #2832d4 33%, #00a5b2);*/
    background-image: v-bind('poemBackgroundImage');
}


</style>