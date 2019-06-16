import {getActiveEmail, sendEmail} from "../../repository/email";
import {DateDiff, getDate} from "../../utils/date";
import {ResultTask, TaskSummary} from "../../models/task-summary";

export function sendTaskSummaryEmail() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data: TaskSummary = _getTaskSummary(sheet);
    const html: string = _getFormattedDataFromArray(data);
    const subject = `Tasks summary for ${getDate()}`;
    const email = getActiveEmail();
    sendEmail(email, subject, html);
}


/**
 iterates through A:E column of the sheet
 saves in appropriate result object
 **/
function _getTaskSummary(sheet): TaskSummary {
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

        let dateDiff = DateDiff.inDays(TODAY, row[COL_DATE]);
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

function _getFormattedDataFromArray(o: TaskSummary): string {
    let htmlBody = HtmlService.createHtmlOutputFromFile('tasks_mail_template').getContent();

    let delayedItems = _getHtmlListItemsFromStatus(o.delayed, "Delayed Tasks");
    let todayItems = _getHtmlListItemsFromStatus(o.today, "Tasks for Today");
    let toDecidedItems = _getHtmlListItemsFromStatus(o["to decide date"], "Tasks to decide deadline");
    let result = delayedItems + todayItems + toDecidedItems;

    htmlBody = htmlBody.replace("<replaceBodyContentHere></replaceBodyContentHere>", result);
    Logger.log(htmlBody);
    return htmlBody;
}

function _getHtmlListItemsFromStatus(tasks: ResultTask[], statusTitle): string {
    let result = "<br><h3>" + statusTitle + "</h3><ul>";

    for (let i = 0; i < tasks.length; i++) {
        let item = tasks[i];
        result += "<li><i>" + item.project + ": </i>" + item.task + "</li>";
    }
    result += "</ul>";

    return result;
}

