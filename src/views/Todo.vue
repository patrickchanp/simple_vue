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

export default {
  name: "Todo",
  components: {todoList,todoForm,LeftOutlined},
  setup(){
    const  goBack = () => {
       router.push("/");
    }
    return {goBack}
  }
}
</script>

<style scoped>
button{

}
</style>
