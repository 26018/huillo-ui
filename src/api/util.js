import router from "../router";

export function navTo(path) {

    if ('number' === typeof path) {
        router.go(path);
        return;
    }

    if (router.currentRoute.value.fullPath === path) {
        return;
    }
    router.push(path).then(r => {

    });
}

export function addOption(options) {
    if (options == null) {
        options = [];
    }
    let length = options.length + 1;
    options.push('新选项' + length);
    return options;
}

// 删除选项，同步删除已选择中的选项
// 1.选项列表  2.已选择的列表  3.点击的值
export function removeOption(options, selects, optionValue) {
    if (options == null) {
        options = [];
    }
    for (let i = 0; i < options.length; i++) {
        if (options[i] === optionValue) {
            options.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < selects.length; i++) {
        if (selects[i] === optionValue) {
            selects.splice(i, 1);
            break;
        }
    }
}

export function removeItem(data) {
    // let store = useStore();
    // store.commit("questionnaire/REMOVE_ITEM", data);
    // console.log("remove:", data);
}

export function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
    let date = new Date(time);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });
    let newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
}

export function simpleFormatDate(time, format = 'YY/MM/DD') {
    let date = new Date(time);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate();
    let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });
    let newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
    return newTime;
}


export function ViewOpen(ctrl) {
    ctrl.data = true;
}

export function ViewClose(ctrl) {
    ctrl.data = false;
}


export function download(res, type, filename) {
    // 创建blob对象，解析流数据
    const blob = new Blob([res], {
        // 设置返回的文件类型
    })
    // 这里就是创建一个a标签，等下用来模拟点击事件
    const a = document.createElement('a')
    // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
    const URL = window.URL || window.webkitURL
    // 根据解析后的blob对象创建URL 对象
    const herf = URL.createObjectURL(blob)
    // 下载链接
    a.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    a.download = filename
    document.body.appendChild(a)
    // 点击a标签，进行下载
    a.click()
    // 收尾工作，在内存中移除URL 对象
    document.body.removeChild(a)
    window.URL.revokeObjectURL(herf)
}


// 添加json和文件到formdata
export function addJsonAndFile(json, jsonName, fileList, fileListName) {
    let formData = new FormData();
    fileList.forEach(file => {
        formData.append(fileListName, file.raw);
    })
    let string = JSON.stringify(json);
    let blob = new Blob([string], {type: "application/json"});
    formData.append(jsonName, blob)
    return formData;
}


export function refreshComponentIndex(components) {
    if (components == null) {
        return
    }
    let len = components.length;
    for (let i = 1; i <= len; i++) {
        components[i - 1].sequence = i;
    }
}