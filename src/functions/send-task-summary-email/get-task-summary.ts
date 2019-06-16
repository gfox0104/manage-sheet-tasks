import {ResultTask, TaskSummary} from "../../models/task-summary";
import {dateDiffInDays} from "../../utils/date";


/**
 * iterates through A:E of the sheet
 * saves in appropriate result object and returns it
 *
 * @param sheet
 */
export function getTaskSummary(sheet): TaskSummary {
    const COL_PROJECT = 0;
    const COL_TASK = 1;
    const COL_DATE = 3;
    const COL_TASK_STATUS = 4;

    const TODAY = new Date();
    const data = sheet.getRange('A2:E').getValues();
    const result: TaskSummary = {
        "delayed": [],
        "today": [],
        "to decide date": [],
        "future": []
    };

    data.forEach(row => {
        let task: ResultTask = {
            task: row[COL_TASK],
            project: row[COL_PROJECT]
        };

        if (task.task.trim() === "" || row[COL_TASK_STATUS] === "Completed")
            return;

        if (row[COL_DATE] === "") {
            result["to decide date"].push(task);
            return;
        }

        let dateDiff = dateDiffInDays(TODAY, row[COL_DATE]);
        if (dateDiff < 0) {
            Logger.log(`Delayed: ${task} ${dateDiff}`);
            result["delayed"].push(task);
        } else if (dateDiff === 0) {
            Logger.log(`Today: ${task} ${dateDiff}`);
            result["today"].push(task);
        } else {
            Logger.log(`Future: ${task} ${dateDiff}`);
            result["future"].push(task);
        }
    });

    return result;
}
