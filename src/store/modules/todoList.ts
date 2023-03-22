import { defineStore } from 'pinia'
// @ts-ignore
import dayjs from "dayjs"

interface TodoItem {
    id:number,
    title:string,
    isEdit:boolean,
    status:boolean,
    deadline:dayjs,
    schedule:dayjs,
}
export const useTodoListStore = defineStore({
    id: 'todoList',
    state: () => ({
        rawItems: [] as TodoItem[],
    }),
    getters: {
        items: (state): Array<TodoItem> =>
            state.rawItems.reduce((items, item) => {
                // @ts-ignore
                const existingItem = items.find((it) => it.title === item)
                if (!existingItem) {
                    items.push({ title: item, })
                } else {
                    existingItem.amount++
                }
                return items
            }, [] as Array<TodoItem>),
    },
    actions: {
        addItem(title: string) {
            console.log(title),
            this.rawItems.push(title)
        },

        removeItem(title: string) {
            const i = this.rawItems.lastIndexOf(title)
            if (i > -1) this.rawItems.splice(i, 1)
        },


    },
})

