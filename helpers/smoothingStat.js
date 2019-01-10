module.exports = (statArray, paramName) => {

    let smoothingCoefficient = 1;
    let smoothedArray = [];

    if (statArray.length >= 500 && statArray.length < 1000) {
        smoothingCoefficient = 2;
    }

    if (statArray.length >= 1000 && statArray.length < 4000) {
        smoothingCoefficient = 10;
    }

    if (statArray.length >= 4000 && statArray.length < 10000) {
        smoothingCoefficient = 20
    }

    if (statArray.length >= 10000) {
        smoothingCoefficient = 100
    }

    let arrayToSmooth = [];
    for (const elem of statArray) {
        let {roomid, fulldate, [paramName]: parameter} = elem.dataValues;
        let date = new Date(fulldate).getTime();
        arrayToSmooth.push({parameter, date});

        if (arrayToSmooth.length === smoothingCoefficient) {
            let avgParam = 0;
            let avgDate = 0;

            for (const element of arrayToSmooth) {
                avgParam = avgParam + +element.parameter;
                avgDate += +element.date;
            }

            avgParam = avgParam / arrayToSmooth.length;
            avgDate = avgDate / arrayToSmooth.length;
            avgDate = `${new Date(avgDate).toLocaleDateString()} ${new Date(avgDate).toLocaleTimeString()}`;

            smoothedArray.push({
                roomid,
                [paramName]: avgParam.toFixed(2),
                fulldate: avgDate
            });

            arrayToSmooth = [];
        }
    }

    return smoothedArray;
};