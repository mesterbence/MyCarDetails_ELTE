import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from "../service/service.service";
import {Service} from "../model/service";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";


@Component({
    selector: 'app-servicelist',
    templateUrl: './servicelist.component.html',
    styleUrls: ['./servicelist.component.css'],
    providers: [DatePipe]
})
export class ServicelistComponent implements OnInit {

    constructor(private serviceService: ServiceService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                public datepipe: DatePipe) {
    }

    serviceList!: any;
    displayedColumns: string[] = ['done','date', 'mileage', 'note'];
    editServiceFG!: FormGroup;
    carId!: any;

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        if(this.serviceList) {
            this.serviceList.sort = sort;
        }
    }


    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.carId = params.get('id');
                this.serviceService.getAllServices(this.carId).subscribe(data => {
                    this.serviceList = new MatTableDataSource(data);
                })
            }
        })
    }
    clickedService(service: Service,content:any) {
        this.editServiceFG = this.formBuilder.group({
            id: service.id,
            date: this.datepipe.transform(service.date, 'yyyy-MM-dd'),
            mileage: service.mileage,
            note: service.note,
            done: service.done
        });
        console.log(this.editServiceFG.value)
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
    onEditSubmit() {
        this.serviceService.updateService(this.editServiceFG.value,this.carId).subscribe((data) => console.log("xs"));
    }
    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
