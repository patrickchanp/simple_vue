<template>
        <a-list>
          <a-list-item v-for="(todo,index) in rawItems" :key="todo.id">
            <div v-if="todo.isEdit===false" :class="todo.completed===true?'done':''">
              <a-checkbox v-model:checked="todo.completed" @change="handleItemIsCompleted(index)" />
              {{ todo.item }}
              <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline" class="date-picker"/>
              <a-divider type="vertical"/>
              <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule" @change="store.addScheduledItems(index)" class="date-picker"/>
            </div>
            <div v-else class="edit-todo-item">
              <a-input class="edit-input" v-model:value="todo.item" placeholder="edit todo" :bordered="true" size="small" @keyup.enter="store.saveEdit(index)"/>
              <a-divider type="vertical"/>
              <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline"/>
              <a-divider type="vertical"/>
              <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule"/>
            </div>
            <div>
              <a-divider v-if="todo.completed===false" type="vertical"/>
              <EditFilled v-if="todo.isEdit===false && todo.completed ===false" @click="store.handleEdit(index)"/>
              <CheckOutlined v-else-if="todo.isEdit===true && todo.completed===false" @click="store.saveEdit(index)"/>
              <a-divider type="vertical"/>
              <DeleteFilled @click="store.removeItem(index)"/>
            </div>
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

export default defineComponent({
  components: {TodoForm, DeleteFilled,EditFilled,CheckOutlined },

  setup() {
    const store = useTodoListStore()
    const {rawItems,scheduledItems} =storeToRefs(store);
    const todoItem = ref('')
    const deadlineRef = ref<Dayjs>();
    const scheduleRef = ref<Dayjs>();

    function handleItemIsCompleted(index:number) {
      if (this.rawItems[index].completed == true) {
        let indexOfScheduledItem = this.scheduledItems.indexOf(this.rawItems[index]);
        this.scheduledItems.splice(indexOfScheduledItem, 1);
      } else {
        this.scheduledItems.push(this.rawItems[index])
      }
    }
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
      handleItemIsCompleted:handleItemIsCompleted,
  }
  },
})
</script>

<style lang="scss">
.edit-todo-item{
  display: inline-flex;
}
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
