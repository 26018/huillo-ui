import {reactive} from "vue";
import {navTo} from "../api/util";

export default function () {
    let navData = reactive([{
        text: '返回创建',
        fontColor: 'dodgerblue',
        args: '/create',
        icon: '/src/assets/return.png',
        action: navTo
    }, {
        text: '收集记录',
        fontColor: 'green',
        icon: '/src/assets/quesLog.png',
        args: '/manager/collections',
        action: navTo
    }, {
        text: '提交记录',
        icon: '/src/assets/commitLog.png',
        fontColor: 'green',
        args: '/manager/submission',
        action: navTo
    }, {
        text: '我的小组',
        fontColor: 'green',
        icon: '/src/assets/group.png',
        args: '/manager/groups',
        action: navTo
    }, {
        text: '文件空间',
        fontColor: 'green',
        icon: '/src/assets/recycle.png',
        args: '/manager/recycle',
        action: navTo
    }, {
        text: '账号管理',
        icon: '/src/assets/setting.png',
        fontColor: 'green',
        args: '/manager/user-settings',
        action: navTo
    }
    ]);
    return navData;
};