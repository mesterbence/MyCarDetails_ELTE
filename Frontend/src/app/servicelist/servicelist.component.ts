import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../service/service.service";
import {Service} from "../model/service";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";


@Component({
    selector: 'app-servicelist',
    templateUrl: './servicelist.component.html',
    styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {

    constructor(private serviceService: ServiceService,
                private activatedRoute: ActivatedRoute) {
    }

    serviceList!: any;
    displayedColumns: string[] = ['done','date', 'mileage', 'note'];


    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.serviceService.getAllServices(params.get('id')).subscribe(data => {
                    this.serviceList = new MatTableDataSource(data);
                })
            }
        })
    }
}
