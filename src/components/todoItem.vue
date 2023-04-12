<template>
  <a-space>
    <a-checkbox v-model:checked="todo.completed" />
    <a-select v-model:value="todo.priority" class="selection" size="small">
      <a-select-option value="Low">{{ Priority.LOW }}</a-select-option>
      <a-select-option value="Medium">{{ Priority.MEDIUM }}</a-select-option>
      <a-select-option value="High">{{ Priority.HIGH }}</a-select-option>
    </a-select>
    <div class="itemContainer">
  {{ todo.item }}
    </div>
  <a-date-picker v-model:value="todo.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline" @change="store.addDeadlineItems(index)" class="date-picker"/>
  <a-date-picker v-model:value="todo.schedule" :disabled-date="disabledDate" size="small" placeholder="Schedule" @change="store.addScheduledItems(index)" class="date-picker"/>
    <a-select v-model:value="todo.status" class="status" size="small">
      <a-select-option value="Pending">{{ Status.PENDING }}</a-select-option>
      <a-select-option value="Blocked">{{ Status.BLOCKED }}</a-select-option>
      <a-select-option value="Cancelled">{{ Status.CANCELLED }}</a-select-option>
    </a-select>
  </a-space>
</template>

<script lang="ts">
import {TodoItem} from "../model/TodoItem";
import {useTodoListStore} from "../store/modules/todoList";
import dayjs, {Dayjs} from "dayjs";
import {DownOutlined} from "@ant-design/icons-vue";
import {Priority,Status} from "../model/TodoItem"

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
  components:{ DownOutlined,},
  setup (){
    // const priority = ref<Priority>(Priority.HIGH)
    const store = useTodoListStore();
    const disabledDate = (current: Dayjs) => {
      return current < dayjs().subtract(1, 'day');
    };
    // function handleItemIsCompleted(index:number) {
    //   if (this.rawItems[index].completed == true) {
    //     let indexOfScheduledItem = this.scheduledItems.indexOf(this.rawItems[index]);
    //     this.scheduledItems.splice(indexOfScheduledItem, 1);
    //   } else {
    //     this.scheduledItems.push(this.rawItems[index])
    //   }
    // }
    function handleChange(index:number){

    };
    return {store,disabledDate,Priority,Status
    }

  }
}
</script>

<style scoped>
.itemContainer{
  width: 160px;
  text-align: left;
}
.selection{
  width: 94px;
}
.status{
  width: 108px;
}
.date-picker{
  width: 100px;
}

</style>
