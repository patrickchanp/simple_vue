<template>
  <div class="edit-todo-item">
    <a-input class="edit-input" v-model:value="todo.item" placeholder="edit todo" :bordered="true" size="small" @keyup.enter="store.saveEdit(index)"/>
    <a-divider type="vertical"/>
    <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline"/>
    <a-divider type="vertical"/>
    <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule"/>
  </div>
</template>

<script lang="ts">
import {TodoItem} from "../model/TodoItem";
import dayjs, {Dayjs} from "dayjs";
import {useTodoListStore} from "../store/modules/todoList";

export default {
  name: "editTodo",
  props:{
    todo:{
      type: Object as () => TodoItem,
      required:true
    },
    index :{
      type:Number,
      required: true,
    }
  },
  setup(){
    const store = useTodoListStore();
    const disabledDate = (current: Dayjs) => {
      return current < dayjs().subtract(1, 'day');
    };
    return {store,disabledDate}
  }
}
</script>

<style scoped>
.edit-todo-item{
  display: inline-flex;
}
</style>
