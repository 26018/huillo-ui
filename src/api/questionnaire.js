
import axios from "axios";

export function questionnaire_create(json) {
    return axios.post("http://localhost/questionnaire/create",json)
}

export function questionnaire_list() {
    return axios.get("http://localhost/questionnaire/list");
}

export function questionnaire_share(id) {
    return axios.get("http://localhost/questionnaire/share?id=" + id);
}