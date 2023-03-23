<template>
<h3>What you're going to do today:</h3>
  <a-list>
    <a-list-item v-for="(todo,index) in scheduledItems " :key="todo.id">
      <div v-if="todo.isScheduled===true && todo.completed===false">
        · {{todo.item}}
      </div>
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useTodoListStore} from "../store/modules/todoList";
import {storeToRefs} from "pinia";
import dayjs from "dayjs";

export default defineComponent({
  name: "scheduleTodo",
   setup(){
    const store = useTodoListStore();
    const {scheduledItems,rawItems} = storeToRefs(store);
    // function itemIsScheduled(index:number){
    //   const i = this.rawItems[index];
    //   if(!i.schedule){
    //    return i.isScheduled = false;
    //   }else if (i.schedule.day().toString() == dayjs().day().toString()){
    //     return i.isScheduled = true;
    //   }
    // }

    return {
      scheduledItems,store,rawItems,
      // itemIsScheduled
    }
  }
})
</script>

<style scoped>

</style>
