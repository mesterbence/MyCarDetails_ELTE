import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cost } from '../model/cost';
import { CarService } from '../service/car.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { DatePipe } from '@angular/common';
import { MileageStat } from '../model/mileage-stat';
import { CategoryStat } from '../model/category-stat';


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

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { }

  public lineChart: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: [
      ['Dátum', 'Üzemanyag ára (Ft)']
    ],
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
          max:1000,
          min:200
        }
      },
      legend: { position: 'none' }
    }
  };

  public mileageChart: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: [
      ['Dátum', 'Kilométeróra állása']
    ],
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
          max:200000,
          min:70000
        }
      },
      legend: 'none'
    }
  };
  public categoryChart: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Kategória', 'Összeg']
    ],
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
        this.carService.getCarFuelings(this.carId).subscribe(
          data => {
            this.fuelings = data;
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
          }
        );
        this.carService.getCarMileages(this.carId).subscribe(
          data => {
            this.mileages = data;
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
          }
        );
      } else {
        this.router.navigate(['/mycars']);
      }
      this.carService.getCarCostCategories(this.carId).subscribe(
        data => {
          this.categories = data;
          this.categories.forEach((category) => {
            this.categoryChart.dataTable.push([category.name, category.sum]);
          });
        }
      );
    });
  }
  onResize(event: any) {
    this.lineChart.component?.draw();
    this.mileageChart.component?.draw();
  }
}
