// @ts-ignore
import dayjs from "dayjs";

export enum Priority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}

export enum Status {
    PENDING = "Pending",
    BLOCKED = "Blocked",
    CANCELLED = "Cancelled",
}

export interface TodoItem {
    id:number,
    item:string,
    isEdit:boolean,
    completed:boolean,
    deadline:dayjs,
    schedule:dayjs,
    priority: Priority,
    status: Status,
}
