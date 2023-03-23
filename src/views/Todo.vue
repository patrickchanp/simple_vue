<template>
  <h1>Todo List</h1>
  <todo-form/>
  <todo-list/>
  <a-button @click="goBack">
    <template #icon>
      <LeftOutlined/>
    </template>
    Back
  </a-button>
</template>

<script>
import todoList from "../components/todoList.vue";
import todoForm from "../components/todoForm.vue";
import router from '../././router/index.js'
import {LeftOutlined} from "@ant-design/icons-vue";
import { useTodoListStore } from "../store/modules/todoList.ts";

export default {
  name: "Todo",
  components: {todoList,todoForm,LeftOutlined},
  setup(){
    const store = useTodoListStore();
    const  goBack = () => {
       router.push("/");
    }
    return {goBack,store}
  }
}
</script>

<style scoped>
button{

}
</style>
