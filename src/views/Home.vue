<script setup>
// import {useRouter} from "vue-router"
import router from '../././router/index.js'
// const router =useRouter();
const goto = ()=>{
  router.push("/list")
}

</script>

<template>
  <h1>Hello World</h1>
  <a-button @click="goto">进入待办事项</a-button>
</template>

<style scoped>

</style>
