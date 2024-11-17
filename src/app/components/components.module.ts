import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal/user-modal.component';



@NgModule({
  declarations: [
    UserModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UserModalComponent
  ]
})
export class ComponentsModule { }
