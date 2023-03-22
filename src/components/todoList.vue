<template>
      <h1>Todo List</h1>
<!--      <form @submit.prevent="addItemToCart" data-testid="add-items">-->
        <a-input type="text" v-model:value="todoItem" placeholder="Add new todo" @keyup.enter="addItemInLIst"/>
  <a-divider/>
        <a-button @click="addItemInLIst">Submit</a-button>
        <a-list>

          <a-list-item v-for="item in todoList.items" :key="item.title">
            <div>
              <a-checkbox v-model:checked="item.status" @change="handleStatusChange(index)" />
              {{ item.title }}
              <a-date-picker v-model:value="item.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline" class="date-picker"/>
              <a-divider type="vertical"/>
              <a-date-picker v-model:value="item.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule" class="date-picker"/>
            </div>
<!--            <div v-else class="edit-todo-item">-->
<!--              <a-input class="edit-input" v-model:value="item.title" placeholder="edit todo" :bordered="true" size="small"/>-->
<!--              <a-date-picker v-model:value="item.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline"/>-->
<!--              <a-date-picker v-model:value="item.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule"/>-->
<!--            </div>-->
            <div>
              <a-divider type="vertical"/>
              <EditFilled />
              <a-divider type="vertical"/>
              <DeleteFilled @click="todoList.removeItem(item.title)"/>
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



export default defineComponent({
  components: {DeleteFilled,LeftOutlined,EditFilled,CheckOutlined },

  setup() {
    const todoList = useTodoListStore()

    const todoItem = ref('')
    const deadlineRef = ref<Dayjs>(null);
    const scheduleRef = ref<Dayjs>(null);

    function addItemInList() {
      if (!todoItem.value) return
      todoList.addItem(todoItem.value)
      todoItem.value = ''
    }

    const goBack = () => {
      router.push("/")
    }
    const disabledDate = (current: Dayjs) => {
      return current < dayjs().subtract(1, 'day');
    };

    // @ts-ignore
    window.stores = { todoList: todoList }

    return {
      todoItem: todoItem,
      addItemInLIst: addItemInList,
      todoList: todoList,
      goBack,
      disabledDate:disabledDate,
  }
  },
})
</script>

<style lang="scss">
.date-picker{
  width: 95px;
}
.todoItem{
  display: inline-flex;
}

</style>
