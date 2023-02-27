<template>
<h1>To do list</h1>
      <a-input v-model:value="todoItem" placeholder="Add new todo" @keyup.enter="addTodo" />
  <a-divider/>
  <a-button type="primary" @click="addTodo">Submit</a-button>
  <a-divider/>
  <a-list v-if="listRef.length">
    <a-list-item v-for="(item,index) of listRef" :id="item.id" :key="item.id">
        <div v-if="item.isEdit===false" :class="item.status===true?'done':''">
          <a-checkbox v-model:checked="item.status" @change="handleStatusChange(index)" /> {{item.title}}
          <a-date-picker v-model:value="item.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline"/>
        </div>
      <div v-else class="edit-todo-item">
        <a-input class="edit-input" v-model:value="item.title" placeholder="edit todo" :bordered="true" size="small"/>
        <a-date-picker v-model:value="item.deadline" :disabled-date="disabledDate" size="small" placeholder="Deadline"/>
      </div>

      <div>
        <a-divider v-if="item.isEdit===false && item.status===false" type="vertical"/>
        <EditFilled v-if="item.isEdit===false && item.status===false" @click="handleEdit(index)" />
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
import dayjs, { Dayjs } from 'dayjs';

interface TodoList {
  id:number,
  title:string,
  isEdit:boolean,
  status:boolean,
  deadline:dayjs,
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
  let deadlineRef = ref<Dayjs>(null);

   const addTodo = () => {
     if(!todoItem.value) return alert("Please finish todo");
     if(listRef.find((item)=>item.title==todoItem.value)){
       return alert("Todo is exist");
     }
     listRef.push({
       title:todoItem.value,
       id:++idRef.value,
       isEdit:false,
       status:false,
       deadline:deadlineRef.value
     });
     todoItem.value="";
     deadlineRef.value=null;
   }
   const removeItem = (index:number) => {
     listRef.splice(index,1);
   }
   const handleEdit =(index)=>{
     listRef[index].isEdit = true;
    }
  const handleStatusChange = (index:number) => {
     if (listRef[index].deadline==null){
       listRef[index].status = false;
       return alert("please choose deadline");
     }
  }
   const saveEdit=(index)=>{
     if(!listRef[index].title) return alert("Todo can't be null");
     //Todo:verify the edited todoItem is repeated or not
     // if (listRef.find((item)=>item.title==todoItem.value)){
     //   return alert("Item is exist")
     // }
     listRef[index].isEdit=false;
    }
    const disabledDate = (current: Dayjs) => {
      return current && current < dayjs().endOf('day');
    };

  return {
    todoItem,
    listRef,
    deadlineRef,
    addTodo,
    removeItem,
    handleEdit,
    saveEdit,
    handleStatusChange,
    disabledDate,
  };
  }
}

</script>

<style lang="scss">
.edit-todo-item{
  display: inline-flex;
  .edit-input{
    width: 100px;
  }
}
.done {
  text-decoration: line-through;
  color: #ddd;
}
</style>
