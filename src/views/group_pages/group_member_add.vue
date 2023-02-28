<template>
    <div>
        <div v-show="!status">正在加入群组....</div>
        <div v-show="status">3秒后返回</div>
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
        }
        status.value = true;
        setTimeout(() => {
            navTo(-1);
        }, 3000);
    }).catch(() => {
        status.value = true;
    });
})

</script>

<style scoped>

</style>