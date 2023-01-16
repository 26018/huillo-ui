<template>
    <el-scrollbar>
            <div style="display: flex;align-items: center;">
                <el-icon style="cursor: pointer;" :size="24" @click="navTo(-1)">
                    <ArrowLeft/>
                </el-icon>
                <div style="font-size: 24px;margin-left: 8px">在线文件收集</div>
                <div style="margin-left: auto;background-color: white;padding: 8px;border-radius: 8px;">
                    <el-button type="">
                        <el-icon>
                            <Share/>
                        </el-icon>&nbsp;分享
                    </el-button>
                    <el-button type="warning">
                        <el-icon>
                            <Share/>
                        </el-icon>&nbsp;导出
                    </el-button>
                    <el-button type="primary">
                        <el-icon>
                            <Edit/>
                        </el-icon>&nbsp;编辑
                    </el-button>
                    <el-button type="danger">
                        <el-icon>
                            <Delete/>
                        </el-icon>&nbsp;删除
                    </el-button>
                    <el-button type="info">
                        <el-icon>
                            <CloseBold/>
                        </el-icon>&nbsp;结束
                    </el-button>
                </div>
            </div>
            <el-card style="margin-top: 8px">
                <div style="display: flex;align-items: center;justify-content: space-between">
                    <div>提交人数：{{ id }}</div>
                    <div>创建时间：2022/02/08</div>
                    <div>截止时间：2022/02/24</div>
                    <div>收集用时：8天5小时</div>
                </div>
            </el-card>
            <el-card style="margin-top: 8px">
                <div style="display: flex;align-items: center;justify-content: space-between">
                    <div>收集到 2 份文件</div>
                    <el-button type="primary">全部下载</el-button>
                </div>
            </el-card>
            <el-card style="margin-top: 8px">
                <el-table style="border:0px solid red;width: 100%" height="460" :data="tableData"  :highlight-current-row="true" :stripe="true">
                    <el-table-column prop="name" fixed label="提交人" width="180"/>
                    <el-table-column prop="name" label="提交次数" width="180"/>
                    <el-table-column prop="name" label="提交日期" width="180"/>
                    <el-table-column align="right">
                        <template #header>
                            <el-button @click="notifyNoSubmit" style="width: 170px" type="warning">通知未提交</el-button>
                        </template>
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="CommittedDetail(1)">查看</el-button>
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">回绝</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
    </el-scrollbar>
</template>

<script setup>
import {navTo} from "../hooks/util";

defineProps(['id'])
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]
for (let i = 0; i < 50; i++) {
    tableData.push(tableData[0]);
}
const CommittedDetail = (id) => {
    navTo('/manager/collections/committed/detail/' + id)
};

const handleEdit = (index, row) => {
    console.log(index, row)
}
const handleDelete = (index, row) => {
    console.log(index, row)
}

const notifyNoSubmit = () => {
    // 通知提醒未提交的人

};

</script>

<style scoped>

</style>