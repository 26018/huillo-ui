import {createStore} from 'vuex'
import initComponents from '../data/InitComponent.json'

const questionnaire = {
    namespaced: true,
    state: {
        questionnaire: localStorage.getItem('questionnaire') == null ? initComponents : JSON.parse(localStorage.getItem('questionnaire')),
    },
    mutations: {
        ADD_COMPONENT(st, value) {
            // 为每一个项添加index下标
            value.sequence = st.questionnaire.length;
            st.questionnaire.components.push(value);
            localStorage.setItem('questionnaire', JSON.stringify(st.questionnaire));
        },
        CLEAR(st) {
            st.questionnaire.components.splice(1, st.questionnaire.length);
            localStorage.setItem('questionnaire', JSON.stringify(st.questionnaire));
        },
        CLEAR_ALL(st) {
            st.questionnaire = null;
            localStorage.removeItem('questionnaire');
        },
        REMOVE_ITEM(st, item) {
            let arr = st.questionnaire;
            let targetIndex = -1;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    targetIndex = i;
                    break;
                }
            }
            st.questionnaire.components.splice(targetIndex, 1);
            localStorage.setItem('questionnaire', JSON.stringify(st.questionnaire));
        },
    },
}

export default createStore({
    modules: {
        questionnaire
    }
})