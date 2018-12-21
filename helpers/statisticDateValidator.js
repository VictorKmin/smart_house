/**
 * Method to check date from Angular datepicker.
 * If we have not date or date contains 1970, undefined, Invalid words
 * We set the starting date 3 days ago and finished date equals current date
 * @param from - start date search
 * @param to - finish date search
 * @returns {{startingDate: string, finishDate: string}} - new value of dates
 */
module.exports = (days) => {

    let startingDate;
    if (days) {
        startingDate = new Date(Date.now() - 86400000 * days).toLocaleDateString();
    } else {
        startingDate = new Date(Date.now() - 604800000);
        startingDate.setMonth(startingDate.getMonth() - 1);
        startingDate = startingDate.toLocaleDateString();
    }

    let [fYear, fMonth, fDay] = startingDate.split('-');
    (+fMonth < 10) ? fMonth = '0' + fMonth : fMonth;
    (+fDay < 10) ? fDay = '0' + fDay : fDay;
    startingDate = `${fYear}-${fMonth}-${fDay}`;

    let finishDate = new Date(Date.now()).toLocaleDateString();
    let [year, month, day] = finishDate.split('-');
    (+month < 10) ? month = '0' + month : month;
    (+day < 10) ? day = '0' + day : day;
    finishDate = `${year}-${month}-${day}`;

    return {
        startingDate,
        finishDate
    }
};