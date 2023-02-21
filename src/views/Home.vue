<script setup>
import {useRouter} from "vue-router"
const router =useRouter();
const goto = ()=>{
  router.push("/list")
}

</script>

<template>
  <h1>Hello World</h1>
    <button type="button" @click="goto">进入待办事项</button>
</template>

<style scoped>

</style>
