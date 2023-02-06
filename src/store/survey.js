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
    getters: {},
    actions: {}
})