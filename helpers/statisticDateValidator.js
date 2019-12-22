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

    startingDate = dateFormatter(startingDate, startingTime);
    finishDate = dateFormatter(finishDate, finishTime);

    return {
        startingDate,
        finishDate
    }
};

function dateFormatter(date, time) {
    let [year, month, day] = date.split('-');
    (+month < 10) ? month = '0' + month : month;
    (+day < 10) ? day = '0' + day : day;
    return `${year}-${month}-${day} ${time}`;
}
