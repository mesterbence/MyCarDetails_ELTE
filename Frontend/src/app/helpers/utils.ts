import { DatePipe } from '@angular/common';
import {NgModule} from "@angular/core";

@NgModule({
    providers: [DatePipe]
})

export default class Utils {
    private static datePipe: DatePipe;

    static getNum(num: number, unit: String) {
        if (num === null || isNaN(num)) { return "Még nincs adat"; }
        if( num % 1 !== 0) {
            return (Math.round(num * 10**2) / 10**2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + unit;
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + unit;
    }

    static getDate(date: any) {
        if (date === null) { return "Még nincs adat"; }
        return this.datePipe.transform(date.date, 'yyyy.MM.dd.');
        //return date.date;
    }

    static numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    static numberOnlyWithComma(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44 && charCode != 46) {
            return false;
        }
        return true;
    }


    static handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).style.display = 'none';
    }
}