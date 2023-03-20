<script setup>
import router from '../././router/index.js'
import ScheduleTodo from "../components/scheduleTodo.vue";
const goto = ()=>{
  router.push("/list")
}

</script>

<template>
  <h1>Hello World</h1>
  <schedule-todo/>
  <a-button @click="goto">进入待办事项</a-button>
</template>

<style scoped>

</style>
