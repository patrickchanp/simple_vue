<template>
  <h3>Something going to do today:</h3>
  <a-list>
    <a-list-item v-for="(todo) in scheduledItems " :key="todo.id">
      <div v-if="scheduledItems.length > 0 && todo.completed ===false">
        · {{todo.item}} {{todo.priority}}
      </div>
    </a-list-item>
  </a-list>
  <h3>Something up to deadline:</h3>
  <a-list>
    <a-list-item v-for="(todo) in nearDeadlineItems " :key="todo.id">
      <div v-if="nearDeadlineItems.length > 0">
        · {{todo.item}} {{todo.status}}
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
    const {scheduledItems,rawItems,nearDeadlineItems} = storeToRefs(store);

    return {
      scheduledItems,store,rawItems,nearDeadlineItems,
    }
  }
})
</script>

<style scoped>
h3{
  text-align: left;
}
</style>
