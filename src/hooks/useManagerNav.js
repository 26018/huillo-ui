import {reactive} from "vue";
import {navTo} from "../api/util";

export default function () {
    let navData = reactive([{
        text: '返回创建',
        fontColor: 'dodgerblue',
        args: '/survey',
        icon: '/return.png',
        action: navTo
    }, {
        text: '收集记录',
        fontColor: 'green',
        icon: '/quesLog.png',
        args: '/management/surveys',
        action: navTo
    }, {
        text: '提交记录',
        icon: '/commitLog.png',
        fontColor: 'green',
        args: '/management/submissions',
        action: navTo
    }, {
        text: '我的小组',
        fontColor: 'green',
        icon: '/group.png',
        args: '/management/groups',
        action: navTo
    }, {
        text: '文件空间',
        fontColor: 'green',
        icon: '/recycle.png',
        args: '/management/file-space',
        action: navTo
    }, {
        text: '账号管理',
        icon: '/setting.png',
        fontColor: 'green',
        args: '/management/setting',
        action: navTo
    }
    ]);
    return navData;
};