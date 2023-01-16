import {reactive, ref, watch} from "vue";
import {navTo} from "./util";

export default function () {

    let search = ref("");
    let tableData = reactive({
        data: [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: '已结束',
            }
        ]
    })
    for (let i = 1; i < 10; i++) {
        let data = tableData.data[0];
        let copyData = JSON.parse(JSON.stringify(data));
        copyData.name = data.name + ":" + i;
        copyData.address = i % 2 == 0 ? "已结束" : "进行中";
        copyData.date = data.date + ":" + i;
        tableData.data.push(copyData);
    }
    let keepAliveValue = tableData.data;
// 检测搜索值变化
    watch(search, (value, oldValue, onCleanup) => {
        tableData.data = keepAliveValue;
        if (value === '') {
            return;
        }
        let newTable = [];
        tableData.data.forEach(v => {
            let s = JSON.stringify(v);
            if (s.includes(value)) {
                newTable.push(v);
            }
        })
        tableData.data = newTable;
    });

    const showDetail = (row, column, event) => {
        // TODO 拿到data的id
        if (column.label === '' || column.label == undefined) {
            return;
        }
        navTo('collections/detail/1')
    }
    return {
        search,tableData, showDetail,
    }

};