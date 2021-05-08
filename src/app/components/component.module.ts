import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { TablaComponent } from './tabla/tabla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'ngx-easy-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    TablaComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentRoutingModule,
    BrowserAnimationsModule
  ],
  exports:[
    TableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    TablaComponent
  ]
})

export class ComponentModule { }
