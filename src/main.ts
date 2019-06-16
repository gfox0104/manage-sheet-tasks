require("./functions/**");

function onOpen(e) {
    SpreadsheetApp.getUi()
        .createMenu("Common tasks")
        .addItem('Send Email', 'sendTaskSummaryEmail')
        .addToUi();
}


