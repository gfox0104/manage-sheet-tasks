import {CurrentTasksColIndex} from "../../models/sheet-col-index";
import {CURRENT_TASKS_SHEET} from "../../utils/active-ranges";


export function moveCompletedTasks() {
    const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const srcSheet = activeSpreadSheet.getSheetByName("Current tasks");
    const destSheet = activeSpreadSheet.getSheetByName("Completed tasks");
    const lastRowInDestSheet = destSheet.getLastRow();
    const totalRowsInSrcSheet = srcSheet.getLastRow();

    // todo optimise this loop
    for (let i = 0; i < totalRowsInSrcSheet; i++) {
        const row = i + 1;
        const srcRange = `${CURRENT_TASKS_SHEET.FIRST_COL}${row}:${CURRENT_TASKS_SHEET.LAST_COL}${row}`;
        const srcRow = srcSheet.getRange(srcRange);
        const srcRowVal = srcRow.getValues()[0];
        if (srcRowVal[CurrentTasksColIndex.TASK_STATUS] === "Completed") {
            const destRowIndex = lastRowInDestSheet + i;
            const destRange = `${CURRENT_TASKS_SHEET.FIRST_COL}${destRowIndex}:${CURRENT_TASKS_SHEET.LAST_COL}${destRowIndex}`;
            const destRow = destSheet.getRange(destRange);
            srcRow.copyTo(destRow);
            Logger.log(`moved row from ${srcRange} -> ${destRange}`);
        }
        // srcSheet.sort()
    }
}
