import axios from "axios";

export function submission_commitList() {
    return axios.get("/submission/list");
}

export function submission_delete(id) {
    return axios.post("/submission/delete",{id: id})
}