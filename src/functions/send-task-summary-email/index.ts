import {getActiveEmail, sendEmail} from "../../repository/email";
import {getDate} from "../../utils/date";
import {TaskSummary} from "../../models/task-summary";
import {getTaskSummaryForEmail} from "./get-task-summary-for-email";
import {getHtmlFromTaskSummary} from "./get-html-from-summary";

export function sendTaskSummaryEmail() {
    const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = activeSpreadSheet.getSheetByName("Current tasks");
    const data: TaskSummary = getTaskSummaryForEmail(sheet);
    const html: string = getHtmlFromTaskSummary(data);
    const subject = `Tasks summary for ${getDate()}`;
    const email = getActiveEmail();
    sendEmail(email, subject, html);
}
