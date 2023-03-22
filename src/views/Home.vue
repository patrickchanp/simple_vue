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
  <a-button @click="goto">go TodoList</a-button>
</template>

<style scoped>

</style>
