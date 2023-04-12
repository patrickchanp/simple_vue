<template>
  <h1>Todo List</h1>
  <section class="todo-container">
  <todo-form/>
  <todo-list/>
  <a-button @click="goBack">
    <template #icon>
      <LeftOutlined/>
    </template>
    Back
  </a-button>
  </section>
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
.todo-container{
  /*display: flex;*/
  /*justify-content: center;*/
  /*width: 100vw;*/
  /*height: 100vh;*/
  box-sizing: border-box;
  /*padding-top: 100px;*/
  background: linear-gradient(rgba(93, 190, 129, .02), rgba(125, 185, 222, .02));
}
</style>
