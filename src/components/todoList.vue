<template>
        <a-list>
          <a-list-item v-for="(todo,index) in rawItems" :key="todo.id" :class="{'top':todo.isTop===true , 'high':todo.priority===Priority.HIGH,'medium':todo.priority===Priority.MEDIUM,'low':todo.priority===Priority.LOW }">
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
              <VerticalAlignTopOutlined v-if="todo.isEdit===false && todo.completed ===false && todo.isTop!==true" @click="store.handleTopItem(index)"/>
              <VerticalAlignBottomOutlined v-if="todo.isEdit===false && todo.completed ===false && todo.isTop===true" @click="store.handleCancelTopItem(index)"/>
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
import {DeleteFilled,EditFilled,CheckOutlined,VerticalAlignTopOutlined,VerticalAlignBottomOutlined} from "@ant-design/icons-vue";
import dayjs, {Dayjs} from "dayjs";
import {storeToRefs} from "pinia";
import TodoForm from "./todoForm.vue";
import EditTodo from "./editTodo.vue";
import TodoItem from "./todoItem.vue";
import {Priority} from "../model/TodoItem";

export default defineComponent({
  components: {TodoItem, EditTodo, TodoForm, DeleteFilled,EditFilled,CheckOutlined,VerticalAlignTopOutlined,VerticalAlignBottomOutlined },

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
      Priority,
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
.top {
  background: #F05E1C;
  color: #fff;
  border-radius: 10px;
}
//.high {
//  background: red;
//  color: #fff;
//  border-radius: 10px;
//}
//.medium {
//  background: lightgoldenrodyellow;
//  color: #fff;
//  border-radius: 10px;
//}
//.low {
//  background: yellowgreen;
//  color: #fff;
//  border-radius: 10px;
//}

</style>
