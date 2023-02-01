import axios from "axios";

export function group_create(data) {
    return axios.post("http://localhost/group/create", data);
}

export function group_add_member(data) {
    return axios.post("http://localhost/group/add", data);
}

export function group_share(id) {
    return axios.get("http://localhost/group/share?id=" + id);
}

export function group_list() {
    return axios.get("http://localhost/group/list");
}

export function group_getNotSubmitMember(groupList) {
    let groupIdList = [];
    groupList.forEach(group=>{
        groupIdList.push(group.id);
    })
    return axios.post("http://localhost/questionnaire/notSubmitMember", {
        "selectedGroupList": groupIdList,
    });
}

export function group_notifyNotSubmitMember(userIdList) {
    return axios.post("http://localhost/questionnaire/notifyNotSubmitMember", userIdList);
}