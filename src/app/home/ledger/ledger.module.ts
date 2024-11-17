import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';


@NgModule({
  declarations: [
    LedgerComponent,
    AddCreditComponent,
    AddtransactionComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule
  ]
})
export class LedgerModule { }
