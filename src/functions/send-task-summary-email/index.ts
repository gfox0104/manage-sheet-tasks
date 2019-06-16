import {getActiveEmail, sendEmail} from "../../repository/email";
import {getDate} from "../../utils/date";
import {TaskSummary} from "../../models/task-summary";
import {getTaskSummary} from "./get-task-summary";
import {getHtmlFromTaskSummary} from "./get-html-from-summary";

export function sendTaskSummaryEmail() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data: TaskSummary = getTaskSummary(sheet);
    const html: string = getHtmlFromTaskSummary(data);
    const subject = `Tasks summary for ${getDate()}`;
    const email = getActiveEmail();
    sendEmail(email, subject, html);
}
