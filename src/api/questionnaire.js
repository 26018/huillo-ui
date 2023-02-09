import axios from "axios";
import {ElMessage} from "element-plus";

export function questionnaire_create(jsonList) {
    return axios.post("/survey/create", jsonList)
}

export function questionnaire_getById(id) {
    return axios.get("/survey/" + id);
}

export function questionnaire_list() {
    return axios.get("/survey/list");
}

export function questionnaire_share(id) {
    return axios.get("/survey/share?id=" + id);
}

export function questionnaire_detail(id) {
    return axios.get("/survey/statistics/submission?id=" + id);
}

export function questionnaire_component_analysis(surveyId){
    return axios.get('/survey/statistics/component?id=' + surveyId);
}

export function questionnaire_submit(questionnaire) {
    return axios.post("/survey/submit", questionnaire);
}