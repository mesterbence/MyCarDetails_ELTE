import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cost} from '../model/cost';
import {CarService} from '../service/car.service';
import {GoogleChartInterface, GoogleChartType} from 'ng2-google-charts';
import {DatePipe} from '@angular/common';
import {MileageStat} from '../model/mileage-stat';
import {CategoryStat} from '../model/category-stat';
import {MoreCarstat} from "../model/more-carstat";


@Component({
    selector: 'app-morestat',
    templateUrl: './morestat.component.html',
    styleUrls: ['./morestat.component.css'],
    providers: [DatePipe]
})
export class MorestatComponent implements OnInit {

    fuelings!: Cost[];
    mileages!: MileageStat[];
    categories!: CategoryStat[];
    carId!: number;
    prices: number[] = [];
    storedMileages: number[] = [];
    years: number[] = [0];
    filterValue: number = 0;
    moreCarStat!: MoreCarstat;

    constructor(private carService: CarService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private datePipe: DatePipe) {
    }

    public lineChart: GoogleChartInterface = {
        chartType: GoogleChartType.LineChart,
        options: {
            title: 'Üzemanyag literenkénti ára',
            height: 650,
            vAxis: {
                gridlines:
                    {
                        count: 15
                    },
                format: '', // enélkül vesszőt rak
                viewWindow: {
                    max: 1000,
                    min: 200
                }
            },
            legend: {position: 'none'}
        }
    };

    public mileageChart: GoogleChartInterface = {
        chartType: GoogleChartType.LineChart,
        options: {
            title: 'Kilométeróra állása',
            height: 650,
            vAxis: {
                gridlines:
                    {
                        count: 15
                    },
                format: '', // enélkül vesszőt rak
                viewWindow: {
                    max: 200000,
                    min: 70000
                }
            },
            legend: 'none'
        }
    };
    public categoryChart: GoogleChartInterface = {
        chartType: GoogleChartType.ColumnChart,
        options: {
            title: 'Kategóriák',
            animation: {
                duration: 1000,
                easing: 'out',
                startup: true
            },
            legend: 'none',
            height: 650,
            vAxis: {
                format: '', // enélkül vesszőt rak
            }
        }
    };

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.carId = Number(params.get('id'));
                this.carService.getDistinctYears(this.carId).subscribe(
                    data => {
                        this.years = [...this.years, ...data];
                    }
                )
                this.loadFuelingChartData(this.carId, 0);
                this.loadCarMileagesChartData(this.carId, 0);
                this.loadCostCategoriesChartData(this.carId,0);
                this.loadCarStatistic(this.carId,0);
            } else {
                this.router.navigate(['/mycars']);
            }

        });
    }

    onResize(event: any) {
        this.lineChart.component?.draw();
        this.mileageChart.component?.draw();
        this.categoryChart.component?.draw();
    }

    filterChangeYear(year: number) {
        this.filterValue = year;
        this.loadCarStatistic(this.carId,this.filterValue);
        this.loadFuelingChartData(this.carId,this.filterValue);
        this.loadCarMileagesChartData(this.carId,this.filterValue);
        this.loadCostCategoriesChartData(this.carId,this.filterValue);
    }

    loadFuelingChartData(carId: number, year: number) {
        this.lineChart.dataTable = [['Dátum', 'Üzemanyag ára (Ft)']];
        this.carService.getCarFuelings(carId, year === 0 ? null : year).subscribe(
            data => {
                this.fuelings = data;
                if (this.fuelings.length > 0) {
                    this.fuelings.slice().reverse().forEach((fueling) => {
                        if (this.fuelings.length > 45) {
                            this.lineChart.dataTable.push([this.datePipe.transform(fueling.date, 'yyyy-MM')?.toString().replaceAll('-', '.'), fueling.price / fueling.fueling.quantity]);
                        } else {
                            this.lineChart.dataTable.push([this.datePipe.transform(fueling.date, 'yyyy-MM-dd')?.toString().replaceAll('-', '.'), fueling.price / fueling.fueling.quantity])
                        }
                        this.prices.push(fueling.price / fueling.fueling.quantity);
                    })
                    this.lineChart.options.vAxis.viewWindow.min = Math.min.apply(Math, this.prices) - 50;
                    this.lineChart.options.vAxis.viewWindow.max = Math.max.apply(Math, this.prices) + 50;
                    this.lineChart.component?.draw();
                }

            }
        );
    }
    loadCostCategoriesChartData(carId: number, year:number) {
        this.categoryChart.dataTable = [['Kategória', 'Összeg']];
        this.carService.getCarCostCategories(carId,year === 0 ? null : year).subscribe(
            data => {
                this.categories = data;
                if (this.categories.length > 0) {
                    this.categories.forEach((category) => {
                        this.categoryChart.dataTable.push([category.name, category.sum]);
                    });
                    this.categoryChart.component?.draw();
                }

            }
        );
    }
    loadCarMileagesChartData(carId: number, year: number) {
        this.mileageChart.dataTable = [['Dátum', 'Kilométeróra állása']];
        this.carService.getCarMileages(carId,year === 0 ? null : year).subscribe(
            data => {
                this.mileages = data;
                if (this.mileages.length > 0) {
                    this.mileages.forEach((mileage) => {
                        if (this.mileages.length > 45) {
                            this.mileageChart.dataTable.push([this.datePipe.transform(mileage.date, 'yyyy-MM')?.toString().replaceAll('-', '.'), mileage.mileage]);
                        } else {
                            this.mileageChart.dataTable.push([this.datePipe.transform(mileage.date, 'yyyy-MM-dd')?.toString().replaceAll('-', '.'), mileage.mileage])
                        }
                        this.storedMileages.push(mileage.mileage);
                    })
                    this.mileageChart.options.vAxis.viewWindow.min = Math.min.apply(Math, this.storedMileages) - 5000;
                    this.mileageChart.options.vAxis.viewWindow.max = Math.max.apply(Math, this.storedMileages) + 5000;
                    this.mileageChart.component?.draw();
                }
            }
        );
    }
    loadCarStatistic(carId: number, year: number) {
        this.carService.getCarStatistic(carId,year === 0 ? null : year).subscribe(
            data => {
                this.moreCarStat = data;
            }
        )
    }
}
