import axios from "axios";

export function group_create(data) {
    return axios.post("/group/create", data);
}

export function group_add_member(groupId) {
    return axios.post("/group/"+groupId+"/add");
}

export function group_list() {
    return axios.get("/group/list");
}

export function group_notifyNotSubmitMember(notifyNotSubmitDTO) {
    return axios.post("/survey/notifyNotSubmitMember", notifyNotSubmitDTO);
}

export function group_share(id){
    return axios.post("/group/share", {id});
}