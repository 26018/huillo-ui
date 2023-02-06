import {defineStore} from "pinia";

export const useUserFile = defineStore('userfile', {
    state: () => {
        return{
            downloadFileList: [],
            uploadFileList: [],
        }
    },

    persist: {
        enabled: true,
        storage: localStorage,
    }
})