import axios from "axios";

export function userFile_upload(params) {
    if (params.userFileList == null || params.userFileList.length == 0) {
        return;
    }
    let formData = new FormData();
    let fileList = params.userFileList;
    fileList.forEach((file) => {
        formData.append("userFile", file.raw);
    });
    return axios.post("/userfile/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

// 根据文件MD5下载
export function userFile_download(fileMetaList) {
    return axios.post("/userfile/download",fileMetaList,{
        responseType: 'arraybuffer'
    });
}

export function userFile_space(){
    return axios.get('/userfile/space');
}


