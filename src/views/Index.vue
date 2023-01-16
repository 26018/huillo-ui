<template>
    <Header :nav="navData" @iconActive="$router.push('/about')" height="50px"/>
    <router-view class="content-view" name="content_view"/>
</template>

<script setup>
import Header from "../components/other/cmp/Header.vue";
import useIndexNav from "../hooks/useIndexNav";

let navData = useIndexNav();

</script>

<style scoped>
.content-view{

}
</style>