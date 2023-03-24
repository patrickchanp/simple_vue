import { defineStore } from 'pinia'
// @ts-ignore
import dayjs ,{ Dayjs }from "dayjs"
import {TodoItem} from "../../model/TodoItem";

export const useTodoListStore = defineStore({
    id: 'todoList',
    state: () => ({
        rawItems: [] as TodoItem[],
        id:0,
        showAlert:false,
        repeated:false,
        scheduledItems:[] as TodoItem[],
    }),
    actions: {
        addItem(item: string,deadline:Dayjs,schedule:Dayjs) {
            this.rawItems.push({item,id:this.id++,completed:false,isEdit:false,deadline,schedule})
        },

        addScheduledItems(index:number){
            let i =this.rawItems[index];
            console.log("======="+i.schedule)
          if (!i.schedule){
              i.isScheduled = false;
          }
          if(i.schedule.day().toString()==dayjs().day().toString() && i.completed==false){
              this.scheduledItems.push(i);
               i.isScheduled = true;
          }
        },

        removeItem(index: number) {
           this.rawItems.splice(index, 1);
        },

        inputAlert(){
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false;
            },2000);
        },

        handleEdit (index:number){
            this.rawItems[index].isEdit = true;
        },

        saveEdit(index:number){
            this.rawItems[index].isEdit = false;
        },

        inputRepeated(){
            this.repeated = true;
            setTimeout(()=>{
                this.repeated = false;
            },2000);
        },

    },
})

