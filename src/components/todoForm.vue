<template>
  <div>
    <a-input type="text" v-model:value="todoItem" placeholder="Add new todo" @keyup.enter="addItemInLIst(todoItem)"/>
    <p v-show="store.showAlert" class="alert">Please finish todo</p>
    <p v-show="store.repeated" class="alert">todo is exist</p>
    <a-divider/>
    <a-button @click="addItemInLIst(todoItem)">Submit</a-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useTodoListStore } from "../store/modules/todoList.ts";
import {Dayjs} from "dayjs";
export default defineComponent({
   setup () {
    const todoItem = ref("");
    const store = useTodoListStore();
    const deadlineRef = ref<Dayjs>();
    const scheduleRef = ref<Dayjs>();

    function addItemInList(item:string) {
      if (item.length === 0) {
        store.inputAlert()
        return;
      }
      if(store.rawItems.find((i)=>i.item == item)){
        store.inputRepeated()
        return;
      }
      store.addItem(item,this.deadlineRef,this.scheduleRef);
      todoItem.value = ''
    }

    return {todoItem,addItemInLIst:addItemInList, store,deadlineRef,scheduleRef};
  },
});
</script>

<style scoped>
input {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 25px;
  width: 90%;
}
button {
  font-weight: 600;
}

.alert {
  color: #d1495b;
  font-size: 1em;
  font-weight: 600;
}
</style>
