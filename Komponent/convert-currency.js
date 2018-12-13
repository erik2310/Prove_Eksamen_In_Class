exports.convertFromEuroToDKK = function(euro) {

    let result = euro * 746.41 / 100;

    return result;

}

exports.convertFromDKKToEuro = function(dkk) {

    let result = dkk * 100 / 746.41;

    return result;

}