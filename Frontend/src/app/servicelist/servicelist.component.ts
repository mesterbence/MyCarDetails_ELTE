import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from "../service/service.service";
import {Service} from "../model/service";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-servicelist',
    templateUrl: './servicelist.component.html',
    styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit {

    constructor(private serviceService: ServiceService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private modalService: NgbModal) {
    }

    serviceList!: any;
    displayedColumns: string[] = ['done','date', 'mileage', 'note'];
    editServiceFG!: FormGroup;

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        if(this.serviceList) {
            this.serviceList.sort = sort;
        }
    }


    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (params.get('id') !== null) {
                this.serviceService.getAllServices(params.get('id')).subscribe(data => {
                    this.serviceList = new MatTableDataSource(data);
                })
            }
        })
    }
    clickedService(service: Service,content:any) {
        this.editServiceFG = this.formBuilder.group({
            date: service.date,
            mileage: service.mileage,
            note: service.note,
            done: service.done
        });
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
    onEditSubmit() {
        console.log(this.editServiceFG)
    }
    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
