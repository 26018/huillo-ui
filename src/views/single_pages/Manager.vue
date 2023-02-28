<template>
    <div style="display: flex;height: 100vh;padding: 8px;box-sizing: border-box">
        <div class="nav-bar">
            <div v-for="(nav,index) in navData" class="nav-item" :id="'Manager:'+index" @click="ManagerNav(nav,index)">
                <img :src="nav.icon">
                <div style="margin-left: 12px">{{ nav.text }}</div>
            </div>
        </div>
        <div style="padding: 4px"></div>
        <div style="padding: 0px;box-sizing: border-box;width: calc(100% - 200px);">
            <router-view class="manager-view" name="manager_view"/>
        </div>

    </div>
</template>

<script setup>
import useManagerNav from "../../hooks/useManagerNav";
import {onMounted} from "vue";

let navData = useManagerNav()
function ManagerNav(data, index) {
    data.action(data.args);
    let element = document.getElementById('Manager:' + index);
    element.style.color = '#409EFF'
    recordCurrentNav(index)

    let length = navData.length;
    for (let i = 0; i < length; i++) {
        if (i !== index) {
            let ele = document.getElementById('Manager:' + i);
            ele.style.color = 'black'
        }
    }
}

function recordCurrentNav(navId) {
    localStorage.setItem('currentNav', navId);
}

onMounted(() => {
    let currentNavId = localStorage.getItem('currentNav');
    if (currentNavId == 0) {
        currentNavId = 1;
    }
    let element = document.getElementById('Manager:' + currentNavId);
    element.style.color = '#409EFF'
})


</script>

<style scoped>
.nav-bar {
    width: 200px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 0 0px 0 rgba(0, 0, 0, .4);
}

.nav-item {
    height: 30px;
    width: 120px;
    margin: 8px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-family: siyuan,serif;
}

.nav-item:hover {
    background-color: rgb(245,249,255);
    border-radius: 4px;
}

.manager-view {
    height: 100%;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 8px;
    background-color: white;
    overflow: auto
}

.account-management {
    margin-top: auto;
    color: black;
    background-color: gainsboro;
    border-radius: 4px;
}

img {
    width: 20px;
    aspect-ratio: 1/1;
}

</style>