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


