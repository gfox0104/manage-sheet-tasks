import {ResultTask, TaskSummary} from "../../models/task-summary";

const TASK_TEMPLATE_EMAIL_PATH = "views/tasks_mail_template";

export function getHtmlFromTaskSummary(o: TaskSummary): string {
    let htmlBody = HtmlService.createHtmlOutputFromFile(TASK_TEMPLATE_EMAIL_PATH).getContent();

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
