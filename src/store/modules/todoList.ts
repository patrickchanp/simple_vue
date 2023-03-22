import { defineStore } from 'pinia'
// @ts-ignore
import dayjs ,{ Dayjs }from "dayjs"

interface TodoItem {
    id:number,
    item:string,
    isEdit:boolean,
    completed:boolean,
    deadline:dayjs,
    schedule:dayjs,
}
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
            this.rawItems.push({item,id:this.id++,completed:false,isEdit:false,deadline,schedule})
        },

        removeItem(index: number) {
           this.rawItems.splice(index, 1)
        },

        inputAlert(){
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false;
            },3000);
        },

        handleEdit (index:number){
            this.rawItems[index].isEdit = true;
        },

        saveEdit(index:number){
            this.rawItems[index].isEdit = false;
        },

        inputRepeated(){
            this.showAlert = true;
            setTimeout(()=>{
                this.showAlert = false;
            },3000);
        },

    },
})

