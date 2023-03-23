<template>
<h3>What you're going to do today:</h3>
  <a-list>
    <a-list-item v-for="(todo) in scheduledItems " :key="todo.id">
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

export default defineComponent({
  name: "scheduleTodo",
   setup(){
    const store = useTodoListStore();
    const {scheduledItems,rawItems} = storeToRefs(store);

    return {
      scheduledItems,store,rawItems,
    }
  }
})
</script>

<style scoped>

</style>
