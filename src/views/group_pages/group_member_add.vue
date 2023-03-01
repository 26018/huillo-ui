<template>
    <div>
        <div style="max-width: 400px;margin: 0 auto">
            <div v-if="status">
                <div style="font-size: 32px;margin-top: 32px;font-weight: 600">您已成功加入群组</div>
                <div><img style="margin-top: 16px" src="/src/assets/success.png"></div>
            </div>
            <div v-else style="font-size: 32px;margin-top: 32px;font-weight: 600;color: red">加入群组失败</div>
            <el-button style="margin-top: 32px" type="primary" @click="navTo('/management/groups')">点击返回</el-button>
        </div>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {group_add_member} from "../../api/group";
import {ElMessage} from "element-plus";
import {navTo} from "../../api/util";
import router from "../../router";

let status = ref(false);

onMounted(() => {
    let groupId = router.currentRoute.value.params.id;
    group_add_member(groupId).then(res => {
        if (res.data.code === 200) {
            ElMessage.success("成功加入群组");
            status.value = true;
        }else{
            status.value = false;
        }
    }).catch(() => {
        status.value = true;
    });
})

</script>

<style scoped>

</style>