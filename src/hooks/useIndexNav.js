import {reactive} from "vue";
import {navTo} from "./util";

export default function () {

    let navData = reactive([{
        text: '注 册',
        fontColor:'dodgerblue',
        args:'/register',
        action: navTo
    },{
        text: '登 录',
        fontColor:'green',
        args: '/login',
        action: navTo
    }]);
    return navData;
};