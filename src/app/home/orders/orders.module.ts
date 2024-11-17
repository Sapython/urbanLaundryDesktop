import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { MatLegacyButtonModule as MatButtonModule } from 
    '@angular/material/legacy-button';
import { MatButtonToggleModule } from 
    '@angular/material/button-toggle';
import { MatDatepickerModule } from 
    '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from 
    '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from 
    '@angular/material/legacy-form-field';
import { MatNativeDateModule } from 
    '@angular/material/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ComponentsModule
  ]
})
export class OrdersModule { }
