const {DATES} = require('../constants');

/**
 * Method to check date from Angular datepicker.
 * If we have not date or date contains 1970, undefined, Invalid words
 * We set the starting date 3 days ago and finished date equals current date
 * @param startingDay - start date search
 * @param finishedDay - finish date search
 * @returns {{startingDate: string, finishDate: string}} - new value of dates
 */
module.exports = (startingDay, finishedDay) => {
    let startingDate;
    let startingTime;
    let finishDate;
    let finishTime;

    startingDate = new Date(Date.now() - DATES.ONE_DAY * startingDay).toLocaleDateString();
    startingTime = new Date(Date.now() - DATES.ONE_DAY * startingDay).toLocaleTimeString();

    finishDate = new Date(Date.now() - DATES.ONE_DAY * finishedDay).toLocaleDateString();
    finishTime = new Date(Date.now() - DATES.ONE_DAY * finishedDay).toLocaleTimeString();

    let [fYear, fMonth, fDay] = startingDate.split('-');
    (+fMonth < 10) ? fMonth = '0' + fMonth : fMonth;
    (+fDay < 10) ? fDay = '0' + fDay : fDay;
    startingDate = `${fYear}-${fMonth}-${fDay} ${startingTime}`;

    let [year, month, day] = finishDate.split('-');
    (+month < 10) ? month = '0' + month : month;
    (+day < 10) ? day = '0' + day : day;
    finishDate = `${year}-${month}-${day} ${finishTime}`;

    return {
        startingDate,
        finishDate
    }
};
