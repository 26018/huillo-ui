
import axios from "axios";

export function create(json) {
    axios.post("http://localhost/questionnaire/create",json).then(r => {
        console.log(r.data)
    })
}