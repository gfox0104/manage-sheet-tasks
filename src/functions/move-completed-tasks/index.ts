import {
    COMPLETED_TASKS_SHEET,
    CompletedTasksColIndex,
    CURRENT_TASKS_SHEET,
    CurrentTasksColIndex
} from "../../utils/active-ranges";


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
        if (srcRowVal[CurrentTasksColIndex.TASK_STATUS] === "Completed" ||
            srcRowVal[CurrentTasksColIndex.TASK_STATUS] === "Not Required") {
            const destRowIndex = lastRowInDestSheet + i;
            const destRange = `${CURRENT_TASKS_SHEET.FIRST_COL}${destRowIndex}:${CURRENT_TASKS_SHEET.LAST_COL}${destRowIndex}`;
            const destRow = destSheet.getRange(destRange);
            srcRow.copyTo(destRow, {contentsOnly: true});
            srcRow.deleteCells(SpreadsheetApp.Dimension.ROWS);
            Logger.log(`moved row from ${srcRange} -> ${destRange}`);
        }
    }

    srcSheet.getRange(CURRENT_TASKS_SHEET.RANGE).sort({column: CurrentTasksColIndex.DATE, ascending: false});
    destSheet.getRange(COMPLETED_TASKS_SHEET.RANGE).sort({column: CompletedTasksColIndex.DATE, ascending: false});
    Logger.log(`sheet sorting done for ${srcSheet.getName()}, ${destSheet.getName()}`);
}
