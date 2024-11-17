import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatListModule} from '@angular/material/list'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatChipsModule} from '@angular/material/chips'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSliderModule} from '@angular/material/slider'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {DialogModule} from '@angular/cdk/dialog';
import { AddNewBannerComponent } from './add-new-banner/add-new-banner.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'; 
import {MatTableModule} from '@angular/material/table';
import { AddNewClothComponent } from './add-new-cloth/add-new-cloth.component';
import { AddNewServiceComponent } from './add-new-service/add-new-service.component'; 

@NgModule({
  declarations: [
    SettingsComponent,
    AddNewBannerComponent,
    AddNewClothComponent,
    AddNewServiceComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule
  ]
})
export class SettingsModule { }
