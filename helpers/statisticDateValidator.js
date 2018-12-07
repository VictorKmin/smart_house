/**
 * Method to check date from Angular datepicker.
 * If we have not date or date contains 1970, undefined, Invalid words
 * We set the starting date 3 days ago and finished date equals current date
 * @param from - start date search
 * @param to - finish date search
 * @returns {{startingDate: string, finishDate: string}} - new value of dates
 */
module.exports = (from, to) => {

    if (!from || from.includes('undefined') || from.includes('1970') || from.includes('Invalid')) {
        from = new Date(Date.now() - 259200000).toLocaleDateString();
        let [year, month, day] = from.split('-');
        (+month < 10) ? month = '0' + month: month;
        (+day < 10) ? day = '0' + day : day;
        from = `${year}-${month}-${day}`;
    }
    else {
        from = from + " 00";
    }

    if (!to || to.includes('undefined') || to.includes('1970') || to.includes('Invalid')) {
        to = new Date(Date.now()).toLocaleDateString();
        let [year, month, day] = to.split('-');
        (+month < 10) ? month = '0' + month: month;
        (+day < 10) ? day = '0' + day : day;
        to = `${year}-${month}-${day} 23:59`;
    }
    else  {
        to = to + ' 23:59';
    }

    return {
        startingDate: from,
        finishDate: to
    }
};