<template>
    <teleport to="body">
        <el-dialog style="width: fit-content;min-width: 200px;border-radius: 8px" :model-value="show.data"
                   @close="()=>{show.data = false;}" :title=title>
            <template #default>
                    <slot/>
            </template>
            <template #footer>
                <slot name="footer"/>
            </template>
        </el-dialog>
    </teleport>
</template>

<script setup>
defineProps(['show', 'title']);
defineEmits(['close'])


</script>

<style scoped>

:deep(.el-dialog) {
    border-radius: 16px;
    width: fit-content;
}

</style>