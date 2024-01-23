/*File of basic functions*/

//returns a logarithmic percentage
export function logarithmic(current, max){
    var baseLog =  Math.log(current) / Math.log(max);
    return Math.pow(100, baseLog) / 100;
}

//rounds a value to provided number of decimal places
export function round(value, places){
    const modifier = Math.pow(10, places);
    return Math.round(value * modifier) / modifier;
}