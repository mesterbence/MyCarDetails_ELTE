import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cost } from '../model/cost';
import { CarService } from '../service/car.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-morestat',
  templateUrl: './morestat.component.html',
  styleUrls: ['./morestat.component.css'],
  providers: [DatePipe]
})
export class MorestatComponent implements OnInit {

  fuelings!: Cost[];
  carId!: number;
  prices: number[] = [];

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { }

  public lineChart: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: [
      ['Dátum', 'Üzemanyag ára']
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
      } else {
        this.router.navigate(['/mycars']);
      }
    });
  }
  onResize(event: any) {
    this.lineChart.component?.draw();
  }
}
