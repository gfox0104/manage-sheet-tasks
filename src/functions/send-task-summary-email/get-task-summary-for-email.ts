import {ResultTask, TaskSummary} from "../../models/task-summary";
import {dateDiffInDays} from "../../utils/date";
import {CurrentTasksColIndex} from "../../models/sheet-col-index";
import {CURRENT_TASKS_SHEET_RANGE} from "../../utils/active-ranges";


/**
 * iterates through A:E of the sheet
 * saves in appropriate result object and returns it
 *
 * todo: update it as per priority matrix
 * @param sheet
 */
export function getTaskSummaryForEmail(sheet: GoogleAppsScript.Spreadsheet.Sheet): TaskSummary {

    const TODAY = new Date();
    const data = sheet.getRange(CURRENT_TASKS_SHEET_RANGE).getValues();
    const result: TaskSummary = {
        "delayed": [],
        "today": [],
        "to decide date": [],
        "future": []
    };

    data.forEach(row => {
        let task: ResultTask = {
            task: row[CurrentTasksColIndex.TASK],
            project: row[CurrentTasksColIndex.PROJECT]
        };

        if (task.task.trim() === "" || row[CurrentTasksColIndex.TASK_STATUS] === "Completed")
            return;

        if (row[CurrentTasksColIndex.DATE] === "") {
            result["to decide date"].push(task);
            return;
        }

        let dateDiff = dateDiffInDays(TODAY, row[CurrentTasksColIndex.DATE]);
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
