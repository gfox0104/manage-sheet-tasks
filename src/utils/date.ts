/**
 * returns difference between 2 dates in integers
 *
 * taken from https://stackoverflow.com/a/11193222/4151080
 */
export function dateDiffInDays(d1: Date, d2: Date): number {
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt(String((t2 - t1) / (24 * 3600 * 1000)));
}

export type DateFormat = "dd MMM yyyy" | "dd/MM/yyyy"


/**
 * get date in specified format in IST
 *
 * @param date
 * @param dateFormat
 */
export function getDate(date: Date = new Date(), dateFormat: DateFormat = "dd MMM yyyy") {
    return Utilities.formatDate(date, "GMT+530", dateFormat);
}
