<template>
        <a-list>
          <a-list-item v-for="(todo,index) in rawItems" :key="todo.id">
            <a-space>
            <div v-if="todo.isEdit===false" :class="todo.completed===true?'done':''">
              <todo-item :index="index" :todo="todo"/>
            </div>
            <div v-else>
              <edit-todo :todo="todo" :index="index"/>
            </div>
            <div>
              <a-space>
              <EditFilled v-if="todo.isEdit===false && todo.completed ===false" @click="store.handleEdit(index)"/>
              <CheckOutlined v-else-if="todo.isEdit===true && todo.completed===false" @click="store.saveEdit(index)"/>
              <DeleteFilled @click="store.removeItem(index)"/>
              </a-space>
            </div>
            </a-space>
          </a-list-item>
        </a-list>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { useTodoListStore } from '../store/modules/todoList.ts'
import {DeleteFilled,EditFilled,CheckOutlined} from "@ant-design/icons-vue";
import dayjs, {Dayjs} from "dayjs";
import {storeToRefs} from "pinia";
import TodoForm from "./todoForm.vue";
import EditTodo from "./editTodo.vue";
import TodoItem from "./todoItem.vue";

export default defineComponent({
  components: {TodoItem, EditTodo, TodoForm, DeleteFilled,EditFilled,CheckOutlined },

  setup() {
    const store = useTodoListStore()
    const {rawItems,scheduledItems} =storeToRefs(store);
    const todoItem = ref('')
    const deadlineRef = ref<Dayjs>();
    const scheduleRef = ref<Dayjs>();

    const disabledDate = (current: Dayjs) => {
      return current < dayjs().subtract(1, 'day');
    };

    return {
      todoItem,
      rawItems: rawItems,
      scheduledItems: scheduledItems,
      store,
      disabledDate,
      deadlineRef,
      scheduleRef,
  }
  },
})
</script>

<style lang="scss">
.date-picker{
  width: 115px;
}
.todoItem{
  display: inline-flex;
}
.done {
  text-decoration: line-through;
  color: #ddd;
}

</style>
