<template>
  <a-checkbox v-model:checked="todo.completed" @change="handleItemIsCompleted(index)" />
  {{ todo.item }}
  <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline" @change="store.addDeadlineItems(index)" class="date-picker"/>
  <a-divider type="vertical"/>
  <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule" @change="store.addScheduledItems(index)" class="date-picker"/>
</template>

<script lang="ts">
import {TodoItem} from "../model/TodoItem";
import {useTodoListStore} from "../store/modules/todoList";
import dayjs, {Dayjs} from "dayjs";
import {storeToRefs} from "pinia";

export default {
  name: "todoItem",
  props:{
    todo:{
      type:Object as ()=> TodoItem,
      required:true
    },
    index :{
      type:Number,
      required: true
    }
  },
  setup (){
    const store = useTodoListStore();
    const {rawItems,scheduledItems} =storeToRefs(store);
    const disabledDate = (current: Dayjs) => {
      return current < dayjs().subtract(1, 'day');
    };
    function handleItemIsCompleted(index:number) {
      if (this.rawItems[index].completed == true) {
        let indexOfScheduledItem = this.scheduledItems.indexOf(this.rawItems[index]);
        this.scheduledItems.splice(indexOfScheduledItem, 1);
      } else {
        this.scheduledItems.push(this.rawItems[index])
      }
    }
    return {store,disabledDate,rawItems:rawItems,scheduledItems:scheduledItems,handleItemIsCompleted:handleItemIsCompleted}

  }
}
</script>

<style scoped>

</style>
