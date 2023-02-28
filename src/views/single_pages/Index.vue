<template>
    <Header :nav="navData" @iconActive="$router.push('/about')" :height="'45px'"/>
    <router-view name="content_view"/>
</template>

<script setup>
import Header from "../../components/other/cmp/Header.vue";
import useIndexNav from "../../hooks/useIndexNav";

let navData = useIndexNav();

</script>

<style scoped>

</style>