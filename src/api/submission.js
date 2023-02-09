import axios from "axios";

export function submission_commitList() {
    return axios.get("/submission/list");
}