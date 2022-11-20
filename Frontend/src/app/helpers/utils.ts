export default class Utils {
    static getNum(num: number, unit: String) {
        if (num === null || isNaN(num)) { return "Még nincs adat"; }
        if( num % 1 !== 0) {
            return (Math.round(num * 10**2) / 10**2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + unit;
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + unit;
    }
}