<template>
      <h1>Todo List</h1>
        <a-input type="text" v-model:value="todoItem" placeholder="Add new todo" @keyup.enter="addItemInLIst(todoItem)"/>
        <p v-show="store.showAlert" class="alert">Please finish todo</p>
        <p v-show="store.repeated" class="alert">todo is exist</p>
  <a-divider/>
        <a-button @click="addItemInLIst(todoItem)">Submit</a-button>
        <a-list>
          <a-list-item v-for="(todo,index) in rawItems" :key="todo.id">
            <div v-if="todo.isEdit===false" :class="todo.completed===true?'done':''">
              <a-checkbox v-model:checked="todo.completed" @change="handleStatusChange(index)" />
              {{ todo.item }}
              <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline" class="date-picker"/>
              <a-divider type="vertical"/>
              <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule" class="date-picker"/>
            </div>
            <div v-else class="edit-todo-item">
              <a-input class="edit-input" v-model:value="todo.item" placeholder="edit todo" :bordered="true" size="small"/>
              <p v-show="store.showAlert" class="alert">Please finish todo</p>
              <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline"/>
              <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule"/>
            </div>
            <div>
              <a-divider v-if="todo.status===false" type="vertical"/>
              <EditFilled v-if="todo.isEdit===false && todo.completed ===false" @click="store.handleEdit(index)"/>
              <CheckOutlined v-else-if="todo.isEdit===true && todo.completed===false" @click="store.saveEdit(index)"/>
              <a-divider type="vertical"/>
              <DeleteFilled @click="store.removeItem(index)"/>
            </div>
          </a-list-item>
        </a-list>
  <a-button shape="round" @click="goBack">
    <template #icon>
      <LeftOutlined/>
    </template>
    Back
  </a-button>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { useTodoListStore } from '../store/modules/todoList.ts'
import {DeleteFilled,EditFilled,CheckOutlined,LeftOutlined} from "@ant-design/icons-vue";
import router from '../././router/index.js'
import dayjs, {Dayjs} from "dayjs";
import {storeToRefs} from "pinia";

export default defineComponent({
  components: {DeleteFilled,LeftOutlined,EditFilled,CheckOutlined },

  setup() {
    const store = useTodoListStore()
    const {rawItems} =storeToRefs(store);
    const todoItem = ref('')
    const deadlineRef = ref<Dayjs>();
    const scheduleRef = ref<Dayjs>();

    function addItemInList(item) {
      if (item.length === 0) {
        store.inputAlert()
        return;
      }
       if(store.rawItems.find((i)=>i.item == item.value)){
        store.inputRepeated()
        return;
      }
      store.addItem(item,this.deadlineRef,this.scheduleRef)
      todoItem.value = ''
    }

    const goBack = () => {
      router.push("/")
    }
    const disabledDate = (current: Dayjs) => {
      return current < dayjs().subtract(1, 'day');
    };


    return {
      todoItem,
      rawItems: rawItems,
      addItemInLIst: addItemInList,
      store,
      goBack,
      disabledDate,
      deadlineRef,
      scheduleRef,
  }
  },
})
</script>

<style lang="scss">

.alert {
  color: #d1495b;
  font-size: 1em;
  font-weight: 600;
}
.date-picker{
  width: 95px;
}
.todoItem{
  display: inline-flex;
}
.done {
  text-decoration: line-through;
  color: #ddd;
}

</style>
