export function logarithmic(current, max){
    var baseLog =  Math.log(current) / Math.log(max);
    return Math.pow(100, baseLog) / 100;
}

export function round(value){
    return Math.round(value * 10) / 10;
}