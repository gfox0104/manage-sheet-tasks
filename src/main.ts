import {sendTaskSummaryEmail} from "./functions/send-task-summary-email";
import {moveCompletedTasks} from "./functions/move-completed-tasks";

function onOpen(e) {
    SpreadsheetApp.getUi()
        .createMenu("Common tasks")
        .addItem('Send Email', 'sendTaskSummaryEmail')
        .addItem('Move completed tasks', 'moveCompletedTasks')
        .addToUi();
}

