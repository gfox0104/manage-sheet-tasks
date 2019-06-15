function onOpen(e) {
    SpreadsheetApp.getUi()
        .createMenu("Common tasks")
        .addItem('Send Email', 'sendTaskSummaryEmail')
        .addToUi();
}

function sendTaskSummaryEmail() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = _getFilteredObject(sheet);
    const html = _getFormattedDataFromArray(data);
    _sendEmail(html);
}

/**
 iterates through A:E colmn of the sheet
 saves in appropriate result object
 **/
function _getFilteredObject(sheet) {
    const PROJECT_COL = 0;
    const TASK_COL = 1;
    const TASK_STATUS_COL = 4;
    const DATE_COL = 3;

    const TODAY = new Date();
    const data = sheet.getRange('A2:E').getValues();
    const result = {
        "delayed": [],
        "today": [],
        "to decide date": [],
        "future": []
    };

    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var task = {task: row[TASK_COL], project: row[PROJECT_COL]};

        if (task.task.trim() === "" || row[TASK_STATUS_COL] === "Completed") continue;

        if (row[DATE_COL] === "") {
            result["to decide date"].push(task);
            continue;
        }

        let dateDiff = DateDiff.inDays(TODAY, row[DATE_COL]);
        if (dateDiff < 0) {
            Logger.log("Delayed: " + task + " " + dateDiff);
            result["delayed"].push(task);
        } else if (dateDiff === 0) {
            Logger.log("Today: " + task + " " + dateDiff);
            result["today"].push(task);
        } else {
            Logger.log("Future: " + task + " " + dateDiff);
            result["future"].push(task);
        }
    }

    return result;
}


function _getFormattedDataFromArray(o) {
    var htmlBody = HtmlService.createHtmlOutputFromFile('tasks_mail_template').getContent();

    var delayedItems = _getHtmlListItemsFromStatus(o, "delayed", "Delayed Tasks");
    var todayItems = _getHtmlListItemsFromStatus(o, "today", "Tasks for Today");
    var toDecidedItems = _getHtmlListItemsFromStatus(o, "to decide date", "Tasks to decide deadline");
    var result = delayedItems + todayItems + toDecidedItems;

    htmlBody = htmlBody.replace("<replaceBodyContentHere></replaceBodyContentHere>", result)
    Logger.log(htmlBody)
    return htmlBody;
}

function _getHtmlListItemsFromStatus(o, status, statusTitle) {
    var items = "<br><h3>" + statusTitle + "</h3><ul>";

    var statusTasks = o[status];
    for (var i = 0; i < statusTasks.length; i++) {
        var task = statusTasks[i]
        items += "<li><i>" + task.project + ": </i>" + task.task + "</li>";
    }
    items += "</ul>"

    return items;
}

/**
 sends email to the user himself
 **/
function _sendEmail(html) {
    var email = Session.getActiveUser().getEmail();
    var date = Utilities.formatDate(new Date(), "GMT+530", "dd MMM yyyy")
    var subject = "Tasks summary for " + date;

    MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: html
    });

}


var DateDiff = {
    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },
    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },
    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },
    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
}
