import {defineStore} from 'pinia'
// @ts-ignore
import dayjs, {Dayjs} from "dayjs"
import {Priority, Status, TodoItem} from "../../model/TodoItem";

export const useTodoListStore = defineStore({
    id: 'todoList',
    state: () => ({
        rawItems: [] as TodoItem[],
        id:0,
        showAlert:false,
        repeated:false,
    }),
    actions: {
        addItem(item: string,deadline:Dayjs,schedule:Dayjs) {
            this.rawItems.push({item,id:this.id++,completed:false,isEdit:false,deadline,schedule,priority:Priority.MEDIUM,status:Status.PENDING})
        },

        addScheduledItems(index:number){
            let i =this.rawItems[index];
            const now = new Date();
            console.log('111111');
          if (!i.schedule){
              i.isScheduled = false;
          }
          if(i.schedule.date() <= now.getDate() && i.completed==false){
               i.isScheduled = true;
          }
        },

        addDeadlineItems(index:number){
            let i =this.rawItems[index];
            const now = new Date();
            if (!i.deadline){
                i.nearDeadline = false;
            }
            if(i.deadline > now &&
                i.deadline.date() <= now.getDate() + 3
                && i.completed == false){
                i.nearDeadline = true;
            }else {
                i.nearDeadline = false
            }
        },

        removeItem(index: number) {
            let indexOfScheduledItem = this.scheduledItems.indexOf(this.rawItems[index]);
            // this.scheduledItems.splice(indexOfScheduledItem, 1);
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

