import Dexie from "dexie";



interface Task {
    id: number
    created_at: string
    status: string
    task: string
    description: string
    tag: string
}


const db = new Dexie("TaskListDB") as Dexie & {
    tasks: Dexie.Table<Task, number>;
};

db.version(1).stores({
    tasks: "++id, created_at, status, task, description, tag"
})

export default db;
export type { Task };