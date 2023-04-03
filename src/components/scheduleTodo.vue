<template>
  <div>
  <h3>Something going to do today or before:</h3>
  <a-list>
    <a-list-item v-for="(todo) in rawItems " :key="todo.id">
      <div v-if="todo.isScheduled===true && todo.completed===false">
        · {{todo.item}}
      </div>
      <div v-else>
        Nothing up to date
      </div>
    </a-list-item>
  </a-list>
  </div>
  <a-divider/>
  <div>
  <h3>Something approaching the deadline:</h3>
  <a-list>
    <a-list-item v-for="(todo) in rawItems " :key="todo.id">
      <div v-if="todo.nearDeadline===true && todo.completed===false">
        · {{todo.item}}
      </div>
      <div v-else>
        Nothing up to deadline
      </div>
    </a-list-item>
  </a-list>
  </div>
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
text{
  /*text-align: left;*/
}
</style>
