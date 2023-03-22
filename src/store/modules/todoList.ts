import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUserStore } from './user'
import dayjs from "dayjs";

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
            this.rawItems.push(title)
        },

        removeItem(title: string) {
            const i = this.rawItems.lastIndexOf(title)
            if (i > -1) this.rawItems.splice(i, 1)
        },

        async purchaseItems() {
            const user = useUserStore()
            if (!user.name) return

            console.log('Purchasing', this.items)
            const n = this.items.length
            this.rawItems = []

            return n
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTodoListStore, import.meta.hot))
}
