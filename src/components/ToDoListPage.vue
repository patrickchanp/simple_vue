<template>
<h1>To do list</h1>
      <a-input v-model:value="todoItem" placeholder="Add new todo" @keyup.enter="addTodo" />
  <a-divider/>
  <a-button type="primary" @click="addTodo">Submit</a-button>
  <a-divider/>
  <a-list v-if="listRef.length">
    <a-list-item v-for="(item,index) of listRef" :id="item.id" :key="item.id">
        <div v-if="item.isEdit==false" :class="item.status==true?'done':''">
          <a-checkbox v-model:checked="item.status" @click="handleStatusChange(index)"/>  {{item.title}}
        </div>
        <input v-else v-model="item.title" ref="refInput" placeholder="edit todo"/>
      <div>
        <a-divider type="vertical"/>
        <EditFilled v-if="item.isEdit===false && item.status==false" @click="handleEdit(index)" />
        <CheckOutlined v-else-if="item.isEdit===true && item.status===false" @click="saveEdit(index)"/>
        <a-divider type="vertical"/>
        <DeleteFilled @click="removeItem(index)" />
      </div>
    </a-list-item>
  </a-list>
  <h5 v-else>Nothing to do, add new todo</h5>
</template>

<script lang="ts">
import { reactive, ref} from "vue";
import {DeleteFilled,EditFilled,CheckOutlined} from "@ant-design/icons-vue";


interface TodoList {
  id:number,
  title:string,
  isEdit:boolean,
  status:boolean,
}
export default {
  name: "ToDoListPage",
  components:{
    DeleteFilled,EditFilled,CheckOutlined
  },
  setup(){
  let todoItem = ref<string | null>(null);
  let listRef = reactive<Array<TodoList>>([]);
  let idRef = ref<number>(0);
  const refInput = ref<string|null>(null);

   const addTodo = () => {
     listRef.push({
       title:todoItem.value,
       id:++idRef.value,
       isEdit:false,
       status:false,
     });
     todoItem.value="";
   }
   const removeItem = (index:number) => {
     listRef.splice(index,1);
   }

    const handleEdit =(index)=>{
     listRef[index].isEdit = true;
    }
  const handleStatusChange = (index:number) => {
    listRef[index].status = true;
    listRef[index].isEdit=false;
  }
   const saveEdit=(index)=>{
     listRef[index].isEdit=false;
    }

  return {
    todoItem,
    listRef,
    refInput,
    addTodo,
    removeItem,
    handleEdit,
    saveEdit,
    handleStatusChange,
  };
  }
}

</script>

<style lang="scss">
.done {
  text-decoration: line-through;
  color: #ddd;
}
</style>
