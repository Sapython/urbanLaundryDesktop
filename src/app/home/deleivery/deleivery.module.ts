import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleiveryRoutingModule } from './deleivery-routing.module';
import { DeleiveryComponent } from './deleivery.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [DeleiveryComponent],
  imports: [
    CommonModule,
    DeleiveryRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ComponentsModule,
    DialogModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class DeleiveryModule {}
