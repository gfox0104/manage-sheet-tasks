export type TaskSummary =
    { [_ in ResultTaskStatus]: ResultTask[] }

export type ResultTaskStatus =
    "delayed" |
    "today" |
    "to decide date" |
    "future"


export interface ResultTask {
    task: string,
    project: string
}

export type TaskStatusInSheet =
    "Completed" |
    "In Progress" |
    "Todo"
