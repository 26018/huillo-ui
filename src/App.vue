<template>
    <router-view class="home" name="home_view"/>
</template>

<script>

export default {
    name: 'App',
}
</script>
<style>
.home {
    background-color: rgba(243, 246, 249);
    width: 100%;
}

.fade-enter-active {
    transition: all 0.3s ease-out;
}

.fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}


</style>
