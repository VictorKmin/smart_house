module.exports = (statArray) => {

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
        // console.log(elem.dataValues['room_temp']);
        arrayToSmooth.push(+elem.dataValues['room_temp']);
        if (arrayToSmooth.length = smoothingCoefficient) {
            let avg;
            for (const argument of arrayToSmooth) {
                avg += argument
            }
            avg = avg/arrayToSmooth.length;
            smoothedArray.push(avg)
        }
    }

    return smoothedArray;
};