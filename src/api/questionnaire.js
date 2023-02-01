
import axios from "axios";
import {ElMessage} from "element-plus";
export function questionnaire_create(jsonList) {
    return axios.post("http://localhost/questionnaire/create",jsonList)
}

export function questionnaire_getById(id) {
    return axios.get("http://localhost/questionnaire/" + id);
}

export function questionnaire_list() {
    return axios.get("http://localhost/questionnaire/list");
}

export function questionnaire_share(id) {
    return axios.get("http://localhost/questionnaire/share?id=" + id);
}

export function questionnaire_detail(id) {
    return axios.get("http://localhost/questionnaire/detail?id=" + id);
}

export function questionnaire_submit(questionnaire) {
    let components = questionnaire.components;
    for (const c of components) {
        if (c.optional == false && (c.input == null || c.input.length == 0)) {
            ElMessage.info("没填完呢您")
            console.log("没填完：",c)
            return ;
        }
    }
    return axios.post("http://localhost/questionnaire/submit", questionnaire);
}