import axios from "axios";

export function submission_commitList() {
    return axios.get("http://localhost/submission/commitList");
}