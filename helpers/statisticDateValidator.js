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