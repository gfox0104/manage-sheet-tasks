export type TaskSummary =
    { [_ in ResultTaskStatus]?: ResultTask[] }

export type ResultTaskStatus =
    "delayed" |
    "today" |
    "to decide date" |
    "future" |
    "completed"


export interface ResultTask {
    task: string,
    project: string
}

export interface CompletedTaskRowItem {
    project: string,                    // Project
    task: string,                       // Task
    involvedPeople: string,             // Involved people
    dateToFinish: string,               // Date to finish
    taskStatus: TaskStatusInSheet,      // Task Status
    priority: string,                   // Priority
}

export interface CurrentTaskRowItem {
    project: string,                    // Project
    task: string,                       // Task
    involvedPeople: string,             // Involved people
    dateToFinish: string,               // Date to finish
    taskStatus: TaskStatusInSheet,      // Task Status
    priority: string,                   // Priority
}

export type TaskStatusInSheet =
    "Completed" |
    "Not Required" |
    "In Progress" |
    "Todo"
