<template>
    <div>
        <div class="submit-success">
            <div style="padding-top: 100px;">
                <div>您已成功提交问卷</div>
                <div>非常感谢您参与此次调查</div>
                <el-button type="primary" style="margin-top: 16px" link @click="navTo('/survey')">点击返回</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>

import {navTo} from "../../api/util";
</script>

<style scoped>
.submit-success {
    max-width: 600px;
    margin: 0 auto;
    height: 100vh;
}
</style>