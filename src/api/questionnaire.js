
import axios from "axios";
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

export function questionnaire_submit(jsonArray) {
    return axios.post("http://localhost/questionnainre/submit", jsonArray);
}