import {defineStore} from "pinia";
import InitComponent from '../data/InitComponent.json'
export const useSurvey = defineStore("survey", {
    state() {
        return {
            ...InitComponent
        }
    },

    persist: {
        enabled: true, //开启存储
        storage:localStorage,
    },
    // 定义getters，类似于computed，具有缓存g功能
    getters: {},
    // 定义actions，类似于methods，用来修改state，做一些业务逻辑
    actions: {}
})