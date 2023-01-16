import {createStore} from 'vuex'
import initComponents from '../data/InitComponent.json'

const questionnaire = {
    namespaced: true,
    state: {
        template: localStorage.getItem('template') == null ? initComponents : JSON.parse(localStorage.getItem('template')),
    },
    mutations: {
        ADD_COMPONENT(st, value) {
            // 为每一个项添加index下标
            value.sequence = st.template.length;
            st.template.push(value);
            localStorage.setItem('template', JSON.stringify(st.template));
        },
        CLEAR(st) {
            st.template.splice(1, st.template.length);
            localStorage.setItem('template', JSON.stringify(st.template));
        },
        CLEAR_ALL(st) {
            st.template.splice(0, st.template.length);
            localStorage.removeItem('template');
        },
        REMOVE_ITEM(st, item) {
            let arr = st.template;
            let targetIndex = -1;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    targetIndex = i;
                    break;
                }
            }
            st.template.splice(targetIndex, 1);
            localStorage.setItem('template', JSON.stringify(st.template));
        },

        UPDATE_LIST(st, list) {
            list = JSON.parse(list);
            st.template = list;
            localStorage.setItem('template', JSON.stringify(st.template));
            console.log('vuex更新完成');
        },

    },
}

export default createStore({
    modules: {
        questionnaire
    }
})