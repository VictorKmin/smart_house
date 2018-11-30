module.exports = (from, to) => {
    let [fromDate, fromHour] = from.split(' ');
    let [toDate, toHour] = to.split(' ');
    let [fromYear, fromMonth, fromDay] = fromDate.split('-');
    let [toYear, toMonth, toDay] = toDate.split('-');

    (fromYear === 'undefined') ? fromYear = 0 : fromYear;
    (fromMonth === "undefined") ? fromMonth = 0 : fromMonth;
    (fromDay === "undefined") ? fromDay = 0 : fromDay;
    (fromHour === "undefined") ? fromHour = 0 : fromHour;

    (toYear === "undefined") ? toYear = 9999 : toYear;
    (toMonth === "undefined") ? toMonth = 99 : toMonth;
    (toDay === "undefined") ? toDay = 99 : toDay;
    (toHour === "undefined") ? toHour = 99 : toHour;

    fromDate = `${fromYear}-${fromMonth}-${fromDay} ${fromHour}`;
    toDate = `${toYear}-${toMonth}-${toDay} ${toHour}`;

    return {fromDate, toDate}
};