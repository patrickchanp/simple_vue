<template>
<!--  <to-do-list-page/>-->
  <todo-list/>
</template>

<script>
import ToDoListPage from "../components/ToDoListPage.vue";
import TodoList from "../components/todoList.vue";
export default {
  name: "Todo",
  components: {TodoList, ToDoListPage}
}
</script>

<style scoped>

</style>
