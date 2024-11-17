import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InProgressComponent } from './in-progress/in-progress.component';

import { ContactWidgetComponent } from './contact-widget/contact-widget.component';
import { MaterialModule } from 'src/services/material/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    InProgressComponent,
    ContactWidgetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
