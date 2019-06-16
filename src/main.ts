import {sendTaskSummaryEmail} from "./functions/send-task-summary-email";

function onOpen(e) {
    SpreadsheetApp.getUi()
        .createMenu("Common tasks")
        .addItem('Send Email', 'sendTaskSummaryEmail')
        .addToUi();
}


