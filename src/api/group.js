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