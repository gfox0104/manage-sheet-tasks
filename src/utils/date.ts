/**
 * returns difference between 2 dates in integers
 *
 * taken from https://stackoverflow.com/a/11193222/4151080
 */
export const DateDiff = {
    inDays: (d1: Date, d2: Date): number => {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return parseInt(String((t2 - t1) / (24 * 3600 * 1000)));
    },
    inWeeks: (d1: Date, d2: Date): number => {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return parseInt(String((t2 - t1) / (24 * 3600 * 1000 * 7)));
    },
    inMonths: (d1: Date, d2: Date): number => {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },
    inYears: (d1: Date, d2: Date): number => d2.getFullYear() - d1.getFullYear()
};

type DateFormat = "dd MMM yyyy" | "dd/MM/yyyy"

/**
 * get date in specified format in IST
 *
 * @param date
 * @param dateFormat
 */
export const getDate = (date: Date = new Date(), dateFormat: DateFormat = "dd MMM yyyy") =>
    Utilities.formatDate(date, "GMT+530", dateFormat);
