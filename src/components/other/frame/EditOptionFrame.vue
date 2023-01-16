<template>
    <div class="edit-option-frame">
        <div style="width: 100%">
            <slot></slot>
        </div>
        <el-button link @click="$emit('removeItem')" style="margin-left: auto">
            <el-icon class="edit-option-deleteButton">
                <CloseBold/>
            </el-icon>
        </el-button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.edit-option-frame {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 4px 0;
    /*border: 1px solid red;*/
}

.edit-option-deleteButton{
    width: 32px;
    aspect-ratio: 1/1;
}

.edit-option-deleteButton:hover {
    color: red;

}

</style>