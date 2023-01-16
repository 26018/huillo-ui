import {reactive} from "vue";
import {navTo} from "./util";

export default function () {
    let navData = reactive([{
        text: '返回创建',
        fontColor: 'dodgerblue',
        args: '/create',
        action: navTo
    }, {
        text: '收集记录',
        fontColor: 'green',
        args: '/manager/collections',
        action: navTo
    }, {
        text: '提交记录',
        fontColor: 'green',
        args: '/manager/submission',
        action: navTo
    }, {
        text: '我的小组',
        fontColor: 'green',
        args: '/manager/groups',
        action: navTo
    }, {
        text: '回收空间',
        fontColor: 'green',
        args: '/manager/recycle',
        action: navTo
    }, {
        text: '账号管理',
        fontColor: 'green',
        args: '/manager/user-settings',
        action: navTo
    }
    ]);
    return navData;
};