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
    "你要我在最爱的时候死去", "依旧留着你的笑容", "想念还在等待救援", "雨下整夜", "几句是非，也无法将我的热情冷却", "你是我唯一想要的了解",
    "不懂你的黑色幽默", "远行没有目的，距离不是问题", "不爱了，是你的秘密", "我占据格林威治，守候着你", "'对不起'，这句话打乱了时区",
    "我越想越清醒", "就让我静静一个人出发", "你的心总有个经纬度会留下", "距今已三千七百多年", "我却在旁静静欣赏你那张我深爱的脸", "美索不达米亚平原",
    "用楔形文字刻下了永远", "经过苏美女神身边，我以女神之名许愿", "一切又重演", "我沉默，你的话也不多", "只要我们感觉对", "思念变成海", "你好久都没再来",
    "那时候，我不懂，这叫爱", "琥珀色黄昏像唐，在很美的远方", "园游会永不打烊", "紧紧看守这份爱", "到得听能你有只", "你微笑浏览", "都这个时候，你还在意着",
    "怕打扰想自由的我"
];

let colorBox = ["#355c7d", "#6c5b7b", "#c06c84", "#f67280", "#19448e", "#9ba88d", "#ee7800", "#745399", "#028760",
    "#f73859", "#ff7e67", "#769fcd", "#c5c56a", "#4c6cb3", "#69b076", "#5654a2", "#47885e", "#241a08",
    "#7209d4", "#2832d4", "#00a5b2", "#c5c56a", "#355c7d"];

let currentPoem = ref("");
let currentColor = ref("");
let showPoem = ref(true);
let duration = 5000;
let poemBackgroundImage = ref("linear-gradient(90deg, #7209d4, #2832d4 33%, #00a5b2)")

onMounted(() => {

    let item = localStorage.getItem("currentInterval");
    clearInterval(item);

    let currentIndex = localStorage.getItem('poemIndex');
    let maxLength = Math.max(poems.length, colorBox.length);

    currentIndex = (currentIndex == null || isNaN(currentIndex)) ? 0 : currentIndex;
    poemBackgroundImage.value = "linear-gradient(90deg, " + colorBox[randomInt(colorBox.length)] + ", " + colorBox[randomInt(colorBox.length)] + " 33%, " + colorBox[randomInt(colorBox.length)] + ")";

    currentPoem.value = poems[currentIndex];
    currentColor.value = colorBox[currentIndex];

    let currentInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % maxLength;
        localStorage.setItem('poemIndex', currentIndex);
        poemBackgroundImage.value = "linear-gradient(90deg, " + colorBox[randomInt(colorBox.length)] + ", " + colorBox[randomInt(colorBox.length)] + " 33%, " + colorBox[randomInt(colorBox.length)] + ")";

        currentPoem.value = poems[currentIndex % poems.length];
    }, duration);
    localStorage.setItem("currentInterval", currentInterval);
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

function randomInt(biggest) {
    let number = Math.random();
    number = Math.floor(number * biggest);
    return number;
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
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .4);
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
    font-family: "huawen", serif;
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
    background-image: v-bind('poemBackgroundImage');
}


</style>