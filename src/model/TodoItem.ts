// @ts-ignore
import dayjs from "dayjs";

export interface TodoItem {
    id:number,
    item:string,
    isEdit:boolean,
    completed:boolean,
    deadline:dayjs,
    schedule:dayjs,
    isScheduled:boolean,
}
