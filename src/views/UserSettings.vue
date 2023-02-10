<template>
    <div style="padding: 16px;box-sizing: border-box;">
        <div class="title">账号状态</div>
        <div class="content">
            <el-button type="success">正常</el-button>
            <el-button style="margin-left: 8px" type="danger">退出</el-button>
        </div>
        <div class="title">修改密码</div>
        <div class="content flex">
            <el-input placeholder="新密码"></el-input>
            <el-button type="primary" style="margin-left: 8px">提交</el-button>
        </div>

    </div>
</template>

<script>
export default {
    name: "UserSettings"
}
</script>

<style scoped>
.title {
    font-size: 20px;
    font-family: siyuan, serif;
}

.content {
    margin-top: 8px;
    margin-bottom: 16px;
    max-width: 300px;
}

.flex {
    display: flex;
}

</style>