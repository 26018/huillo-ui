import axios from "axios";

export function group_create(data) {
    return axios.post("/group/create", data);
}

export function group_add_member(id) {
    return axios.post("/group/"+id+"/add");
}

export function group_list() {
    return axios.get("/group/list");
}

export function group_notifyNotSubmitMember(userIdList) {
    return axios.post("/questionnaire/notifyNotSubmitMember", userIdList);
}

export function group_share(id){
    return axios.post("/group/share", {id});
}