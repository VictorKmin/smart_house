module.exports = () => {
    let date = new Date().toLocaleDateString();
    let [year, month, day] = date.split('-');
    (+month < 10) ? month = '0' + month : month;
    (+day < 10) ? day = '0' + day : day;
    date = `${year}-${month}-${day}`;

    return date
}
