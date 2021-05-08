import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { APIDefinition, API, DefaultConfig } from 'ngx-easy-table';
import { ServiceGeneric } from '../../Service/serviceGeneric.service';
import { IResponseHttp } from '../../Models/Response/IResponseHttp';

export interface DataListado <T> {
  currentPage?:number;
  totalPages?:number;
  pageSize?:number;
  totalEntities?:number;
  data?: T[];
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;
  @Input() Columns = [];
  @Input() rutaApi: string;

  configuration: any;
  public data:any[]=[];

  constructor(private readonly _serviceGeneric:ServiceGeneric) { }

  ngOnInit(): void {
    this.data = [];
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = !this.configuration.tableLayout.striped;
    this.configuration.tableLayout.style = 'tiny';
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.persistState = true;
    this.configuration.threeWaySort = true;
    this.getDataApi();
  }

  public getDataApi(): void {

    if (this.rutaApi != undefined ){
      console.log('api');
      this._serviceGeneric.getRemove<IResponseHttp<any>>(null, `${this.rutaApi}`)
      .subscribe(res => {
        console.log(res);

        this.data = res.data;
        this.configuration.isLoading = false;

      })

    }

    this.configuration.isLoading = false;


  }
  ngUnsubscribe(ngUnsubscribe: any): import("rxjs").OperatorFunction<any, unknown> {
    throw new Error('Method not implemented.');
  }

  onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

}
function takeUntil(ngUnsubscribe: any): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

